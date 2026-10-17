import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { ReactNode } from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"

interface Props<T extends FieldValues = FieldValues> {
  control: Control<T>
  label?: string
  name: Path<T>
  fieldDescription?: ReactNode
}

const FieldSwitchInput = <T extends FieldValues = FieldValues>({
  control,
  label = "",
  name,
  fieldDescription,
  ...props
}: Props<T> & React.ComponentProps<typeof Switch>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const isInvalid = fieldState.invalid
        return (
          <Field data-invalid={isInvalid}>
            <FieldLabel
              htmlFor={name}
              aria-invalid={isInvalid}
              className="relative flex w-max items-center select-none"
            >
              {label ? <span className="mr-3 font-bold">{label}</span> : null}
              <Switch
                id={name}
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-invalid={isInvalid}
                {...props}
                className="cursor-pointer aria-invalid:border-destructive"
              />
            </FieldLabel>
            {fieldDescription && (
              <FieldDescription>{fieldDescription}</FieldDescription>
            )}
          </Field>
        )
      }}
    />
  )
}

export { FieldSwitchInput }
