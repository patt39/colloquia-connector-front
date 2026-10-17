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
  InputGroupText,
} from "@/components/ui/input-group"
import { ReactNode, useEffect, useRef, useState } from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"

interface Props<T extends FieldValues = FieldValues> {
  control: Control<T>
  label?: string
  name: Path<T>
  isRequired?: boolean
  labelHelp?: ReactNode
  prefixRight?: ReactNode
  prefixLeft?: ReactNode
  fieldDescription?: ReactNode
}

const FieldTextInput = <T extends FieldValues = FieldValues>({
  control,
  label = "",
  name,
  labelHelp,
  prefixRight,
  isRequired,
  prefixLeft,
  fieldDescription,
  ...props
}: Props<T> & React.ComponentProps<"input">) => {
  const prefixRef = useRef<HTMLDivElement>(null)
  const [prefixWidth, setPrefixWidth] = useState(0)

  useEffect(() => {
    if (prefixLeft && prefixRef.current) {
      const width = prefixRef.current.offsetWidth
      setPrefixWidth(width)
    }
  }, [prefixLeft])

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const isInvalid = fieldState.invalid
        return (
          <Field data-invalid={isInvalid}>
            {label || labelHelp ? (
              <div className="flex flex-row items-center justify-between">
                {label ? (
                  <FieldLabel htmlFor={name}>
                    {label}
                    {isRequired ? (
                      <span className="ml-1 text-red-600">*</span>
                    ) : null}
                  </FieldLabel>
                ) : null}
                {labelHelp}
              </div>
            ) : null}

            <InputGroup>
              <InputGroupInput
                {...field}
                id={name}
                aria-invalid={isInvalid}
                style={prefixLeft ? { paddingLeft: `${prefixWidth}px` } : {}}
                {...props}
              />

              {prefixLeft && (
                <InputGroupAddon>
                  <InputGroupText>{prefixLeft}</InputGroupText>
                </InputGroupAddon>
              )}
              {prefixRight && (
                <InputGroupAddon
                  align="inline-end"
                  className="cursor-pointer font-bold"
                >
                  {prefixRight}
                </InputGroupAddon>
              )}
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

export { FieldTextInput }
