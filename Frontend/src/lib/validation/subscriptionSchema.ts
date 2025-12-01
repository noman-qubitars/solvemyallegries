import * as Yup from 'yup';

export const subscriptionSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required')
    .min(2, 'First Name must be at least 2 characters')
    .max(50, 'First Name must not exceed 50 characters'),
  
  lastName: Yup.string()
    .required('Last Name is required')
    .min(2, 'Last Name must be at least 2 characters')
    .max(50, 'Last Name must not exceed 50 characters'),
  
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  
  phone: Yup.string()
    .required('Phone number is required')
    .min(10, 'Phone number must be at least 10 digits'),
});