import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { Language } from "@/middleware";

export default getRequestConfig(async ({ locale }) => {
  const baseLocale = new Intl.Locale(locale).baseName;
  if (!Object.values(Language).includes(baseLocale as Language)) notFound();

  return {
    messages: (await import(`./messages/${baseLocale}.json`)).default,
  };
});
