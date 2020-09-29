import { extend, configure } from "vee-validate"
import { required, email, integer, min } from "vee-validate/dist/rules"

extend("required", required)
extend("email", email)
extend("integer", integer)
extend("min", min)

export default function VeeValidatePlugin({ app }) {
  configure({
    defaultMessage: (_, values) =>
      app.i18n.t(`validations.${values._rule_}`, values),
  })
}
