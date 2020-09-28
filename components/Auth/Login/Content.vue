<template>
  <div class="is-flex login-content">
    <div class="box is-flex login-content__form">
      <img
        src="~/assets/images/dodecahedron_black.svg"
        alt="Form dodecahedron image"
        class="dodecahedron"
      />
      <h5 class="title is-5 mb-6">
        {{ $t("auth.login.title") }}
      </h5>
      <ValidationObserver
        ref="observer"
        v-slot="{ handleSubmit }"
        tag="div"
        class="is-flex fields"
      >
        <transition name="fade">
          <b-message v-if="error" type="is-danger" class="mb-4">
            {{ alertText }}
          </b-message>
        </transition>
        <!--  Email field -->
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|email"
          mode="eager"
          tag="div"
          class="mb-4"
        >
          <cm-input-field
            v-model="email"
            :type="{ 'is-danger': errors[0] }"
            :label="$t('auth.login.fields.email.label')"
            label-for="email"
            :input-placeholder="$t('auth.login.fields.email.placeholder')"
            input-type="email"
            :messages="errors"
          />
        </ValidationProvider>
        <!--  Password field  -->
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          mode="eager"
          tag="div"
          class="mb-5"
        >
          <cm-input-field
            v-model="password"
            :type="{ 'is-danger': errors[0] }"
            label-for="password"
            :input-placeholder="$t('auth.login.fields.password.placeholder')"
            input-type="password"
            label-class="is-flex flex-justify-content-between"
            :messages="errors"
          >
            <template slot="label">
              <span>{{ $t("auth.login.fields.password.label") }}</span>
              <nuxt-link :to="localePath('/auth/reminder')">
                {{ $t("auth.login.fields.password.reminder") }}
              </nuxt-link>
            </template>
          </cm-input-field>
        </ValidationProvider>
        <b-button
          type="is-primary"
          class="fields__button"
          @click="handleSubmit(submitLogin)"
        >
          {{ $t("auth.login.buttons.login") }}
        </b-button>
      </ValidationObserver>
    </div>
    <i18n
      path="auth.login.register.text"
      tag="div"
      class="box has-text-centered mt-4"
    >
      <nuxt-link slot="link" :to="localePath('/auth/register')">
        {{ $t("auth.login.register.link") }}
      </nuxt-link>
    </i18n>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate"
import CmInputField from "@/components/UI/Form/InputField"

export default {
  name: "LoginContent",
  components: {
    CmInputField,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      email: "",
      password: "",
      error: null,
    }
  },
  computed: {
    alertText() {
      if (this.error) {
        const { source, type } = this.error

        if (source === "user") {
          switch (type) {
            case "not_found":
              return this.$t("auth.login.alerts.user_not_found")
            case "wrong_password":
              return this.$t("auth.login.alerts.wrong_password")
          }
        }

        return this.$t("auth.login.alerts.internal_error")
      }

      return ""
    },
  },
  methods: {
    async submitLogin() {
      this.error = null

      const { email, password } = this

      try {
        const { data } = await this.$auth.loginWith("local", {
          data: { email, password },
        })

        if (data.context) {
          const { success, error } = data.context

          if (success) {
            await this.$auth.fetchUser()
          } else if (error) {
            const { source, type } = error

            this.error = { source, type }
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.login-content {
  width: 460px;
  flex-direction: column;
  margin: auto;

  &__form {
    position: relative;
    flex-direction: column;
    overflow: hidden;

    .dodecahedron {
      position: absolute;
      right: 10px;
      bottom: 10px;
      width: 250px;
      filter: opacity(5%);
    }

    .fields {
      flex-direction: column;
      z-index: 2;

      &__button {
        width: 100%;
      }
    }
  }
}
</style>
