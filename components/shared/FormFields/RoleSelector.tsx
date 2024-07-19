"use client";
import React from "react";
import { Control } from "react-hook-form";
import { LoginData } from "@/utils/validations/LoginSchema";
import { RegisterData } from "@/utils/validations/RegisterSchema";
import {
  FormControl,
  FormField,
  FormItem,
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
  control?: Control<LoginData | RegisterData>;
}

const RoleSelector = ({ control }: Props) => {
  return (
    <FormField
      control={control}
      name="role"
      render={({ field: { name, onChange } }) => (
        <div className="relative">
          <FormItem>
            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize cursor-default">
              Role
            </span>
            <FormControl>
              <Select name={name} onValueChange={onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="instructor">Instructor</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage className="w-full h-1/2 absolute text-xs -bottom-[55%] left-0" />
          </FormItem>
        </div>
      )}
    />
  );
};

export default RoleSelector;
