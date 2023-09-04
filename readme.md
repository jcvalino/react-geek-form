![Logo](https://i.ibb.co/xYxSmcG/Screenshot-2023-09-04-at-11-11-36-PM.png)

<div align="center">

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Status WIP](https://img.shields.io/badge/Status-WIP-blue)]()

</div>

<p align="center">
  <a href="#">Get started</a> | 
  <a href="#">API</a> |
  <a href="#">Examples</a> |
  <a href="#">FAQs</a>
</p>

A set of form utilities built on top of [react-hook-form](https://www.npmjs.com/package/react-hook-form) and [zod](https://www.npmjs.com/package/zod).

### Installation

    npm i react-geek-form zod

### Quickstart

```jsx
import { z } from 'zod';
import { createForm } from 'react-geek-form';

const { forwardContext } = createForm({
  zodSchema: z.object({
    email: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required'),
  }),
});

const LoginForm = forwardContext((props, ctx) {
  return (
    <form onSubmit={ctx.handleSubmit((values) => {
      // do anything with values
    })}>
      <input {...ctx.register('email')} />
      <input {...ctx.register('password')} />
    </form>
  )
});
```

### Used By

This project is used by the following companies:

- Multisys Technologies Corp.

### Contributors

- [@jcvalino](https://github.com/jcvalino)
