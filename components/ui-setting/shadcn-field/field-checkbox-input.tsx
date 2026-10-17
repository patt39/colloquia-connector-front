import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"

interface Props<T extends FieldValues = FieldValues> {
  control: Control<T>
  label?: ReactNode
  name: Path<T>
  className?: string
  description?: ReactNode
}

const FieldCheckboxInput = <T extends FieldValues = FieldValues>({
  control,
  label = "",
  name,
  className,
  description,
  ...props
}: Props<T> & React.ComponentProps<typeof Checkbox>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const isInvalid = fieldState.invalid
        return (
          <FieldGroup data-slot="checkbox-group">
            <Field orientation="horizontal" data-invalid={isInvalid}>
              <Checkbox
                {...field}
                id={name}
                aria-invalid={isInvalid}
                className={cn("cursor-pointer", className)}
                checked={field.value}
                onCheckedChange={field.onChange}
                {...props}
              />
              <div className="grid gap-2">
                {label && (
                  <FieldLabel htmlFor={name} className="font-normal">
                    {label}
                  </FieldLabel>
                )}
                {description && (
                  <FieldDescription>{description}</FieldDescription>
                )}
                {isInvalid && <FieldError errors={[fieldState.error]} />}
              </div>
            </Field>
          </FieldGroup>
        )
      }}
    />
  )
}

export { FieldCheckboxInput }
