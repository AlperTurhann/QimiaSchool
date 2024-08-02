import createMiddleware from "next-intl/middleware";

enum Language {
  GERMAN = "de",
  ENGLISH = "gb",
  TURKISH = "tr",
}

export default createMiddleware({
  locales: [Language.GERMAN, Language.ENGLISH, Language.TURKISH],
  defaultLocale: Language.ENGLISH,
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

export { Language };
