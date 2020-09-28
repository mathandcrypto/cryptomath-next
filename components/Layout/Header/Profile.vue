<template>
  <div v-if="loggedInUser" class="is-flex header-profile">
    <nuxt-link
      class="is-flex header-profile__item-wrapper"
      :to="localePath('/profile')"
    >
      <cm-user-avatar :hash="loggedInUser.hash" />
      <span class="ml-4 fonts__ubuntu_bold colors__font_white">1</span>
    </nuxt-link>
    <nuxt-link
      class="is-flex header-profile__item-wrapper"
      :to="localePath('/auth/logout')"
    >
      <vue-mdi icon="exit-run" color="white" />
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import CmUserAvatar from "@/components/UI/User/Avatar"

export default {
  name: "HeaderProfile",
  components: { CmUserAvatar },
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/base/colors";

.header-profile {
  align-self: stretch;
  align-items: stretch;

  &__item-wrapper {
    flex-shrink: 0;
    align-items: center;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    transition: background-color 0.5s ease;

    &:hover {
      background: map-get($cm-colors, "mako");
    }
  }
}
</style>
