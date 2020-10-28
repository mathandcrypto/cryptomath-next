<script>
import identicon from "svg-identicon"

export default {
  name: "CmUserAvatar",
  props: {
    hash: {
      type: String,
      default: "",
    },
  },
  render(h) {
    const svg = identicon({
      type: "SQUARE",
      hash: this.hash,
      width: 40,
      size: 10,
    })
    return h("div", {
      class: "is-flex user-avatar",
      domProps: {
        innerHTML: svg,
      },
    })
  },
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variables";

.user-avatar {
  width: max-content;
  justify-content: center;
  align-items: center;
  background: map-get($cm-colors, "gray-athens");
  border-radius: 2px;
  margin: auto;

  & /deep/ svg {
    width: 45px;
    height: 45px;
  }
}
</style>
