import { createInstance } from "react-geek-form";

import FormInput from "../components/FormInput";
import FormPassword from "../components/FormPassword";
import FormTextArea from "../components/FormTextArea";

const { createForm: cf } = createInstance({
  FormInput,
  FormPassword,
  FormTextArea,
});

export const createForm = cf;
