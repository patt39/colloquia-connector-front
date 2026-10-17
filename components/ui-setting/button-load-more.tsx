import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "../ui/button";
import { ButtonInput } from "./index";
import { useIntl } from "react-intl";

export const ButtonLoadMore = ({
  hasNextPage,
  className,
  variant = "outline",
  isFetchingNextPage,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
    className?: string;
    icon?: React.ReactNode;
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
  }) => {
  const t = useIntl();
  return (
    <div className={cn("my-2 sm:mt-0", className)}>
      <ButtonInput
        {...props}
        type="button"
        variant={variant}
        className={cn("w-full", className)}
        disabled={!hasNextPage || isFetchingNextPage}
        loading={isFetchingNextPage ? true : false}
      >
        {t.formatMessage({
          id: "UTIL.LOAD.MORE",
        })}
      </ButtonInput>
    </div>
  );
};
