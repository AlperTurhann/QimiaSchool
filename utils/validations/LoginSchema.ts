import { z } from "zod";
import { useTranslations } from "next-intl";

const useLoginSchema = () => {
  const t = useTranslations("schemas.login");

  const schema = z.object({
    email: z
      .string({ required_error: t("emailRequired") })
      .email(t("emailInvalid")),
    password: z
      .string({ required_error: t("passwordRequired") })
      .min(8, t("passwordMin")),
  });

  return schema;
};

export { useLoginSchema };
export type LoginData = z.infer<ReturnType<typeof useLoginSchema>>;
