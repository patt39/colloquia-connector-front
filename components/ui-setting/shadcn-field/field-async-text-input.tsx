import { useDebounce } from "@/components/hooks";
import { ButtonLoadMore } from "@/components/ui-setting";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import {
  ReactNode,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { useIntl } from "react-intl";

export type AsyncTextInputOption = {
  label: string;
  value: string;
};

interface AsyncTextInputProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  isFetching?: boolean;
  isFetchingNextPage?: boolean;
  isLoading?: boolean;
  isRequired?: boolean;
  labelLeft?: ReactNode;
  fieldDescription?: ReactNode;
  items: ReadonlyArray<AsyncTextInputOption>;
  loadMoreRef?: (node?: Element | null) => void;
  onSearchChange?: (value: string) => void;
  onSelect?: (option: AsyncTextInputOption) => void;
}

export function FieldAsyncTextInput<T extends FieldValues = FieldValues>({
  name,
  control,
  label = "",
  placeholder = "",
  disabled,
  className,
  items,
  labelLeft,
  hasNextPage,
  fetchNextPage,
  isFetching,
  isFetchingNextPage,
  isLoading,
  isRequired,
  loadMoreRef,
  onSearchChange,
  onSelect,
  fieldDescription,
}: AsyncTextInputProps<T>) {
  const t = useIntl();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchQueryDeferred = useDeferredValue(searchQuery);
  const debouncedSearch = useDebounce(searchQueryDeferred, 500);

  useEffect(() => {
    onSearchChange?.(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  const options = useMemo(
    () =>
      (items ?? [])
        .filter((item) => item?.label && item?.value)
        .map((item) => ({
          name: String(item.label),
          value: String(item.value),
        })),
    [items],
  );

  const filteredOptions = useMemo(() => {
    if (onSearchChange) {
      return options;
    }
    if (!searchQuery.trim()) return options;
    const query = searchQuery.toLowerCase();
    return options.filter(
      (option) =>
        option.name.toLowerCase().includes(query) ||
        option.value.toLowerCase().includes(query),
    );
  }, [options, searchQuery, onSearchChange]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { value, ...fieldProps } = field;
        const isInvalid = fieldState.invalid;
        const inputValue = String(value ?? "");
        const canShowResults = open && searchQuery.trim().length > 0;

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

            <Popover open={canShowResults} onOpenChange={setOpen} modal>
              <PopoverAnchor asChild>
                <div className={cn("w-full", className)}>
                  <InputGroup>
                    <InputGroupInput
                      {...fieldProps}
                      id={name}
                      value={inputValue}
                      disabled={disabled}
                      placeholder={placeholder}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      onFocus={() => {
                        if (inputValue.trim()) {
                          setSearchQuery(inputValue);
                          setOpen(true);
                        }
                      }}
                      onChange={(event) => {
                        field.onChange(event.target.value);
                        setSearchQuery(event.target.value);
                        setOpen(true);
                      }}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupText>
                        <SearchIcon className="size-4 text-muted-foreground" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </PopoverAnchor>
              {filteredOptions.length > 0 ? (
                <PopoverContent
                  align="start"
                  sideOffset={4}
                  collisionPadding={8}
                  onOpenAutoFocus={(event) => event.preventDefault()}
                  onCloseAutoFocus={(event) => event.preventDefault()}
                  className="w-(--radix-popper-anchor-width) p-0"
                >
                  <Command shouldFilter={false}>
                    <CommandList className="max-h-56 overflow-y-auto">
                      {isLoading && filteredOptions.length === 0 ? (
                        <div className="px-3 py-2 text-sm text-muted-foreground">
                          {t.formatMessage({ id: "UTIL.LOADING" })}
                        </div>
                      ) : filteredOptions.length === 0 ? (
                        <CommandEmpty>
                          {t.formatMessage({ id: "EMPTY.DATA.TITLE" })}
                        </CommandEmpty>
                      ) : (
                        <CommandGroup>
                          {filteredOptions.map((option, index) => (
                            <CommandItem
                              key={`${option.value}-${index}`}
                              value={option.value}
                              onMouseDown={(event) => event.preventDefault()}
                              onSelect={() => {
                                field.onChange(option.name);
                                setSearchQuery(option.name);
                                setOpen(false);
                                onSelect?.({
                                  label: option.name,
                                  value: option.value,
                                });
                              }}
                            >
                              <span className="min-w-0 flex-1 truncate">
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
              ) : null}
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
