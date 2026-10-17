import { useReactIntersectionObserver } from '@/components/hooks';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Spinner } from '@/components/ui/spinner';
import { XIcon } from 'lucide-react';
import { ReactNode, useMemo } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

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

const FieldSelectInput = <T extends FieldValues = FieldValues>({
  control,
  label = '',
  name,
  fieldDescription,
  isRequired,
  placeholder = '',
  items,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage = () => {},
  disabled,
}: Props<T> & React.ComponentProps<'select'>) => {
  const { ref } = useReactIntersectionObserver({
    hasNextPage: hasNextPage ?? false,
    fetchNextPage: fetchNextPage ?? (() => {}),
    isFetching: isFetchingNextPage ?? false,
  });

  const options = useMemo(
    () => items?.map((item) => ({ label: item.label, value: item.value })),
    [items],
  );

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

            <div className="relative">
              <NativeSelect
                {...field}
                aria-invalid={isInvalid}
                // hideChevron={!!field.value}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value); // Update form state
                }}
                disabled={disabled}
                className="max-w-full"
              >
                <NativeSelectOption value="">{placeholder}</NativeSelectOption>
                {options?.map(({ label, value }: SelectItem) => (
                  <NativeSelectOption value={value} key={value}>
                    {label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              {field.value && (
                <Button
                  size="sm"
                  type="button"
                  variant="ghost"
                  disabled={disabled}
                  className="absolute top-1/2 right-1 size-6 -translate-y-1/2 cursor-pointer p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => field.onChange('')}
                >
                  <XIcon className="size-4" />
                </Button>
              )}
              {hasNextPage && (
                <Button
                  ref={ref}
                  size="sm"
                  type="button"
                  variant="ghost"
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                  className="absolute top-1/2 right-1 size-6 -translate-y-1/2 cursor-pointer p-0"
                >
                  <Spinner aria-label="Loading..." />
                </Button>
              )}
            </div>
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

export { FieldSelectInput };
