import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import {
  CircleCheckIcon,
  InfoIcon,
  LucideIcon,
  OctagonXIcon,
} from 'lucide-react';
import { ReactNode } from 'react';

interface Props {
  Icon?: LucideIcon;
  message: ReactNode;
  className?: string;
  action?: ReactNode;
  description?: ReactNode;
  type: 'error' | 'success' | 'info';
}

export function AlertDescriptionInput({
  type,
  Icon,
  action,
  message,
  className,
  description,
}: Props) {
  const colors = [
    {
      className:
        'border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50',
      type: 'error',
      icon: (
        <OctagonXIcon
          className="mt-0.5 shrink-0 opacity-60"
          size={18}
          aria-hidden="true"
        />
      ),
    },
    {
      className:
        'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-50',
      type: 'success',
      icon: (
        <CircleCheckIcon
          className="mt-0.5 inline-flex opacity-60"
          size={18}
          aria-hidden="true"
        />
      ),
    },
    {
      className:
        'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-50',
      type: 'info',
      icon: (
        <InfoIcon
          className="mt-0.5 inline-flex opacity-60"
          size={18}
          aria-hidden="true"
        />
      ),
    },
  ];

  const oneColor = colors.find((color) => color.type === type);

  return (
    <Alert
      className={cn(
        'rounded-sm',
        action &&
          'has-data-[slot=alert-action]:pr-2.5 has-data-[slot=alert-action]:md:pr-18',
        oneColor?.className,
        className,
      )}
    >
      {Icon ? (
        <Icon
          className="mt-0.5 shrink-0 opacity-60"
          size={18}
          aria-hidden="true"
        />
      ) : (
        oneColor?.icon
      )}
      {message && <AlertTitle>{message}</AlertTitle>}
      {description && <AlertDescription>{description}.</AlertDescription>}
      {action && (
        <AlertAction className="static col-start-2 mt-2 md:absolute md:mt-0">
          {action}
        </AlertAction>
      )}
    </Alert>
  );
}
