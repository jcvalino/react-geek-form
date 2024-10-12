import { z } from "zod";

import { createForm } from "./helpers";

import Button from "./components/Button";

const { forwardFormContext, FormInput, FormPassword, FormTextArea } =
  createForm({
    zodSchema: z.object({
      first_name: z.string().min(1, "Required"),
      middle_name: z.string().optional(),
      last_name: z.string().min(1, "Required"),
      bio: z.string().min(1, "Required"),
      email: z.string().min(1, "Required").email("Invalid"),
      password: z.string().min(1, "Required"),
    }),
  });
const ExampleForm = forwardFormContext((_, ctx) => {
  return (
    <form
      className="w-full max-w-[30rem] h-max p-4 border rounded-xl bg-white"
      onSubmit={ctx.handleSubmit((values) => {
        console.log("values: ", values);
      })}
    >
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
      <Button intent="success" variant="outline" className="mt-2 w-full">
        Submit
      </Button>
    </form>
  );
});

function App() {
  return (
    <main className="p-4 grid place-items-center h-screen bg-green-100">
      <ExampleForm />
    </main>
  );
}

export default App;
