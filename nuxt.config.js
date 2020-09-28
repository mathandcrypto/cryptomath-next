require("dotenv").config()

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "The CryptoMath project",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "CryptoMath is a system of publishing articles related to mathematics and blockchain with the possibility of funding the author using cryptocurrencies. We also support a Q&A service with a reward for the solution.",
      },
      {
        name: "keywords",
        content:
          "blockchain, bitcoin, mathematics, math, researches, scientific articles, cryptography, articles, questions, answers, math problems, programming",
      },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@mathandcrypto" },
      {
        name: "twitter:image",
        content: "https://cryptomath.xyz/images/twitter_card.png",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://cryptomath.xyz" },
      {
        property: "og:image",
        content: "https://cryptomath.xyz/images/twitter_card.png",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  /*
   ** Global CSS
   */
  css: [
    "@/assets/styles/main",
    "@/assets/styles/buefy",
    "@mdi/vue/dist/mdi.css",
    "katex/dist/katex.min.css",
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    "@/plugins/vee-validate",
    "@/plugins/vue-mdi",
    "@/plugins/vue-katex",
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/dotenv",
    "@/modules/buefy",
    "@nuxtjs/axios",
    "nuxt-i18n",
    "@nuxtjs/auth",
  ],
  buefy: {
    css: false,
    components: ["Navbar", "Button", "Message", "Input"],
    constructorOptions: {
      defaultIconComponent: "vue-mdi",
    },
  },
  axios: {
    baseURL: process.env.API_URL,
    https: true,
  },
  i18n: {
    locales: [
      {
        code: "en",
        iso: "en-US",
        file: "en.json",
        name: "English",
      },
    ],
    lazy: true,
    langDir: "locales/",
    strategy: "prefix_and_default",
    defaultLocale: "en",
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/auth/login",
            method: "post",
            propertyName: "data.accessToken",
          },
          user: {
            url: "/profile/me",
            method: "post",
            propertyName: "data",
          },
          logout: false,
        },
        autoFetchUser: false,
        redirect: {
          login: "/auth/login",
          logout: "/auth/logout",
          callback: "/profile",
        },
      },
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    analyze: true,
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
        })
      }
    },
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        // Disable a plugin by passing false as value
        "postcss-custom-properties": {
          warnings: false,
        },
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true,
        },
      },
    },
    transpile: ["vee-validate/dist/rules"],
    extractCSS: true,
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true,
    },
  },
  router: {
    middleware: ["user"],
  },
}
