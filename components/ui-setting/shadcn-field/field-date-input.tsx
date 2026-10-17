import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon, XIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { DayPicker } from 'react-day-picker';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { useIntl } from 'react-intl';

interface Props<T extends FieldValues = FieldValues> {
  control: Control<T>;
  label?: string;
  name: Path<T>;
  isRequired?: boolean;
  inputDisabled?: boolean;
  fieldDescription?: ReactNode;
}

const FieldDateInput = <T extends FieldValues = FieldValues>({
  control,
  label = '',
  name,
  isRequired,
  inputDisabled,
  fieldDescription,
  ...props
}: Props<T> & React.ComponentProps<typeof DayPicker>) => {
  const t = useIntl();

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
              <Popover>
                <PopoverTrigger aria-invalid={isInvalid} asChild>
                  <Button
                    disabled={inputDisabled}
                    variant="outline"
                    className={cn(
                      'flex w-full cursor-pointer flex-row justify-between font-normal',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    {field.value ? (
                      format(field.value, 'PPP', {
                        locale: fr,
                      })
                    ) : (
                      <span>
                        {t.formatMessage({ id: 'PLACEHOLDER.SELECT' })}
                      </span>
                    )}
                    {!field.value && (
                      <CalendarIcon className="ml-auto size-4 opacity-50" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className={`w-full p-0`} align="start">
                  <Calendar
                    {...props}
                    locale={fr}
                    captionLayout="dropdown"
                    mode="single"
                    startMonth={new Date(1970, 0)}
                    endMonth={new Date(new Date().getFullYear() + 10, 0)}
                    selected={field.value}
                    onSelect={(date) => {
                      if (date) {
                        field.onChange(
                          new Date(
                            Date.UTC(
                              date.getFullYear(),
                              date.getMonth(),
                              date.getDate(),
                            ),
                          ),
                        );
                      } else {
                        field.onChange(date);
                      }
                    }}
                    onDayBlur={field.onBlur}
                  />
                </PopoverContent>
              </Popover>
              {field.value && (
                <Button
                  size="xs"
                  variant="ghost"
                  disabled={inputDisabled}
                  className="absolute! top-1/2 right-0.5 block -translate-y-1/2 cursor-pointer"
                  onClick={() => field && field.onChange(null)}
                >
                  <XIcon className="size-4 opacity-50" />
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

export { FieldDateInput };
