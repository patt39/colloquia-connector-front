import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface ItemProps {
  value: string;
  label: ReactNode;
  description?: ReactNode;
}

interface Props<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: Path<T>;
  items: ItemProps[];
  size?: "sm" | "md" | "lg";
  label?: string;
  disabled?: boolean;
  isRequired?: boolean;
  className?: string;
  defaultValue?: string;
  fieldDescription?: ReactNode;
}

const FieldRadioButtonInput = ({
  control,
  name,
  items,
  className,
  label,
  disabled,
  size = "md",
  isRequired,
  fieldDescription,
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState }) => {
        const isInvalid = fieldState.invalid;
        return (
          <Field data-invalid={isInvalid}>
            {label ? (
              <FieldLabel htmlFor={name}>
                {label}
                {isRequired ? (
                  <span className="ml-1 text-red-600">*</span>
                ) : null}
              </FieldLabel>
            ) : null}
            <RadioGroup
              disabled={disabled}
              value={value}
              onValueChange={onChange}
              className={cn(
                "grid",
                items.length === 1 && "grid-cols-1",
                items.length === 2 && "grid-cols-2",
                items.length === 3 && "grid-cols-3",
                items.length === 4 && "grid-cols-4",
                items.length >= 5 && "grid-cols-5",
              )}
              aria-invalid={isInvalid}
            >
              {items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={cn(
                      "relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:border-ring has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50 has-data-[state=checked]:border-primary/20 has-data-[state=checked]:bg-primary/40",
                      isInvalid ? "border-destructive" : "",
                      size === "sm" && "py-2",
                      size === "md" && "py-3",
                      size === "lg" && "py-4",
                    )}
                  >
                    <RadioGroupItem
                      className="sr-only"
                      id={item.value}
                      value={item.value}
                      aria-invalid={isInvalid}
                    />
                    <FieldLabel
                      className={cn(
                        "text-info-foreground flex cursor-pointer flex-col items-center text-sm leading-none font-bold after:absolute after:inset-0",
                        className,
                      )}
                      htmlFor={item.value}
                    >
                      {item.label}
                      {item.description ? (
                        <FieldDescription
                          className={cn(
                            "text-xs",
                            isInvalid && "text-destructive",
                          )}
                        >
                          {item.description}
                        </FieldDescription>
                      ) : null}
                    </FieldLabel>
                  </div>
                );
              })}
            </RadioGroup>
            {fieldDescription && (
              <FieldDescription aria-invalid={isInvalid}>
                {fieldDescription}
              </FieldDescription>
            )}
            {isInvalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};

export { FieldRadioButtonInput };
