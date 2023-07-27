import { z } from "zod";

// Zod Schema to Valid Form
const userFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First Name Should Be At Least 1 Characters" })
    .max(20, { message: "First Name Should Be At Most 20 Characters" }),
  lastName: z
    .string()
    .min(1, { message: "Last Name Should Be At Least 1 Character" })
    .max(20, { message: "Last Name Should Be At Most 20 Characters" }),
  age: z.number({
    invalid_type_error : "Age Is Required",
  }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone Number Should Be 10 Characters" })
    .max(10, { message: "Phone Number Should Be 10 Characters" }),
});

export default userFormSchema;
