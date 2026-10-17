import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"
interface Props {
  title: string
  isOpen?: boolean
  className?: string
  description?: ReactNode
  buttonDialog?: ReactNode
  children?: ReactNode
  setIsOpen?: (isOpen: boolean) => void
}

const ResponsiveDialogInput = ({
  title,
  isOpen,
  setIsOpen,
  children,
  buttonDialog,
  description,
  className,
}: Props) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen} defaultOpen={isOpen}>
      {buttonDialog && <DialogTrigger>{buttonDialog}</DialogTrigger>}
      <DialogContent className={cn("sm:max-w-lg", className)}>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export { ResponsiveDialogInput }
