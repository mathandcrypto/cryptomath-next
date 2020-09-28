<template>
  <div class="is-flex default-layout">
    <page-header />
    <Nuxt />
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
  min-height: 100%;
  flex-direction: column;
  background-image: url(../assets/images/bg.png);
  background-position: top left;
  background-repeat: repeat;
}
</style>
