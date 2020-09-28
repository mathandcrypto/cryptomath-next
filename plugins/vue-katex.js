import Vue from "vue"
import VueKatex from "vue-katex"

Vue.use(VueKatex, {
  globalOptions: {
    output: "htmlAndMathml",
  },
})
