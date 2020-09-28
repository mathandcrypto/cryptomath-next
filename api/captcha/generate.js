import { checkNested } from "@/utils/object"

const generate = ($axios) => async () => {
  try {
    const { data } = await $axios.get("captcha/generate")

    if (checkNested(data, [["context", ["success"]], "data"])) {
      return data
    }

    return false
  } catch (error) {
    throw new Error(error)
  }
}

export default generate
