import { toast } from "sonner"

export const AlertSuccessNotification = ({
  text = "Success",
  description,
  type = "success",
  position = "bottom-right",
}: {
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"
  text?: string
  type?: "success" | "error" | "info" | "warning"
  description?: string
}) => {
  return toast.success(description, {
    position: position,
  })
}

export const AlertDangerNotification = ({
  description,
  position = "top-center",
}: {
  description: string
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"
}) => {
  return toast.error(description, {
    position: position,
  })
}
