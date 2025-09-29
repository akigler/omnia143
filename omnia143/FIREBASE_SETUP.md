# Firebase Authentication Setup

This guide will help you set up Firebase Authentication for your Omnia app.

## Prerequisites

1. A Google account
2. Node.js and npm installed

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "omnia-app")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project dashboard, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable the following sign-in methods:
   - **Email/Password**: Click on it and toggle "Enable"
   - **Google**: Click on it, toggle "Enable", and set a project support email

## Step 3: Get Firebase Configuration

1. In your Firebase project dashboard, click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>) to add a web app
5. Enter an app nickname (e.g., "omnia-web")
6. Check "Also set up Firebase Hosting" if you plan to use it
7. Click "Register app"
8. Copy the Firebase configuration object

## Step 4: Configure Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_actual_app_id
```

## Step 5: Configure Authorized Domains

1. In Firebase Console, go to Authentication > Settings
2. Scroll down to "Authorized domains"
3. Add your development domain: `localhost`
4. Add your production domain when you deploy

## Step 6: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`
3. You should see the login modal
4. Try signing up with email/password or Google
5. Once logged in, you should see the main app with a logout button

## Features Included

- ✅ Email/Password authentication
- ✅ Google OAuth authentication
- ✅ Automatic route protection
- ✅ Loading states
- ✅ Error handling
- ✅ Logout functionality
- ✅ Persistent authentication state

## Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/configuration-not-found)"**
   - Check that your environment variables are correctly set
   - Make sure the `.env.local` file is in the project root
   - Restart your development server after changing environment variables

2. **"Firebase: Error (auth/unauthorized-domain)"**
   - Add your domain to the authorized domains in Firebase Console
   - For development, make sure `localhost` is added

3. **Google Sign-in not working**
   - Make sure Google sign-in is enabled in Firebase Console
   - Check that you've set a project support email
   - Verify your domain is authorized

4. **Environment variables not loading**
   - Make sure your `.env.local` file is in the project root (same level as `package.json`)
   - Restart your development server
   - Check that variable names start with `NEXT_PUBLIC_`

### Getting Help

- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Firebase Auth Web SDK](https://firebase.google.com/docs/auth/web/start)

## Security Notes

- Never commit your `.env.local` file to version control
- The `NEXT_PUBLIC_` prefix makes these variables available in the browser
- For production, set these variables in your hosting platform's environment settings
- Consider implementing additional security rules in Firebase Security Rules
