import { z } from "zod";
import { useTranslations } from "next-intl";

const useCourseSchema = () => {
  const t = useTranslations("schemas.course");

  const schema = z.object({
    name: z.string({ required_error: t("nameRequired") }).min(1, t("nameMin")),
    description: z
      .string({ required_error: t("descriptionRequired") })
      .min(1, t("descriptionMin")),
    capacity: z
      .number({
        required_error: t("capacityRequired"),
        invalid_type_error: t("capacityInvalidType"),
      })
      .int()
      .positive(t("capacityPositive")),
    accessLevel: z.enum(["invitedOnly", "acceptedOnly", "everyone"], {
      required_error: t("accessLevelRequired"),
    }),
  });

  return schema;
};

export { useCourseSchema };
export type CourseData = z.infer<ReturnType<typeof useCourseSchema>>;
