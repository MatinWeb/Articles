/* eslint-env node */

const { configure } = require("quasar/wrappers");
const path = require("path");

module.exports = configure(function (/* ctx */) {
  return {
    boot: ["i18n", "axios"],

    css: ["app.scss"],

    extras: ["roboto-font", "material-icons"],

    build: {
      target: {
        browser: ["es2019", "edge88", "firefox78", "chrome87", "safari13.1"],
        node: "node16",
      },

      vueRouterMode: "history",

      vitePlugins: [
        [
          "@intlify/vite-plugin-vue-i18n",
          {
            include: path.resolve(__dirname, "./src/i18n/**"),
          },
        ],
      ],
    },

    devServer: {
      open: true,
    },

    framework: {
      config: {
        screen: {
          bodyClasses: true,
        },
      },
      plugins: ["Notify", "LoadingBar"],
      config: {
        notify: {},
        loadingBar: {
          color: "contrast",
          position: "top",
          size: "4px",
        },
      },

      plugins: [],
    },

    animations: [
      "slideInLeft",
      "slideInRight",
      "slideOutRight",
      "slideOutLeft",
      "fadeOutRight",
      "fadeInLeft",
      "fadeOut",
      "fadeIn",
    ],
    ssr: {
      pwa: false,

      prodPort: 3000,

      middlewares: ["render"],
    },

    pwa: {
      workboxMode: "generateSW",
      injectPwaMetaTags: true,
      swFilename: "sw.js",
      manifestFilename: "manifest.json",
      useCredentialsForManifestTag: false,
    },

    cordova: {},

    capacitor: {
      hideSplashscreen: true,
    },

    electron: {
      inspectPort: 5858,

      bundler: "packager",

      packager: {},

      builder: {
        appId: "articles",
      },
    },

    bex: {
      contentScripts: ["my-content-script"],
    },
  };
});
