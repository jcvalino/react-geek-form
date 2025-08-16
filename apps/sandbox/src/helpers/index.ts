import { createInstance } from "react-geek-form";

import FormInput from "../components/FormInput";
import FormPassword from "../components/FormPassword";
import FormTextArea from "../components/FormTextArea";
import RadioGroup from "../components/RadioGroup";

const { createForm } = createInstance({
  FormInput,
  FormPassword,
  FormTextArea,
  RadioGroup
});

export { createForm };
