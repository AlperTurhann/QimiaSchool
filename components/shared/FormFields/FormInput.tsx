"use client";
import React from "react";
import { Control, Path } from "react-hook-form";
import { LoginData } from "@/utils/validations/LoginSchema";
import { RegisterData } from "@/utils/validations/RegisterSchema";
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
  control?: Control<LoginData | RegisterData | CourseData>;
  name: Path<LoginData | RegisterData | CourseData>;
  label: string;
  textarea?: boolean;
}

const FormInput = ({ control, name, label, textarea = false }: Props) => {
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
            <FormLabel className="capitalize">{label}</FormLabel>
            <FormControl>
              {textarea ? (
                <Textarea {...field} value={field.value ?? ""} />
              ) : (
                <Input
                  type={getInputType()}
                  {...field}
                  value={field.value ?? ""}
                  onChange={(event) => {
                    if (name === "capacity")
                      field.onChange(Number(event.target.value));
                    else field.onChange(event.target.value);
                  }}
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
