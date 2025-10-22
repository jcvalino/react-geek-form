import { createInstance } from 'react-geek-form';

import FormInput from '../components/FormInput';
import FormPassword from '../components/FormPassword';
import FormTextArea from '../components/FormTextArea';
import RadioGroup from '../components/RadioGroup';

// Example 1: Legacy API (existing usage - unchanged)
const { createForm } = createInstance({
  FormInput,
  FormPassword,
  FormTextArea,
  RadioGroup,
});

// Example 2: New Builder API (alternative usage)
// const { createForm: createFormBuilder } = createInstance().withFields({
//   FormInput,
//   FormPassword,
//   FormTextArea,
//   RadioGroup,
// });

// Both approaches produce identical results
console.log('Both APIs work:', {
  createForm,
  // createFormBuilder
});

export { createForm };
