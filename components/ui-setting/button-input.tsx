import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "../ui/button";
import { useIntl } from "react-intl";

export const ButtonInput = ({
  icon,
  loading,
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
  }) => {
  const t = useIntl();
  return (
    <Button
      {...props}
      className={cn("cursor-pointer", className)}
      size={size}
      asChild={asChild}
      variant={variant}
      disabled={props.disabled ? props.disabled : loading}
    >
      {loading ? (
        <>
          <Spinner className="size-4" />
          {t.formatMessage({ id: "UTIL.LOADING" })}
        </>
      ) : (
        <>
          {icon ? icon : null}
          {props.children ? props.children : null}
        </>
      )}
    </Button>
  );
};
