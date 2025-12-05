import * as Yup from 'yup';

export const adminSigninSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: Yup.string()
    .required('Password is required')
    .min(1, 'Password is required'),
});

export const adminForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email address'),
});

export const adminOtpSchema = Yup.object().shape({
  otp: Yup.string()
    .required('OTP code is required')
    .length(4, 'OTP code must be exactly 4 digits')
    .matches(/^\d{4}$/, 'OTP code must contain only numbers'),
});

export const adminResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});