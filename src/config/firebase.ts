import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Validate Firebase configuration
const validateFirebaseConfig = () => {
    const requiredVars = [
        'VITE_FIREBASE_API_KEY',
        'VITE_FIREBASE_AUTH_DOMAIN',
        'VITE_FIREBASE_PROJECT_ID',
        'VITE_FIREBASE_STORAGE_BUCKET',
        'VITE_FIREBASE_MESSAGING_SENDER_ID',
        'VITE_FIREBASE_APP_ID'
    ];

    const missing = requiredVars.filter(varName => !import.meta.env[varName]);

    if (missing.length > 0) {
        console.error('❌ Missing Firebase environment variables:', missing);
        throw new Error(`Missing required Firebase config: ${missing.join(', ')}`);
    }
};

// Validate before initialization
validateFirebaseConfig();

// Firebase configuration from environment variables
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Log Firebase initialization (only in development)
if (import.meta.env.DEV) {
    console.log('🔥 Firebase initializing with config:', {
        apiKey: firebaseConfig.apiKey ? '✓ Present' : '✗ Missing',
        authDomain: firebaseConfig.authDomain || 'Missing',
        projectId: firebaseConfig.projectId || 'Missing'
    });
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Analytics (only if measurementId is present)
export const analytics = firebaseConfig.measurementId ? getAnalytics(app) : null;

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

console.log('✅ Firebase initialized successfully');
