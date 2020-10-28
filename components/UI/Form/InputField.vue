<template>
  <div class="field">
    <label v-if="hasLabel" :for="labelFor" :class="labelClass" class="label">
      <slot name="label">{{ label }}</slot>
    </label>
    <slot />
    <b-input
      :id="labelFor"
      v-model="inputValue"
      :placeholder="inputPlaceholder"
      :type="inputType"
    />
    <transition name="fade">
      <div v-if="messages.length" class="is-flex messages" :class="newType">
        <span v-for="(message, index) in messages" :key="index">
          {{ message }}
        </span>
      </div>
    </transition>
    <p v-if="hasHelp" class="help">
      <slot v-if="$slots.help" name="help" />
      <template v-else>
        {{ help }}
      </template>
    </p>
  </div>
</template>

<script>
export default {
  name: "CmInputField",
  props: {
    value: {
      type: String,
      default: "",
    },
    type: {
      type: Object,
      default: () => ({}),
    },
    label: {
      type: String,
      default: "",
    },
    labelFor: {
      type: String,
      default: "",
    },
    labelClass: {
      type: String,
      default: "",
    },
    inputPlaceholder: {
      type: String,
      default: "",
    },
    inputType: {
      type: String,
      default: "text",
    },
    help: {
      type: String,
      default: "",
    },
    messages: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      newType: this.type,
      _isField: true, // eslint-disable-line
    }
  },
  computed: {
    hasLabel() {
      return this.label || this.$slots.label
    },
    hasHelp() {
      return this.help || this.$slots.help
    },
    inputValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit("input", value)
      },
    },
  },
  watch: {
    type(value) {
      this.newType = value
    },
  },
}
</script>
