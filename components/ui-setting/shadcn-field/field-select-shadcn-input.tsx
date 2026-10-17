import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Check, ChevronDown, XIcon } from "lucide-react";
import { useDebounce, useReactIntersectionObserver } from "@/components/hooks";
import { useIntl } from "react-intl";

export type SelectItem = {
  label: string;
  value: string;
};

// type AsyncSelectProps = {
//   name: string
//   control: Control<FieldValues>
//   errors?: FieldErrors<FieldValues>
//   label?: string
//   placeholder?: string
//   disabled?: boolean
//   className?: string
//   /** Options list (e.g. from infinite query pages flattened) */
//   items: ReadonlyArray<AsyncSelectOption>
//   /** Infinite pagination: load more when scrolling to bottom */
//   hasNextPage?: boolean
//   fetchNextPage?: () => void
//   isFetchingNextPage?: boolean
//   isRequired?: boolean
//   /** When set, search is sent to the API (parent must pass search to the query). No client-side filter. */
//   onSearchChange?: (value: string) => void
// }
interface Props<T extends FieldValues = FieldValues> {
  control: Control<T>;
  label?: string;
  name: Path<T>;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  items: ReadonlyArray<SelectItem>;
  isRequired?: boolean;
  prefix?: ReactNode;
  fieldDescription?: ReactNode;
  prefixLeft?: ReactNode;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
  onSearchChange?: (value: string) => void;
}

const FieldSelectShadcnInput = <T extends FieldValues = FieldValues>({
  control,
  label = "",
  name,
  fieldDescription,
  isRequired,
  placeholder = "",
  items,
  className,
  onSearchChange,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage = () => {},
  disabled,
}: Props<T>) => {
  const t = useIntl();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useDebounce(searchQuery, 500);
  const { ref: loadMoreRef } = useReactIntersectionObserver({
    hasNextPage: hasNextPage ?? false,
    fetchNextPage: fetchNextPage ?? (() => {}),
    isFetching: isFetchingNextPage ?? false,
  });

  useEffect(() => {
    onSearchChange?.(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  const options = useMemo(
    () => items?.map((item) => ({ name: item.label, value: item.value })) || [],
    [items],
  );

  const filteredOptions = useMemo(() => {
    if (onSearchChange) {
      return options;
    }
    if (!searchQuery.trim()) return options;
    const q = searchQuery.toLowerCase();
    return options.filter(
      (opt) =>
        opt.name.toLowerCase().includes(q) ||
        opt.value.toLowerCase().includes(q),
    );
  }, [options, searchQuery, onSearchChange]);

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { invalid, error } }) => {
          const selectedOption = options.find((o) => o.value === field.value);
          const displayLabel = selectedOption?.name ?? "";

          return (
            <Field data-invalid={invalid}>
              {label ? (
                <FieldLabel htmlFor={name}>
                  {label}
                  {isRequired ? (
                    <span className="ml-1 text-red-600">*</span>
                  ) : null}
                </FieldLabel>
              ) : null}
              <Popover open={open} onOpenChange={setOpen} modal>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    name={name}
                    disabled={disabled}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "relative inline-flex h-9 w-full justify-start overflow-hidden pr-8 text-left font-normal text-nowrap text-ellipsis",
                      disabled && "cursor-not-allowed opacity-50",
                      className,
                    )}
                  >
                    {displayLabel ? (
                      <span className="truncate">{displayLabel}</span>
                    ) : (
                      <span className="truncate text-muted-foreground">
                        {placeholder}
                      </span>
                    )}
                    {field.value ? (
                      <Button
                        size="icon"
                        type="button"
                        variant="ghost"
                        className="absolute top-0 right-0 my-2.5 mr-2 size-4 opacity-50"
                        onClick={() => field.onChange("")}
                      >
                        <XIcon
                          onClick={() => field.onChange("")}
                          className="size-4"
                        />
                      </Button>
                    ) : (
                      <ChevronDown className="absolute top-0 right-0 my-2.5 mr-2 size-4 opacity-50" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command shouldFilter={false}>
                    <CommandInput
                      value={searchQuery}
                      onValueChange={setSearchQuery}
                      placeholder={t.formatMessage({
                        id: "PLACEHOLDER.SEARCH",
                      })}
                    />
                    <CommandList className="max-h-full">
                      {filteredOptions.length === 0 && (
                        <CommandEmpty>Nessun risultato.</CommandEmpty>
                      )}
                      {filteredOptions.length > 0 && (
                        <CommandGroup>
                          {filteredOptions.map((option) => (
                            <CommandItem
                              key={option.value}
                              value={option.value}
                              onSelect={() => {
                                const newValue =
                                  field.value === option.value
                                    ? ""
                                    : option.value;
                                field.onChange(newValue);
                                setOpen(false);
                                setSearchQuery("");
                                onSearchChange?.("");
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 max-h-4 min-h-4 max-w-4 min-w-4",
                                  option.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              <span className="overflow-hidden text-nowrap text-ellipsis">
                                {option.name}
                              </span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                      {/* {hasNextPage && (
                      <div
                        ref={loadMoreRef}
                        className="flex min-h-10 items-center justify-center py-2"
                      >
                        {isFetchingNextPage ? (
                          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
                        ) : null}
                      </div>
                    )} */}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {fieldDescription && (
                <FieldDescription>{fieldDescription}</FieldDescription>
              )}
              {invalid && <FieldError errors={[error]} />}
            </Field>
          );
        }}
      />
    </>
  );
};

export { FieldSelectShadcnInput };
