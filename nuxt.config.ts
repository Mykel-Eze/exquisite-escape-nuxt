// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  app: {
    head: {
      link: [
        { rel: "icon", type: "image/png", href: "/ee-icon.png" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons" },
      ],
      title: "Exquisite Escape",
      meta: [
        { name: "author", content: "Exquisite Escape" },
        { hid: "description", name: "description", content: "Explore, Journey, Discover, Adventure" },
        { name: "Keywords", content: "Exquisite Escape, Explore, Journey, Discover, Adventure" },
        { name: "theme-color", content: "#00A79D" },
      ],
      // script: [
      //   { src: 'https://js.paystack.co/v1/inline.js', defer: true }
      // ],
    },
  },

  devtools: {
    enabled: false,
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  imports: {
    dirs: ["constants/**", "composables/**"],
  },

  build: {
    transpile: ['vue-toastification'],
  },

  modules: ["nuxt-swiper", "@pinia/nuxt"],

  plugins: [
    "@/plugins/vue-plugins/antd-ui.js",
    "@/plugins/components/global-components",
    "@/plugins/toast.client.ts",
    '@/plugins/init-cart.js'
  ],

  css: [
    "@/assets/css/main.css",
    "materialize-css/dist/css/materialize.min.css",
    "@/assets/css/fonts.css",
    "@/assets/scss/main.scss",
    "@/assets/css/styles.css",
    "vue-toastification/dist/index.css",
  ],

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  runtimeConfig: {
    paystackSecretKey: process.env.PAYSTACK_SECRET_KEY,
    public: {
      BASE_URL: process.env.BASE_URL,
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://api.exquisiteescape.com',
      paystackPublicKey: process.env.PAYSTACK_PUBLIC_KEY,
    },
  },

  // router: {
  //   middleware: ['auth'],
  // },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },

  compatibilityDate: "2024-09-17",

  // dev: true, // If you're in development mode
  // debug: true,
})