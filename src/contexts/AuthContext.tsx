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
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name FIRST before sending email
      await updateProfile(userCredential.user, { displayName: name });
      
      // Reload user to get updated profile
      await userCredential.user.reload();
      
      // Send verification email
      try {
        await sendEmailVerification(userCredential.user);
      } catch (emailError) {
        console.error("Failed to send initial verification email:", emailError);
        // We don't throw here because the account IS created. 
        // The user can resend the email later.
      }

      return {
        success: true,
        needsVerification: true
      };
    } catch (error: any) {
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Check if email is verified
      if (!userCredential.user.emailVerified) {
        return {
          success: false,
          error: 'Please verify your email before logging in',
          needsVerification: true
        };
      }

      return { success: true };
    } catch (error: any) {
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
    if (!auth.currentUser) {
      return { success: false, error: 'No user logged in' };
    }

    try {
      console.log('Sending verification email...');
      await sendEmailVerification(auth.currentUser);
      console.log('Verification email sent successfully.');
      return { success: true };
    } catch (error: any) {
      console.error('Failed to send verification email:', error);
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
