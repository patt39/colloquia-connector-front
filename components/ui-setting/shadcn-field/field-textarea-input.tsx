import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { ReactNode, useEffect, useRef, useState } from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"

interface Props<T extends FieldValues = FieldValues> {
  control: Control<T>
  label?: string
  name: Path<T>
  isRequired?: boolean
  prefix?: ReactNode
  fieldDescription?: ReactNode
  prefixLeft?: ReactNode
}

const FieldTextareaInput = <T extends FieldValues = FieldValues>({
  control,
  label = "",
  name,
  prefix,
  isRequired,
  prefixLeft,
  fieldDescription,
  ...props
}: Props<T> & React.ComponentProps<"textarea">) => {
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
            {label ? (
              <FieldLabel htmlFor={name}>
                {label}
                {isRequired ? (
                  <span className="ml-1 text-red-600">*</span>
                ) : null}
              </FieldLabel>
            ) : null}
            <InputGroup>
              <InputGroupTextarea
                {...field}
                id={name}
                aria-invalid={isInvalid}
                style={prefixLeft ? { paddingLeft: `${prefixWidth}px` } : {}}
                {...props}
              />
              {prefix && (
                <InputGroupAddon
                  align="inline-end"
                  className="cursor-pointer font-bold"
                >
                  {prefix}
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

export { FieldTextareaInput }
