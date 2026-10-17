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

import { ButtonLoadMore } from "@/components/ui-setting";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { cn } from "@/lib/utils";
import { Check, ChevronDown, XIcon } from "lucide-react";
import {
  ReactNode,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { useDebounce } from "@/components/hooks";
import { useIntl } from "react-intl";

export type AsyncSelectOption = {
  label: string;
  value: string;
};

interface AsyncSelectProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  isFetching?: boolean;
  /** Options list (e.g. from infinite query pages flattened) */
  items: ReadonlyArray<AsyncSelectOption>;
  /** Infinite pagination: load more when scrolling to bottom */
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
  isRequired?: boolean;
  labelLeft?: ReactNode;
  fieldDescription?: ReactNode;
  loadMoreRef?: () => void;
  /** When set, search is sent to the API (parent must pass search to the query). No client-side filter. */
  onSearchChange?: (value: string) => void;
}

export function FieldAsyncSelectInput({
  name,
  control,
  label = "",
  placeholder = "",
  disabled,
  className,
  items,
  isFetching,
  labelLeft,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  isRequired,
  loadMoreRef,
  onSearchChange,
  fieldDescription,
}: AsyncSelectProps) {
  const t = useIntl();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchQueryDeferred = useDeferredValue(searchQuery);
  const debouncedSearch = useDebounce(searchQueryDeferred, 500);

  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(debouncedSearch);
    }
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

  const placeholderText =
    placeholder ||
    t.formatMessage({
      id: "PLACEHOLDER.SELECT",
    });
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const isInvalid = fieldState.invalid;
        const selectedOption = options.find((o) => o.value === field.value);
        const displayLabel = selectedOption?.name ?? "";

        return (
          <Field data-invalid={isInvalid}>
            {label || labelLeft ? (
              <div className="flex flex-row items-center justify-between">
                {label ? (
                  <FieldLabel htmlFor={name}>
                    {label}
                    {isRequired ? (
                      <span className="ml-1 text-red-600">*</span>
                    ) : null}
                  </FieldLabel>
                ) : null}
                {labelLeft}
              </div>
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
                    "relative inline-flex h-9 w-full cursor-pointer justify-start overflow-hidden pr-8 text-left font-normal text-nowrap text-ellipsis",
                    disabled && "cursor-not-allowed opacity-50",
                    isInvalid && "ring-1 ring-destructive",
                    className,
                  )}
                >
                  {displayLabel ? (
                    <span className="truncate">{displayLabel}</span>
                  ) : (
                    <span className="truncate text-muted-foreground">
                      {placeholderText}
                    </span>
                  )}
                  {field.value ? (
                    <Button
                      size="icon"
                      type="button"
                      variant="ghost"
                      className="absolute top-0 right-0 my-2.5 mr-2 size-4 cursor-pointer opacity-50"
                      onClick={() => field && field.value && field.onChange("")}
                    >
                      <XIcon
                        onClick={() =>
                          field && field.value && field.onChange("")
                        }
                        className="size-4"
                      />
                    </Button>
                  ) : (
                    <ChevronDown className="absolute top-0 right-0 my-2.5 mr-2 size-4 opacity-50" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                side="bottom"
                align="start"
                collisionPadding={8}
                className={cn(
                  "w-(--radix-popover-trigger-width) p-0",
                  className,
                )}
              >
                <Command shouldFilter={false}>
                  <CommandInput
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    placeholder={placeholderText}
                  />
                  <CommandList className="max-h-[min(12.5rem,var(--radix-popover-content-available-height))] overflow-y-auto">
                    {filteredOptions.length === 0 && (
                      <CommandEmpty>No results</CommandEmpty>
                    )}
                    {filteredOptions.length > 0 && (
                      <CommandGroup>
                        {filteredOptions.map((option, index) => (
                          <CommandItem
                            key={`${option.value}-${index}`}
                            value={option.value}
                            onSelect={() => {
                              const newValue =
                                field?.value === option.value
                                  ? ""
                                  : option.value;
                              field?.onChange(newValue);
                              setOpen(false);
                              setSearchQuery("");
                              onSearchChange && onSearchChange("");
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 max-h-4 min-h-4 max-w-4 min-w-4",
                                option.value === field?.value
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
                    {hasNextPage ? (
                      <ButtonLoadMore
                        size="sm"
                        ref={loadMoreRef}
                        className="w-full"
                        hasNextPage={hasNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                        onClick={() => {
                          if (!hasNextPage || isFetching) return;
                          fetchNextPage;
                        }}
                      />
                    ) : null}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {fieldDescription ? (
              <FieldDescription>{fieldDescription}</FieldDescription>
            ) : null}
            {isInvalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
