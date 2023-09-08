

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

const { forwardFormContext } = createForm({
  zodSchema: z.object({
    email: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required'),
  }),
});

const LoginForm = forwardFormContext((props, ctx) {
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

##

### API's  📖


### createForm
`createForm` is a utility that creates a closure that encapsulates all the functionality of `react-hook-form's "useForm" hook` and `zod` .  

> It is basically a react-hook-form without a hook 😂.

**Props**
 - zodSchema
   - Defines the validation schema of your form using `"z" object from zod`. This will also enables typescript type safety and code auto complete specially while using the **ctx** object.

 **Return**
 - forwardContext    
      - Wraps your form component and injects the **ctx** object to the second parameter `(just like the react's forwardRef)`.
      - Adds optional `onInitializedFormContext` prop to wrapped component.

```jsx
const LoginForm = forwardFormContext(() => {
  ...
});

const MyApp = (props, ctx) => {
  return (
    <div>
      <LoginForm
        onInitializedFormContext={(ctx) => {
          // do anything with ctx
          // e.g. ctx.getValues() to get the form values outside the component!
        }}
      />
    </div>
  );
};

```
       
What is **ctx** object ?

Basically it is the same object that the "`useForm`" hook returns (click [here](https://react-hook-form.com/docs/useform) to know more) but with one addition, that is **`setFormConfigs`**.  What is setFormConfigs for? ... ... ... You've guest it right! It is the function we use to pass the config behind the scene to `useForm(<cofigs>)` but with one deduction, you can't pass the "resolver" property since we've already passed it in createForm's zodSchema.

### createGeekFormIntance


### TODO: Document the following;

- createGeekFormInstance

### Used By

This project is used by the following companies:

- Multisys Technologies Corp.

### Contributors

- [@jcvalino](https://github.com/jcvalino)
