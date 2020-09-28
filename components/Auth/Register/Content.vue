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
      <ValidationObserver ref="observer" tag="div" class="is-flex fields">
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
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
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
          rules="required"
          tag="div"
          class="mb-4"
        >
          <cm-input-field
            v-model="password"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :label="$t('auth.register.fields.password.label')"
            label-for="password"
            input-type="password"
            :help="$t('auth.register.fields.password.help')"
            :messages="errors"
          />
        </ValidationProvider>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { ValidationObserver, ValidationProvider } from "vee-validate"
import CmInputField from "@/components/UI/Form/InputField"

export default {
  name: "RegisterContent",
  components: {
    CmInputField,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      displayName: "",
      email: "",
      password: "",
      captchaAnswer: "",
      error: null,
    }
  },
  computed: {
    ...mapState({
      captcha: (state) => state.register.captcha,
    }),
    alertText() {
      return ""
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
      flex-direction: column;
      z-index: 2;
    }
  }
}
</style>