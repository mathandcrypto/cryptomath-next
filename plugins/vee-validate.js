import { extend, configure } from "vee-validate"
import { required, email, integer } from "vee-validate/dist/rules"

extend("required", required)
extend("email", email)
extend("integer", integer)

export default function VeeValidatePlugin({ app }) {
  configure({
    defaultMessage: (_, values) =>
      app.i18n.t(`validations.${values._rule_}`, values),
  })
}
