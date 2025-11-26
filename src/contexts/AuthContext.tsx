import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
  photoURL: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signupWithEmail: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string; needsVerification?: boolean }>;
  loginWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string; needsVerification?: boolean }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  resendVerificationEmail: () => Promise<{ success: boolean; error?: string }>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapFirebaseUser(firebaseUser: FirebaseUser): User {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    emailVerified: firebaseUser.emailVerified,
    photoURL: firebaseUser.photoURL
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(mapFirebaseUser(firebaseUser));
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signupWithEmail = async (
    email: string,
    password: string,
    name: string
  ): Promise<{ success: boolean; error?: string; needsVerification?: boolean }> => {
    try {
      console.log('🔵 Starting signup process for:', email);
      
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ User account created successfully:', userCredential.user.uid);
      
      // Update display name FIRST before sending email
      await updateProfile(userCredential.user, { displayName: name });
      console.log('✅ Display name updated to:', name);
      
      // Reload user to get updated profile
      await userCredential.user.reload();
      console.log('✅ User profile reloaded');
      
      // Send verification email
      try {
        console.log('📧 Attempting to send verification email to:', email);
        // Use Firebase's default domain which is always authorized
        await sendEmailVerification(userCredential.user, {
          url: 'https://ai-cooking-simulator.firebaseapp.com',
          handleCodeInApp: false
        });
        console.log('✅ Verification email sent successfully!');
      } catch (emailError: any) {
        console.error("❌ Failed to send initial verification email:", emailError);
        console.error("Error code:", emailError.code);
        console.error("Error message:", emailError.message);
        // We don't throw here because the account IS created. 
        // The user can resend the email later.
      }

      console.log('✅ Signup process completed');
      return {
        success: true,
        needsVerification: true
      };
    } catch (error: any) {
      console.error('❌ Signup failed:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      let errorMessage = 'Failed to create account';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection';
          break;
      }

      return { success: false, error: errorMessage };
    }
  };

  const loginWithEmail = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string; needsVerification?: boolean }> => {
    try {
      console.log('🔵 Attempting login for:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Sign in successful, checking verification status...');
      
      // CRITICAL: Reload user to get latest emailVerified status from server
      // Without this, emailVerified might be cached and show as false even after verification
      await userCredential.user.reload();
      console.log('✅ User data reloaded from server');
      console.log('📧 Email verified status:', userCredential.user.emailVerified);
      
      // Check if email is verified
      if (!userCredential.user.emailVerified) {
        console.log('❌ Email not verified yet');
        // Sign out the user since they're not verified
        await signOut(auth);
        return {
          success: false,
          error: 'Please verify your email before logging in',
          needsVerification: true
        };
      }

      console.log('✅ Login successful!');
      return { success: true };
    } catch (error: any) {
      console.error('❌ Login failed:', error);
      console.error('Error code:', error.code);
      
      let errorMessage = 'Failed to login';

      switch (error.code) {
        case 'auth/user-not  -found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection';
          break;
      }

      return { success: false, error: errorMessage };
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('🔵 Attempting Google Sign-In...');
      const result = await signInWithPopup(auth, googleProvider);
      console.log('✅ Google Sign-In successful:', result.user.email);
      return { success: true };
    } catch (error: any) {
      console.error('❌ Google Sign-In error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      let errorMessage = 'Failed to sign in with Google';

      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign in cancelled';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Popup blocked. Please allow popups for this site';
          break;
        case 'auth/unauthorized-domain':
          errorMessage = 'This domain is not authorized. Please add it to Firebase Console → Authentication → Settings → Authorized domains';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Google Sign-In is not enabled. Please enable it in Firebase Console';
          break;
        case 'auth/invalid-api-key':
          errorMessage = 'Invalid Firebase API key. Please check your environment variables';
          break;
        default:
          errorMessage = `Google Sign-In failed: ${error.message || error.code || 'Unknown error'}`;
      }

      return { success: false, error: errorMessage };
    }
  };

  const resendVerificationEmail = async (): Promise<{ success: boolean; error?: string }> => {
    console.log('🔵 Attempting to resend verification email...');
    
    if (!auth.currentUser) {
      console.error('❌ No user logged in');
      return { success: false, error: 'No user logged in' };
    }

    console.log('📧 Current user:', auth.currentUser.email);
    console.log('📧 Email verified status:', auth.currentUser.emailVerified);

    try {
      console.log('📧 Calling sendEmailVerification...');
      // Use Firebase's default domain which is always authorized
      await sendEmailVerification(auth.currentUser, {
        url: 'https://ai-cooking-simulator.firebaseapp.com',
        handleCodeInApp: false
      });
      console.log('✅ Verification email sent successfully!');
      return { success: true };
    } catch (error: any) {
      console.error('❌ Failed to send verification email:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      return { success: false, error: error.message || 'Failed to send verification email' };
    }
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem('chef_score');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signupWithEmail,
        loginWithEmail,
        loginWithGoogle,
        logout,
        resendVerificationEmail,
        isAuthenticated: !!user && user.emailVerified
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
