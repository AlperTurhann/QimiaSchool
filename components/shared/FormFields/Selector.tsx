"use client";
import React from "react";
import { Control } from "react-hook-form";
import { useTranslations } from "next-intl";
import { SignupData } from "@/utils/validations/SignupSchema";
import { CourseData } from "@/utils/validations/CourseSchema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  control?: Control<SignupData | CourseData>;
  name: "role" | "accessLevel";
  type: "signup" | "course";
}

const Selector = ({ control, name, type }: Props) => {
  const t = useTranslations(`forms.${type}`);
  const optionsT = useTranslations(`options.${name}s`);

  const options: (RoleKeys | AccessLevelKeys)[] =
    name === "role"
      ? (["student", "instructor"] as const)
      : (["invitedOnly", "acceptedOnly", "everyone"] as const);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <div className="relative">
          <FormItem>
            <FormLabel htmlFor={name}>{t(name)}</FormLabel>
            <FormControl>
              <Select name={name} onValueChange={onChange} value={value}>
                <SelectTrigger id={name} className="w-full">
                  <SelectValue placeholder={t(`${name}Placeholder`)} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((key) => (
                    <SelectItem key={key} value={key}>
                      {optionsT(key)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage className="w-full h-1/2 absolute text-xs -bottom-[55%]" />
          </FormItem>
        </div>
      )}
    />
  );
};

export default Selector;
