import { useReactIntersectionObserver } from "@/components/hooks";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Field, FieldDescription, FieldError } from "@/components/ui/field";
import { Loader2Icon } from "lucide-react";
import { ReactNode } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface SelectItem {
  label: string;
  value: string;
}

interface Props<T extends FieldValues = FieldValues> {
  control: Control<T>;
  label?: string;
  name: Path<T>;
  disabled?: boolean;
  placeholder?: string;
  items: ReadonlyArray<SelectItem>;
  isRequired?: boolean;
  prefix?: ReactNode;
  fieldDescription?: ReactNode;
  prefixLeft?: ReactNode;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
}
const FieldSelectComboboxInput = <T extends FieldValues = FieldValues>({
  control,
  label = "",
  name,
  fieldDescription,
  isRequired,
  placeholder = "",
  items,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage = () => {},
  disabled,
}: Props<T>) => {
  const { ref } = useReactIntersectionObserver({
    hasNextPage: hasNextPage ?? false,
    fetchNextPage: fetchNextPage ?? (() => {}),
    isFetching: isFetchingNextPage ?? false,
  });
  return (
    <>
      <Controller
        name={name}
        control={control}
        disabled={disabled}
        render={({ field, fieldState: { invalid, error } }) => (
          <Field data-invalid={invalid}>
            <Combobox
              value={field.value}
              onValueChange={(val) => field.onChange(val)}
              items={items}
              autoHighlight
              itemToStringValue={(item: SelectItem) => item.label}
            >
              <ComboboxInput
                showClear
                placeholder={placeholder}
                aria-invalid={invalid}
                aria-label={placeholder}
              />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item.value} value={item.value}>
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxList>
                {hasNextPage && (
                  <div
                    ref={ref}
                    className="flex min-h-10 items-center justify-center py-2"
                  >
                    {isFetchingNextPage ? (
                      <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
                    ) : null}
                  </div>
                )}
              </ComboboxContent>
            </Combobox>{" "}
            *
            {fieldDescription && (
              <FieldDescription>{fieldDescription}</FieldDescription>
            )}
            {invalid && <FieldError errors={[error]} />}
          </Field>
        )}
      />
    </>
  );
};

export { FieldSelectComboboxInput };
