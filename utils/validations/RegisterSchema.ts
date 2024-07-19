import { z } from "zod";

const schema = z
  .object({
    name: z.string({ required_error: "Name is required" }).min(1, "Name is required"),
    email: z.string({ required_error: "Email is required" }).email("Invalid email"),
    role: z.enum(["student", "instructor"], { required_error: "Role is required" }),
    password: z.string({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string({ required_error: "Confirm password is required" })
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

  export { schema as RegisterSchema };
  export type RegisterData = z.infer<typeof schema>;