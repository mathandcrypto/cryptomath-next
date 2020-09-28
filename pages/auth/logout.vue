<script>
export default {
  async fetch({ $auth }) {
    await $auth.logout()
  },
}
</script>
