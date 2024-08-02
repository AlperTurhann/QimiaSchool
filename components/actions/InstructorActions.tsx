import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface Props {
  handleDeleteAction: () => void;
}

const InstructorActions = ({ handleDeleteAction }: Props) => {
  const t = useTranslations("actions.instructor");

  return (
    <Button type="button" variant="destructive" onClick={handleDeleteAction}>
      {t("delete")}
    </Button>
  );
};

export { InstructorActions };
