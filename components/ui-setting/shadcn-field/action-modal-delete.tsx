import { buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { MouseEventHandler, ReactNode } from "react";
import { useIntl } from "react-intl";
import { ButtonInput } from "../button-input";
import { ResponsiveDialogInput } from "../responsive-dialog-input";
import { AlertDescriptionInput } from "../alert-description-input";

interface Props {
  title: string;
  loading?: boolean;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  description: ReactNode;
  inputItem?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  buttonDialog?: ReactNode;
  titleConfirm?: string;
  titleCancel?: string;
  error?: string;
}

const ActionModalDialog = ({
  size,
  title,
  loading,
  isOpen,
  disabled,
  description,
  onClick,
  setIsOpen,
  variant = "destructive",
  type = "button",
  inputItem,
  className = "text-center",
  buttonDialog,
  titleConfirm,
  titleCancel,
  error,
}: Props & VariantProps<typeof buttonVariants>) => {
  const t = useIntl();

  return (
    <ResponsiveDialogInput
      title={title}
      isOpen={isOpen}
      className={className}
      setIsOpen={setIsOpen}
      buttonDialog={buttonDialog}
      description={description}
    >
      {inputItem}
      {error ? <AlertDescriptionInput type="error" message={error} /> : null}
      <div className="flex items-center gap-2">
        <ButtonInput
          size={size}
          type="button"
          className="flex-1"
          variant="outline"
          onClick={() => setIsOpen?.(!isOpen)}
          disabled={disabled || loading}
        >
          {titleCancel ?? t.formatMessage({ id: "ACTION.NO.CANCEL" })}
        </ButtonInput>
        <ButtonInput
          size={size}
          type={type}
          className="flex-1"
          variant={variant}
          onClick={onClick}
          loading={loading}
          disabled={disabled}
        >
          {titleConfirm ?? t.formatMessage({ id: "ACTION.YES.CONTINUE" })}
        </ButtonInput>
      </div>
    </ResponsiveDialogInput>
  );
};

export { ActionModalDialog };
