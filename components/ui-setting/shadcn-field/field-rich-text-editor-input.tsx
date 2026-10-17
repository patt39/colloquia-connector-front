import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { RichTextEditor } from "../richtext/richtext.editor";

interface Props<T extends FieldValues = FieldValues> {
  control: Control<T>;
  label?: string;
  name: Path<T>;
  isRequired?: boolean;
  prefixRight?: ReactNode;
  fieldDescription?: ReactNode;
  prefixLeft?: ReactNode;
  toolbar?: "hidden";
  placeholder?: string;
  disabled?: boolean;
}

const FieldRichTextEditorInput = <T extends FieldValues = FieldValues>({
  control,
  label = "",
  name,
  prefixRight,
  isRequired,
  prefixLeft,
  toolbar,
  disabled,
  placeholder,
  fieldDescription,
  ...props
}: Props<T> & React.ComponentProps<"textarea">) => {
  const prefixRef = useRef<HTMLDivElement>(null);
  const [prefixWidth, setPrefixWidth] = useState(0);

  useEffect(() => {
    if (prefixLeft && prefixRef.current) {
      const width = prefixRef.current.offsetWidth;
      setPrefixWidth(width);
    }
  }, [prefixLeft]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
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
            <RichTextEditor
              {...field}
              toolbar={toolbar}
              disabled={disabled}
              isInvalid={isInvalid}
              placeholder={placeholder}
            />
            {fieldDescription && (
              <FieldDescription>{fieldDescription}</FieldDescription>
            )}
            {isInvalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};

export { FieldRichTextEditorInput };
