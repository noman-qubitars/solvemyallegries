# Frontend API Setup

## Environment Variables

Create a `.env.local` file in the Frontend folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

For production, update this to your backend server URL.

## API Integration

The subscription form now:
1. Validates all fields using Formik and Yup
2. Sends payment data to `/subscription/create` endpoint
3. Shows loading state during processing
4. Displays success modal on successful payment
5. Shows error messages if payment fails

## Testing

Use Stripe test card numbers:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Any future expiry date (e.g., `12/25`)
- Any 3-digit CVC (e.g., `123`)

