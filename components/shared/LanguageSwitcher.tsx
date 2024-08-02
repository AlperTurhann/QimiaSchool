"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Language } from "@/middleware";
import { useUserContext } from "@/context/UserContext";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LanguageSwitcher = () => {
  const pathname = usePathname();
  const navigate = useRouter();
  const currentLocale = useLocale();

  const { state, dispatch, getUser } = useUserContext();

  const languages = [
    { code: Language.GERMAN, name: "Deutsch" },
    { code: Language.ENGLISH, name: "English" },
    { code: Language.TURKISH, name: "Türkçe" },
  ];

  const handleLanguageChange = (langCode: string) => {
    if (langCode !== currentLocale) {
      if (state.user) sessionStorage.setItem("userID", state.user.id);
      const newPathname = pathname.replace(`/${currentLocale}`, `/${langCode}`);
      navigate.push(newPathname);
      navigate.refresh();
    }
  };

  useEffect(() => {
    const refreshUser = async () => {
      const userID = sessionStorage.getItem("userID");
      if (userID) {
        const result = await getUser(userID);
        if (typeof result !== "string") {
          dispatch({ type: "SET_USER", payload: result.data });
        }
        sessionStorage.removeItem("userID");
      }
    };

    refreshUser();
  }, [currentLocale]);

  return (
    <Select onValueChange={handleLanguageChange} defaultValue={currentLocale}>
      <SelectTrigger className="bg-transparent border-2 hover:bg-accent hover:text-accent-foreground gap-2">
        <SelectValue>
          <div className="flex items-center gap-2">
            <span className="uppercase">{currentLocale}</span>
            <Image
              src={`https://flagcdn.com/${currentLocale}.svg`}
              alt={currentLocale}
              width={30}
              height={25}
              className="hidden border-2 rounded sm:block"
            />
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <div className="flex w-full">
              <div className="flex-1 flex items-center">
                <span className="w-24 truncate">{lang.name}</span>
                <div className="hidden sm:flex">
                  <Image
                    src={`https://flagcdn.com/${lang.code}.svg`}
                    alt={lang.code}
                    width={30}
                    height={25}
                  />
                </div>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
