<template>
  <b-navbar
    :mobile-burger="false"
    wrapper-class="container"
    class="colors__background_shark page-header"
  >
    <template slot="brand">
      <b-navbar-item
        tag="router-link"
        :to="localePath('/')"
        class="page-header__logo"
      >
        <img
          src="~/assets/images/dodecahedron.svg"
          alt="CryptoMath logo image"
        />
        <h3 class="title is-3 fonts__ubuntu_medium ml-4 colors__font_white">
          {{ $t("brand") }}
        </h3>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="nuxt-link" :to="localePath('/articles')">
        {{ $t("layout.header.links.articles") }}
      </b-navbar-item>
      <b-navbar-item tag="nuxt-link" :to="localePath('/hubs')">
        {{ $t("layout.header.links.hubs") }}
      </b-navbar-item>
      <b-navbar-item tag="nuxt-link" :to="localePath('/users')">
        {{ $t("layout.header.links.authors") }}
      </b-navbar-item>
      <b-navbar-item tag="nuxt-link" :to="localePath('/problems')">
        {{ $t("layout.header.links.problems") }}
      </b-navbar-item>
    </template>
    <template slot="end">
      <header-profile v-if="isAuthenticated" />
      <template v-else>
        <b-button
          type="is-light"
          tag="nuxt-link"
          :to="localePath('auth-login')"
          class="mr-2"
        >
          {{ $t("layout.header.buttons.login") }}
        </b-button>
        <b-button
          type="is-primary"
          tag="nuxt-link"
          :to="localePath('auth-register')"
        >
          {{ $t("layout.header.buttons.register") }}
        </b-button>
      </template>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex"
import HeaderProfile from "@/components/Layout/Header/Profile"

export default {
  name: "PageHeader",
  components: { HeaderProfile },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
}
</script>

<style lang="scss" scoped>
.page-header {
  min-height: 64px !important;

  &__logo {
    img {
      height: 40px;
    }
  }
}
</style>
