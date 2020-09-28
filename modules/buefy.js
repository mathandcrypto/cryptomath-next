const { resolve } = require("path")

const pickFirst = (...args) => {
  for (const arg of args) {
    if (arg !== undefined) {
      return arg
    }
  }
}

export default function nuxtBuefy(moduleOptions) {
  this.nuxt.hook("build:before", () => {
    // Merge moduleOptions with default
    const options = {
      ...this.options.buefy,
      ...moduleOptions,
    }

    const buefyCss = pickFirst(
      options.css,
      // Defaults to `true` if no other options provided
      true
    )

    if (buefyCss) {
      // Add Buefy CSS
      this.options.css.unshift("buefy/dist/buefy.css")
    }

    // Base options available to template
    const templateOptions = {
      // Flag if we are tree shaking
      treeShake: false,
      //  Buefy constructor options
      constructorOptions: {},
    }

    // Specific component
    templateOptions.components = Array.isArray(options.components)
      ? options.components
      : []

    if (templateOptions.components.length > 0) {
      templateOptions.treeShake = true
    }

    // Add Buefy constructor options if present
    if (
      options.constructorOptions &&
      typeof options.constructorOptions === "object"
    ) {
      templateOptions.constructorOptions = { ...options.constructorOptions }
    }

    // Register plugin, passing options to plugin template
    this.addPlugin({
      src: resolve(__dirname, "templates/buefy.template"),
      fileName: "buefy.js",
      options: templateOptions,
    })
  })
}
