import { z } from 'zod';
import { createGeekFormInstance } from 'react-geek-form';
import {
  FormInput as FI,
  FormPassword as FP,
} from '@/components/input_controls';

const { createForm: cF } = createGeekFormInstance({
  fieldComponents: [
    {
      name: 'FormInput',
      component: FI,
    },
    {
      name: 'FormPassword',
      component: FP,
    },
  ],
});

export const createForm = cF;

export const fieldValidationSchema = {
  password: z
    .string()
    .min(1, 'Required')
    .min(8, 'Must be at least 8 characters')
    .max(16, 'Must not be more than 16 characters')
    .regex(/[a-z]/, 'Must have at least one lowercase letter')
    .regex(/[A-Z]/, 'Must have at least one uppercase letter')
    .regex(/^\S+$/, 'Must not contain space')
    .regex(/^(?=.*\d).+$/, 'Must have at least one number')
    .regex(
      /^(?=.*[!@#$%^&*()_+=\-[\]{}|\\:;"'<>,.?/~])/,
      'Must have at least one special characters'
    ),
};
