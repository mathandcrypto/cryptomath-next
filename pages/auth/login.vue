<template>
  <section class="section is-flex auth-section">
    <div class="container">
      <login-content />
    </div>
  </section>
</template>

<script>
import LoginContent from "@/components/Auth/Login/Content"
export default {
  components: { LoginContent },
  middleware({ $auth, redirect }) {
    if ($auth.loggedIn) {
      redirect("/profile")
    }
  },
}
</script>

<style lang="scss" scoped>
.auth-section {
  height: 100%;
  align-items: center;
}
</style>
