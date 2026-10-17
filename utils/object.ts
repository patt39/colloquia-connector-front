export function isObjectEmpty(object: object | null | undefined) {
  if (!object) return true

  for (let _ in object) return false

  return true
}

export function mergeLv2(target: any, source: any) {
  const result = { ...target }

  for (let key in source)
    result[key] =
      key in target ? { ...target[key], ...source[key] } : source[key]

  return result
}

export function toFormData<T extends Record<string, any>>(values: T): T {
  const formData = new FormData()

  for (const key in values) {
    const value = values[key]

    if (value !== undefined && value !== "undefined") {
      if (!Array.isArray(value)) {
        formData.append(key as string, value !== null ? value : "")
      } else {
        value.forEach((item: any) => {
          formData.append(key as string, item !== null ? item : "")
        })
      }
    }
  }

  return formData as unknown as T
}
