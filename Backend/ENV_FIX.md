# Backend .env File Issues and Fixes

## Current Issues Found:

1. **Missing FRONTEND_URL** - Needed for Stripe redirect URLs
2. **Email password with spaces** - May cause parsing issues

## Required .env File Structure:

```env
PORT=4000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
OTP_EXPIRATION_MINUTES=10

# MongoDB
DATABASE_URL=mongodb+srv://nomanshabbir10_db_user:THIoHBbeBvJlpPgU@cluster0.wafe6jd.mongodb.net/solvemyallergies

# Stripe Keys
STRIPE_PUBLISHABLE_KEY=pk_test_51SWvEcPNRC4xVEnWNFmX8nTofPobPay8cLbq2sue8uksAOOw3RLA8zxkDE97vtMenLHzyRH8ppBS1EwK4Bwj3oF100gucv55bp
STRIPE_SECRET_KEY=sk_test_51SWvEcPNRC4xVEnWmiTXfRVWcfVfUV7yTYnwAvX7Zgt0UInNVTTazrf2QV8rxXFP6IVhnFIFmsQUdH0vHcwBkM5c004nPmqA8S

# Frontend URL (ADD THIS)
FRONTEND_URL=http://localhost:3000

# App Store URLs (Optional - has defaults)
PLAY_STORE_URL=https://play.google.com/store/apps
APP_STORE_URL=https://apps.apple.com/app

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=nomanshabbir10@gmail.com
EMAIL_PASS=vbmdmuiewifkdepi
EMAIL_FROM=nomanshabbir10@gmail.com
EMAIL_SECURE=false
```

## Fixes Needed:

1. **Add FRONTEND_URL** to your .env file:
   ```
   FRONTEND_URL=http://localhost:3000
   ```
   (Change to your production URL when deploying)

2. **Email Password**: Remove spaces from the app password:
   - Current: `vbmd muie wifk depi`
   - Should be: `vbmdmuiewifkdepi`
   - Or keep it in quotes: `EMAIL_PASS="vbmd muie wifk depi"`

3. **Verify MongoDB connection** - The connection string looks correct

## After Making Changes:

1. Restart your backend server
2. Test the subscription flow

