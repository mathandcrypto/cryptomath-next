<template>
  <div class="is-flex default-layout">
    <page-header />
    <main class="default-layout__content">
      <Nuxt />
    </main>
  </div>
</template>

<script>
import PageHeader from "@/components/Layout/Header"

export default {
  components: { PageHeader },
}
</script>

<style lang="scss" scoped>
.default-layout {
  flex-direction: column;
  min-height: 100vh;
  margin: auto;

  &__content {
    flex: 1 0 auto;
    background-image: url(../assets/images/bg.png);
    background-position: top left;
    background-repeat: repeat;
  }
}
</style>
