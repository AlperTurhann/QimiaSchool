"use client";
import React from "react";
import { Control, Path } from "react-hook-form";
import { useTranslations } from "next-intl";
import { LoginData } from "@/utils/validations/LoginSchema";
import { SignupData } from "@/utils/validations/SignupSchema";
import { CourseData } from "@/utils/validations/CourseSchema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  control?: Control<LoginData | SignupData | CourseData>;
  name: Path<LoginData | SignupData | CourseData>;
  textarea?: boolean;
  type: "login" | "signup" | "course";
}

const FormInput = ({ control, name, textarea = false, type }: Props) => {
  const t = useTranslations(`forms.${type}`);

  const getInputType = () => {
    if (name === "password" || name === "confirmPassword") return "password";
    if (name === "capacity") return "number";
    return "text";
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="relative">
          <FormItem>
            <FormLabel htmlFor={name} className="capitalize">
              {t(name)}
            </FormLabel>
            <FormControl>
              {textarea ? (
                <Textarea
                  id={name}
                  {...field}
                  value={field.value ?? ""}
                  autoComplete="on"
                />
              ) : (
                <Input
                  id={name}
                  type={getInputType()}
                  {...field}
                  value={field.value ?? ""}
                  onChange={(event) => {
                    if (name === "capacity")
                      field.onChange(Number(event.target.value));
                    else field.onChange(event.target.value);
                  }}
                  autoComplete="on"
                />
              )}
            </FormControl>
            <FormMessage className="w-full h-1/2 absolute text-xs -bottom-[55%]" />
          </FormItem>
        </div>
      )}
    />
  );
};

export default FormInput;
