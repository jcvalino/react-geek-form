![Logo](https://i.ibb.co/wc7CCJ1/Screenshot-2023-09-04-at-3-49-39-PM.png)

# react-geek-form

A set of form utilities built on top of [react-hook-form](https://www.npmjs.com/package/react-hook-form) and [zod](https://www.npmjs.com/package/zod).

## Installation

```bash
  npm i react-hook-form zod
```

## Basic Usage

```javascript
import { z } from "zod;
import { createForm } from 'react-geek-form'

const { forwardContext } = createForm({
  zodSchema: z.object({
    email: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required'),
  }),
})

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

## Used By

This project is used by the following companies:

- Multisys Technologies Corp.

## Authors

- [@jcvalino](https://github.com/jcvalino)
