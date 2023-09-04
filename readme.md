
## Usage/Examples

```javascript
import { z } from "zod;
import { createForm } from 'react-geek-form'

const { forwardContext } = createForm({
  zodSchema: z.object({
    email: z.string().min(1, 'Required').email('Invalid'),
    password: z.string().min(1, 'Required'),
  }),
})

const LoginForm = forwardContext((props, ctx) {
  return (
    <form>
    ....
    </form>
  )
});
```

