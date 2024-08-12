import { z } from "zod";
import { useTranslations } from "next-intl";

const useSignupSchema = () => {
  const t = useTranslations("schemas.signup");

  const schema = z
    .object({
      name: z
        .string({ required_error: t("nameRequired") })
        .min(1, t("nameMin")),
      email: z
        .string({ required_error: t("emailRequired") })
        .email(t("emailInvalid")),
      role: z.enum(["student", "instructor"], {
        required_error: t("roleRequired"),
      }),
      password: z
        .string({ required_error: t("passwordRequired") })
        .min(8, t("passwordMin")),
      confirmPassword: z
        .string({ required_error: t("confirmPasswordRequired") })
        .min(8, t("confirmPasswordMin")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordsNotMatch"),
      path: ["confirmPassword"],
    });

  return schema;
};

export { useSignupSchema };
export type SignupData = z.infer<ReturnType<typeof useSignupSchema>>;
