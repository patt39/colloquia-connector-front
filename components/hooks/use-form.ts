import { AlertDangerNotification } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useState } from "react"
import {
  DefaultValues,
  FieldPath,
  FieldValues,
  Resolver,
  SubmitHandler,
  useForm as useHookForm,
} from "react-hook-form"
import { z } from "zod"

export type UseFormReturn<T extends FieldValues = FieldValues> = ReturnType<
  typeof useHookForm<T>
>

type UseFormProps<T extends FieldValues = FieldValues> = {
  disabled?: boolean
  values?: Partial<T>
  ZodType: z.ZodType<T, T>
  defaultValues?: DefaultValues<T>
  handleSubmit?: (values: T) => void | Promise<void>
}

export function useForm<T extends FieldValues = FieldValues>({
  values,
  disabled,
  ZodType,
  defaultValues,
  handleSubmit,
}: UseFormProps<T>) {
  const [isLoading, setLoading] = useState(false)

  const form = useHookForm<T>({
    disabled,
    defaultValues,
    values: values as T,
    resolver: zodResolver(ZodType) as Resolver<T>,
  })

  const onSubmit = async (values: T) => {
    if (!handleSubmit) return

    setLoading(true)

    try {
      await handleSubmit(values)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      AlertDangerNotification({
        description: `${(err as AxiosError<{ message?: string }>)?.response?.data?.message}`,
      })
      const details = (err as AxiosError<{ details?: [string, string][] }>)
        ?.response?.data?.details
      if (details) {
        for (const [target, message] of details) {
          form.setError(
            target as FieldPath<T>,
            { message },
            { shouldFocus: true }
          )
        }
      }
    }
  }

  return {
    ...form,
    isLoading,
    formProps: form,
    isValid: form.formState.isValid,
    error: form.formState.errors.root,
    isModified: form.formState.isDirty,
    defaultValues: form.formState.defaultValues,
    onSubmit: form.handleSubmit(onSubmit as SubmitHandler<T>),
  }
}
