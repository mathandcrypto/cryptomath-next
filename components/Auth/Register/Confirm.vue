<template>
  <div
    class="box is-flex register-confirm-content colors__background_apple-green colors__font_mako"
  >
    <h5 class="title is-5 mb-6">
      {{ $t("auth.register.confirm.title") }}
    </h5>
    <p class="is-size-5 mb-2">
      {{ $t("auth.register.confirm.body", { display_name: data.displayName }) }}
    </p>
    <p class="is-size-6">
      {{ $t("auth.register.confirm.email", { email: data.email }) }}
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "RegisterConfirm",
  computed: {
    ...mapState({
      data: (state) => state.register.data,
    }),
  },
}
</script>

<style lang="scss" scoped>
.register-confirm-content {
  width: 660px;
  flex-direction: column;
  margin: auto;
}
</style>
