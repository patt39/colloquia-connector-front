import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { ReactNode } from "react";
import { DropzoneProps } from "react-dropzone";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FileUploader } from "../file-uploader";

interface Props<T extends FieldValues = FieldValues> {
  control: Control<T>;
  label?: string;
  name: Path<T>;
  isRequired?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  uploadFiles: File[];
  maxFileCount?: number;
  fieldDescription?: ReactNode;
  accept?: DropzoneProps["accept"];
}

const FieldFileUploadInput = <T extends FieldValues = FieldValues>({
  control,
  label = "",
  name,
  disabled,
  isRequired,
  multiple,
  uploadFiles,
  maxFileCount,
  accept,
  fieldDescription,
}: Props<T>) => {
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

            <FileUploader
              accept={accept}
              disabled={disabled}
              multiple={multiple}
              maxSize={15 * 1024 * 1024}
              maxFileCount={maxFileCount}
              onValueChange={field.onChange}
              value={field.value ?? uploadFiles}
              className={isInvalid ? "border-red-600" : ""}
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

export { FieldFileUploadInput };
