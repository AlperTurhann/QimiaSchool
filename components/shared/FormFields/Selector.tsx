"use client";
import React from "react";
import { Control } from "react-hook-form";
import { RegisterData } from "@/utils/validations/RegisterSchema";
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
  control?: Control<RegisterData | CourseData>;
  name: "role" | "accessLevel";
  placeholder: string;
}

const Selector = ({ control, name, placeholder }: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <div className="relative">
          <FormItem>
            <FormLabel htmlFor={name}>
              {name === "role" ? "Role" : "Access Level"}
            </FormLabel>
            <FormControl>
              <Select
                name={name}
                onValueChange={onChange}
                value={value ?? ""}
                autoComplete="on"
              >
                <SelectTrigger id={name} className="w-full">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <div className={`${name !== "role" && "hidden"}`}>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="instructor">Instructor</SelectItem>
                  </div>
                  <div className={`${name !== "accessLevel" && "hidden"}`}>
                    <SelectItem value="invited only">Invited Only</SelectItem>
                    <SelectItem value="accepted only">Accepted Only</SelectItem>
                    <SelectItem value="everyone">Everyone</SelectItem>
                  </div>
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
