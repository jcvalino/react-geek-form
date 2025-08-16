import { z } from 'zod';

import { createForm } from './helpers';

import Button from './components/Button';
import { useEffect } from 'react';

const schema = z.object({
  first_name: z.string().min(1, 'Required'),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, 'Required'),
  bio: z.string().min(1, 'Required'),
  email: z.string().min(1, 'Required').email('Invalid'),
  password: z.string().min(1, 'Required'),
  is_restday: z.string().min(1, 'Required'),
  hobbies: z.array(
    z.object({
      name: z.string(),
    }),
  ),
});

const {
  forwardFormContext,
  FormInput,
  FormPassword,
  FormTextArea,
  RadioGroup,
  useWatch,
  useFieldArray,
} = createForm({
  zodSchema: schema,
});

const ExampleForm = forwardFormContext((_: { onClose?: () => void }, ctx) => {
  const watch = useWatch();

  useEffect(() => {
    console.log('watch: ', watch);
  }, [watch]);

  ctx.useSetDefaultValues({
    email: 'juandelacruz@gmail.com',
    password: '',
    last_name: '',
    first_name: '',
    middle_name: '',
    hobbies: [{ name: 'Table-Tennis' }, { name: 'Beyblade X' }],
  });

  const { fields: hobbies, append: addHobby } = useFieldArray({
    name: 'hobbies',
  });

  return (
    <form
      className="w-full max-w-[30rem] h-max p-4 border rounded-xl bg-white"
      onSubmit={ctx.handleSubmit((values) => {
        console.log('values: ', values);
      })}
    >
      <RadioGroup name="is_restday">
        <RadioGroup.Item value="1" label="Yes" />
        <RadioGroup.Item value="0" label="No" />
      </RadioGroup>
      <FormInput label="First Name" name="first_name" placeholder="Juan" />
      <FormInput
        label="Middle Name"
        name="middle_name"
        placeholder="Dela"
        optional
      />
      <FormInput label="Last Name" name="last_name" placeholder="Cruz" />
      <FormTextArea label="Bio" name="bio" placeholder="Lorem ipsum dolor" />
      <hr className="mb-4" />
      <FormInput
        label="Email Address"
        name="email"
        placeholder="juandelacruz@email.com"
      />
      <FormPassword label="Password" name="password" placeholder="..." />

      <hr />
      {hobbies.map((_, i) => (
        <FormInput label="Hobby Name" name={`hobbies.${i}.name`} />
      ))}
      <Button onClick={() => addHobby({ name: '' })}>Add Hobby</Button>
      <hr />

      <Button
        type="button"
        intent="success"
        variant="outline"
        className="mt-2 w-full"
      >
        Submit
      </Button>
      <div className="grid grid-cols-3 gap-4">
        <Button
          type="button"
          className="mt-2 w-full"
          onClick={() => {
            ctx.setFocus('email');
          }}
        >
          Focus Email
        </Button>
      </div>
    </form>
  );
});

function App() {
  return (
    <main className="p-4 grid place-items-center h-screen bg-green-100">
      <ExampleForm






      // defaultGeekValues={{
      //   email: 'juandelacruz@gmail.com',
      //   hobbies: [{ name: 'Table-Tennis' }, { name: 'Beyblade X' }],
      // }}
      />
    </main>
  );
}

// const Yow = () => <div></div>

// type Test = Parameters<typeof Yow>[0]

export default App;
