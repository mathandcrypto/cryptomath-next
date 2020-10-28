<template>
  <section class="section is-flex register-confirm-section">
    <div class="container">
      <register-confirm />
    </div>
  </section>
</template>

<script>
import RegisterConfirm from "@/components/Auth/Register/Confirm"

export default {
  components: { RegisterConfirm },
  validate({ store }) {
    return !!store.state.register.data.id
  },
}
</script>

<style lang="scss" scoped>
.register-confirm-section {
  height: 100vh;
  align-items: center;
}
</style>
