import { Label } from "@/components/ui/label";
import { Control, Controller } from "react-hook-form";
import { RichTextEditor } from "./richtext/richtext.editor";

interface Props {
  control: Control<any>;
  label?: string;
  name: string;
  toolbar?: "hidden";
  required?: boolean;
  isRequired?: boolean;
  errors: { [key: string]: { message: string } };
  placeholder?: string;
  defaultValue?: string;
}

const RichTextEditorInput = ({
  control,
  label = "",
  name,
  errors,
  toolbar,
  isRequired,
  placeholder = "",
  defaultValue,
}: Props) => {
  return (
    <>
      {label ? (
        <Label htmlFor={name} className="mb-2 block text-sm font-bold">
          {label}
          {isRequired ? <span className="ml-1 text-red-600">*</span> : null}
        </Label>
      ) : null}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: "Please enter post description",
        }}
        render={({ field }) => (
          <RichTextEditor
            {...field}
            toolbar={toolbar}
            placeholder={placeholder}
          />
        )}
      />
      {errors?.[name] && (
        <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
          {errors?.[name]?.message}
        </span>
      )}
    </>
  );
};

export { RichTextEditorInput };
