import { z } from "zod";

const schema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name field cannot be left empty"),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, "Description field cannot be left empty"),
  capacity: z
    .number({
      required_error: "Capacity is required",
      invalid_type_error: "Capacity must be a number",
    })
    .int()
    .positive("Capacity must be at least 1"),
});

export { schema as CourseSchema };
export type CourseData = z.infer<typeof schema>;
