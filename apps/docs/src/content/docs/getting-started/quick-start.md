---
title: Quickstart
description: A guide in my new Starlight docs site.
---

Guides lead a user through a specific task they want to accomplish, often with a sequence of steps.
Writing a good guide requires thinking about what your users are trying to do.

```jsx
import { z } from 'zod';
import { createForm } from 'react-geek-form';

const { forwardFormContext } = createForm({
  zodSchema: z.object({
    email: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required'),
  }),
});

const LoginForm = forwardFormContext((props, ctx) => {
  return (
    <form
      onSubmit={ctx.handleSubmit((values) => {
        // do anything with values
      })}
    >
      <input {...ctx.register('email')} />
      <input {...ctx.register('password')} />
    </form>
  );
});
```
