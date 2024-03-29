<template>
  <div class="is-flex register-content">
    <div class="box is-flex register-content__form">
      <img
        src="~/assets/images/torus.svg"
        alt="Form torus image"
        class="torus"
      />
      <div class="is-flex caption mb-6">
        <h5 class="title is-5 mb-0">
          {{ $t("auth.register.title") }}
        </h5>
        <small class="mt-1 fonts__ubuntu_medium colors__font_gray">
          {{ $t("auth.register.help") }}
        </small>
      </div>
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
        <!--  Display name field  -->
        <ValidationProvider
          v-slot="{ errors, valid }"
          rules="required"
          tag="div"
          class="mb-4"
        >
          <cm-input-field
            v-model="displayName"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :label="$t('auth.register.fields.display_name.label')"
            label-for="display-name"
            input-type="text"
            :help="$t('auth.register.fields.display_name.help')"
            :messages="errors"
          />
        </ValidationProvider>
        <!--  Email field -->
        <ValidationProvider
          v-slot="{ errors, valid }"
          rules="required|email"
          tag="div"
          class="mb-4"
        >
          <cm-input-field
            v-model="email"
            :type="{
              'is-danger': errors[0] || isError('email', 'invalid'),
              'is-success': valid,
            }"
            :label="$t('auth.register.fields.email.label')"
            label-for="email"
            input-type="email"
            :help="$t('auth.register.fields.email.help')"
            :messages="errors"
          />
        </ValidationProvider>
        <!--  Password  -->
        <ValidationProvider
          v-slot="{ errors, valid }"
          rules="required|min:8"
          tag="div"
          class="mb-4"
        >
          <cm-input-field
            v-model="password"
            :type="{
              'is-danger': errors[0] || isError('password', 'invalid'),
              'is-success': valid,
            }"
            :label="$t('auth.register.fields.password.label')"
            label-for="password"
            input-type="password"
            :help="$t('auth.register.fields.password.help')"
            :messages="errors"
          />
        </ValidationProvider>
        <!--  Captcha -->
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|integer"
          tag="div"
          class="mb-4"
        >
          <cm-input-field
            v-model="captchaAnswer"
            :type="{
              'is-danger': errors[0] || isErrorSource('captcha'),
            }"
            :label="$t('auth.register.fields.captcha.label')"
            label-for="captcha"
            :input-placeholder="$t('auth.register.fields.captcha.placeholder')"
            input-type="number"
            :help="$t('auth.register.fields.captcha.help')"
            :messages="errors"
          >
            <katex-element
              :expression="captcha.math"
              class="is-flex captcha-math colors__background_white py-2 mb-2"
            />
          </cm-input-field>
        </ValidationProvider>
        <b-button
          type="is-primary"
          class="fields__button mt-3"
          @click="handleSubmit(submitRegister)"
        >
          {{ $t("auth.register.buttons.sign_up") }}
        </b-button>
        <i18n
          path="auth.register.terms.text"
          tag="span"
          class="is-size-7 mt-5 colors__font_pale-sky"
        >
          <nuxt-link
            slot="terms_link"
            :to="localePath('terms')"
            target="_blank"
          >
            {{ $t("auth.register.terms.terms") }}
          </nuxt-link>
          <nuxt-link
            slot="privacy_link"
            :to="localePath('privacy')"
            target="_blank"
          >
            {{ $t("auth.register.terms.privacy") }}
          </nuxt-link>
        </i18n>
      </ValidationObserver>
    </div>
    <i18n
      path="auth.register.login.text"
      tag="div"
      class="box has-text-centered mt-4"
    >
      <nuxt-link slot="link" :to="localePath('/auth/login')">
        {{ $t("auth.register.login.link") }}
      </nuxt-link>
    </i18n>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import { ValidationObserver, ValidationProvider } from "vee-validate"
import { Auth } from "@/api"
import FormMixin from "@/mixins/form"
import CmInputField from "@/components/UI/Form/InputField"

export default {
  name: "RegisterContent",
  components: {
    CmInputField,
    ValidationObserver,
    ValidationProvider,
  },
  mixins: [FormMixin],
  data() {
    return {
      displayName: "",
      email: "",
      password: "",
      captchaAnswer: "",
    }
  },
  computed: {
    ...mapState({
      captcha: (state) => state.register.captcha,
    }),
    alertText() {
      if (this.error) {
        const { source, type } = this.error

        if (source === "user" && type === "already_exist") {
          return this.$t("auth.register.alerts.user_already_exist")
        } else if (source === "captcha" && type === "wrong_answer") {
          return this.$t("auth.register.fields.captcha.errors.wrong_answer")
        } else if (type === "invalid") {
          switch (source) {
            case "email":
              return this.$t("auth.register.fields.email.errors.invalid")
            case "password":
              return this.$t("auth.register.fields.password.errors.invalid")
          }
        }

        return this.$t("auth.register.alerts.internal_error")
      }

      return ""
    },
  },
  methods: {
    ...mapActions({
      setData: "register/setData",
    }),
    async submitRegister() {
      this.resetError()

      const { displayName, email, password } = this
      const payload = {
        captcha: {
          token: this.captcha.token,
          answer: this.captchaAnswer,
        },
        displayName,
        email,
        password,
      }
      const authRegister = Auth.register(this.$axios)

      try {
        const registerData = await authRegister(payload)

        if (registerData) {
          const { context, data } = registerData
          const { success, error } = context

          if (success) {
            this.setData(data)

            await this.$router.push(
              this.localePath({ name: "auth-register-confirm" })
            )
          } else {
            const { source, type } = error

            this.setError(source, type)
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
.register-content {
  width: 600px;
  flex-direction: column;
  margin: auto;

  &__form {
    position: relative;
    flex-direction: column;
    overflow: hidden;

    .torus {
      position: absolute;
      right: 20px;
      bottom: 5px;
      width: 558px;
      height: 468px;
      filter: opacity(5%);
    }

    .caption {
      flex-direction: column;
      z-index: 2;
    }

    .fields {
      @extend .caption;

      &__button {
        width: 100%;
      }
    }

    .captcha-math {
      width: 100%;
      justify-content: center;
      align-items: center;

      & /deep/ .katex {
        font-size: 1.3em;
      }
    }
  }
}
</style>
