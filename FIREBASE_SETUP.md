# Firebase Configuration Instructions

To enable email verification and Google Sign-In, you need to add your Firebase project credentials.

## Step 1: Create .env file

Create a `.env` file in the root directory (`/home/nidhi/Desktop/AI-Chef/.env`) with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Step 2: Get Your Firebase Config

1. Go to https://console.firebase.google.com/
2. Create/select your project
3. Click Project Settings (gear icon)
4. Scroll to "Your apps" → Web app
5. Copy the config values

## Step 3: Enable Authentication Methods

In Firebase Console:
1. Go to **Authentication** → **Sign-in method**
2. Enable **Email/Password**
3. Enable **Google** provider

## How Email Verification Works

When a user signs up:
1. Firebase automatically sends a verification email to their Gmail/email
2. Email contains a secure verification link
3. User clicks the link to verify
4. Next login checks if email is verified
5. If not verified, shows message with "Resend Email" option

The email will be sent from Firebase (noreply@your-project.firebaseapp.com).
