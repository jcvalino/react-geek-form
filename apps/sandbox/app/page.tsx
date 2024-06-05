'use client';

import { z } from 'zod';

import { createForm } from '@/utilities';
import { Button } from '@/components/input_controls';

export default function Home() {
  return (
    <div className="bg-color-gradient h-screen p-4 space-y-2">
      <h1>react-geek-form</h1>
      <LoginForm />
    </div>
  );
}

const { FormInput, FormPassword, forwardFormContext } = createForm({
  zodSchema: z.object({
    email: z.string().min(1, 'Required').email('Invalid'),
    password: z.string().min(1, 'Required'),
    hobbies: z.array(
      z.object({
        name: z.string(),
      })
    ),
  }),
});

const LoginForm = forwardFormContext((_, ctx) => {
  return (
    <form
      className="p-6 max-w-md bg-white rounded-lg"
      onSubmit={ctx.handleSubmit(() => {})}
    >
      <FormInput name="email" label="Email" />
      <FormPassword name="password" label="Password" />
      <Button asSubmit className="w-full" theme="primary" style="outline">
        Submit
      </Button>
    </form>
  );
});
