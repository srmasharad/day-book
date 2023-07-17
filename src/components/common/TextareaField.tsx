import { Asterisk } from "lucide-react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import { Label } from "@/components/ui/Label";
import { Textarea, TextareaProps } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";

interface TextareaFieldProps {
  id: string;
  label: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const TextareaField = ({
  id,
  label,
  required,
  register,
  errors,
  ...rest
}: TextareaFieldProps & Partial<TextareaProps>) => {
  return (
    <div className="grid items-center grid-flow-row gap-2">
      <Label htmlFor={id} className="flex gap-0.5">
        {label}
        {required && <Asterisk size={12} className="text-destructive" />}
      </Label>
      <Textarea
        id={id}
        className={cn(
          "h-40",
          errors[id] ? "border-rose-600 focus-visible:ring-rose-400" : ""
        )}
        {...register(id, { required })}
        {...rest}
      />
      {errors[id] && (
        <span className="text-sm font-medium text-destructive">
          {errors[id]?.message as string}
        </span>
      )}
    </div>
  );
};

export default TextareaField;
