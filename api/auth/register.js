import { checkNested } from "@/utils/object"

const register = ($axios) => async (payload) => {
  try {
    const { data } = await $axios.post("auth/register", payload)

    if (checkNested(data, [["context", ["success", "error"]], "data"])) {
      return data
    }

    return false
  } catch (error) {
    throw new Error(error)
  }
}

export default register
