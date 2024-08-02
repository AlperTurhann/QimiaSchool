import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("pages.home");

  return (
    <>
      <p>{t("title")}</p>
      <p>{t("content")}</p>
    </>
  );
}
