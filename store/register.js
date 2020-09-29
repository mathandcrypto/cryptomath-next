import { Captcha } from "@/api/index"
import {
  SET_REGISTER_CAPTCHA,
  SET_REGISTER_DATA,
} from "@/consts/mutation-types"

export const state = () => ({
  captcha: {
    token: "",
    math: "",
  },
  data: {
    id: null,
    displayName: "",
    email: "",
  },
})

export const mutations = {
  [SET_REGISTER_CAPTCHA](state, data) {
    state.captcha = Object.assign(state.captcha, data)
  },
  [SET_REGISTER_DATA](state, data) {
    state.data = Object.assign(state.data, data)
  },
}

export const actions = {
  async setCaptcha({ commit }) {
    const captchaGenerate = Captcha.generate(this.$axios)

    try {
      const captchaData = await captchaGenerate()

      if (captchaData) {
        const { context, data } = captchaData
        const { success } = context

        if (success) {
          commit(SET_REGISTER_CAPTCHA, data)

          return true
        }
      }

      return false
    } catch (error) {
      throw new Error(error)
    }
  },
  setData({ commit }, data) {
    commit(SET_REGISTER_DATA, data)
  },
}
