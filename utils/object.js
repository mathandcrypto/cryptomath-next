export const checkNested = (obj, structure) => {
  for (let key of structure) {
    if (Array.isArray(key) && key.length > 1) {
      const nestedKey = key[0]
      const nestedStructure = key[1]

      if (
        !Object.prototype.hasOwnProperty.call(obj, nestedKey) ||
        !checkNested(obj[nestedKey], nestedStructure)
      ) {
        return false
      }
    } else if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      return false
    }
  }

  return true
}
