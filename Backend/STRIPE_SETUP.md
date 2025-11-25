# Stripe Subscription Setup Guide

## Environment Variables Required

Create a `.env` file in the Backend folder with the following variables:

```env
PORT=4000
JWT_SECRET=your_jwt_secret_key_here
OTP_EXPIRATION_MINUTES=10
DATABASE_URL=mongodb://localhost:27017/solvemyallergies

# Stripe Keys
STRIPE_PUBLISHABLE_KEY=pk_test_51SWvEcPNRC4xVEnWNFmX8nTofPobPay8cLbq2sue8uksAOOw3RLA8zxkDE97vtMenLHzyRH8ppBS1EwK4Bwj3oF100gucv55bp
STRIPE_SECRET_KEY=sk_test_51SWvEcPNRC4xVEnWmiTXfRVWcfVfUV7yTYnwAvX7Zgt0UInNVTTazrf2QV8rxXFP6IVhnFIFmsQUdH0vHcwBkM5c004nPmqA8S

# App Store URLs
PLAY_STORE_URL=https://play.google.com/store/apps
APP_STORE_URL=https://apps.apple.com/app

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
EMAIL_FROM=noreply@solvemyallergies.com
EMAIL_SECURE=false
```

## MongoDB Connection

The `DATABASE_URL` should be in the format:
- Local: `mongodb://localhost:27017/solvemyallergies`
- MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/solvemyallergies`

## MongoDB Collections Created

1. **users** - Stores user accounts with email and hashed password
2. **subscriptions** - Stores subscription details including:
   - User information (email, firstName, lastName, phone)
   - Payment details (masked card number, expiry date)
   - Stripe IDs (paymentIntentId, customerId)
   - Generated password (hashed)
   - Subscription status

## API Endpoint

**POST** `/subscription/create`

Request Body:
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "cardNumber": "4242 4242 4242 4242",
  "expiryDate": "12/25",
  "cvc": "123"
}
```

Response:
```json
{
  "success": true,
  "subscriptionId": "subscription_id",
  "message": "Subscription successful"
}
```

## Flow

1. User fills subscription form on frontend
2. Frontend validates form using Formik/Yup
3. Frontend sends payment details to backend API
4. Backend:
   - Creates Stripe customer
   - Creates payment method
   - Processes payment ($10.00)
   - Generates random password
   - Creates/updates user account
   - Saves subscription to MongoDB
   - Sends welcome email with credentials and app store links
5. Frontend shows success modal

## Email Sent to User

The user receives an email containing:
- Thank you message
- Account credentials (email and generated password)
- Play Store download link
- App Store download link

## Security Notes

⚠️ **Important**: In production, consider using Stripe Elements on the frontend to securely collect card details instead of sending raw card data to the backend. This implementation works but is less secure for production use.

