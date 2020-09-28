<template>
  <section class="section is-flex register-section">
    <div class="container">
      <register-content />
    </div>
  </section>
</template>

<script>
import RegisterContent from "@/components/Auth/Register/Content"

export default {
  components: { RegisterContent },
  async fetch({ $auth, redirect, store, error }) {
    if ($auth.loggedIn) {
      redirect("/profile")
    } else {
      try {
        const status = await store.dispatch("register/setCaptcha")

        if (!status) {
          error({ statusCode: 501 })
        }
      } catch (e) {
        error({ statusCode: 500, data: e })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.register-section {
  height: 100%;
  align-items: center;
}
</style>
