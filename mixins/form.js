export default {
  name: "FormMixin",
  data() {
    return {
      error: null,
    }
  },
  methods: {
    setError(source, type) {
      this.error = { source, type }
    },
    resetError() {
      this.error = null
    },
    isErrorSource(source) {
      return this.error && this.error.source === source
    },
    isErrorType(type) {
      return this.error && this.error.type === type
    },
    isError(source, type) {
      return (
        this.error && this.error.source === source && this.error.type === type
      )
    },
  },
}
