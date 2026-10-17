import { ButtonInput } from "@/components/ui-setting"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { ReactNode, useState } from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
interface Props<T extends FieldValues = FieldValues> {
  control: Control<T>
  label?: string
  name: Path<T>
  isRequired?: boolean
  labelHelp?: ReactNode
  fieldDescription?: ReactNode
}

const FieldTextPasswordInput = <T extends FieldValues = FieldValues>({
  control,
  label = "",
  name,
  isRequired,
  fieldDescription,
  ...props
}: Props<T> & React.ComponentProps<"input">) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const isInvalid = fieldState.invalid
        return (
          <Field data-invalid={isInvalid}>
            {label ? (
              <div className="flex flex-row items-center justify-between">
                {label ? (
                  <FieldLabel htmlFor={name}>
                    {label}
                    {isRequired ? (
                      <span className="ml-1 text-red-600">*</span>
                    ) : null}
                  </FieldLabel>
                ) : null}
              </div>
            ) : null}

            <InputGroup>
              <InputGroupInput
                {...field}
                id={name}
                type={showPassword ? "text" : "password"}
                className={cn("hide-password-toggle", props.className)}
                aria-invalid={isInvalid}
                {...props}
              />
              <InputGroupAddon
                align="inline-end"
                className="cursor-pointer font-bold"
              >
                <ButtonInput
                  size="sm"
                  type="button"
                  variant="ghost"
                  disabled={props?.disabled}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword && !props?.disabled ? (
                    <EyeIcon className="size-4" aria-hidden="true" />
                  ) : (
                    <EyeOffIcon className="size-4" aria-hidden="true" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </ButtonInput>
              </InputGroupAddon>
            </InputGroup>

            {fieldDescription && (
              <FieldDescription>{fieldDescription}</FieldDescription>
            )}

            {isInvalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )
      }}
    />
  )
}

export { FieldTextPasswordInput }
