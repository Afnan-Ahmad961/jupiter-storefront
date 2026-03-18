import { toast } from "@medusajs/ui"

export const toastError = (message: string) => {
  toast.error("Something went wrong", {
    description: message,
    duration: 5000,
  })
}

export const toastSuccess = (message: string) => {
  toast.success("Success", {
    description: message,
    duration: 3000,
  })
}

export const toastInfo = (message: string) => {
  toast.info("Info", {
    description: message,
    duration: 3000,
  })
}
