import { Asterisk } from "lucide-react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { OptionProps } from "@/types/options";
import { SelectProps } from "@radix-ui/react-select";

interface SelectFieldProps {
  id: string;
  label: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  value?: string;
  onChange: (value: string) => void;
  placeHolder?: string;
  options: OptionProps[];
}

const SelectField = ({
  id,
  label,
  register,
  errors,
  onChange,
  value,
  required,
  placeHolder,
  options,
  ...rest
}: SelectFieldProps & Partial<SelectProps>) => {
  return (
    <div className="grid items-center grid-flow-row gap-2">
      <Label htmlFor={id} className="flex gap-0.5">
        {label}
        {required && <Asterisk size={12} className="text-destructive" />}
      </Label>
      <Select
        onValueChange={(value) => onChange(value)}
        {...register(id, { required })}
        {...rest}
      >
        <SelectTrigger
          id={id}
          value={value}
          className={
            errors[id] && "border-rose-600 focus-visible:ring-rose-400"
          }
        >
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option, key) => (
              <SelectItem key={key} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {errors[id] && (
        <span className="text-sm font-medium text-destructive">
          {errors[id]?.message as string}
        </span>
      )}
    </div>
  );
};

export default SelectField;
