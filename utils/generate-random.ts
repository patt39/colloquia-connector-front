import { murmurhash2_x86_32, murmurhash3_x64_128 } from "number-generator"
import { v4 as uuidv4 } from "uuid"

export const generateUUID = () => uuidv4()

export const generateCouponCode = (length: number) => {
  let result = ""
  const generator = murmurhash3_x64_128(`${generateUUID}`)
  const characters =
    `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789${generator}`.toUpperCase()
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const generateLongUUID = (length: number) => {
  let result = ""
  const generator = murmurhash3_x64_128(`${generateUUID}`)
  const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789${generator}`
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const generateNumber = (length: number) => {
  let result = ""

  const generator = murmurhash2_x86_32(`${generateUUID}`)
  const characters = `0123456789${generator}`
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export function toURL(title: string) {
  return title
    .toLowerCase()
    .replace(/(\s|'(?=.))/g, "-")
    .replace(/(%|')/g, "")
    .replace(/[àá]/g, "a")
    .replace(/[èé]/g, "e")
    .replace(/[ìí]/g, "i")
    .replace(/[òó]/g, "o")
    .replace(/[ùú]/g, "u")
}
