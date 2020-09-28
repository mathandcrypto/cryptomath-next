import { extend, configure } from "vee-validate"
import { required, email } from "vee-validate/dist/rules"

extend("required", required)
extend("email", email)

export default function VeeValidatePlugin({ app }) {
  configure({
    defaultMessage: (_, values) =>
      app.i18n.t(`validations.${values._rule_}`, values),
  })
}
