<template>
  <div class="is-flex default-layout">
    <page-header />
    <div class="default-layout__content">
      <Nuxt />
    </div>
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
  height: 100%;
  background-image: url(../assets/images/bg.png);
  background-position: top left;
  background-repeat: repeat;

  &__content {
    flex: 1 0 auto;
  }
}
</style>
