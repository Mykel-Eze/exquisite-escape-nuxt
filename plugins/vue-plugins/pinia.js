import { createApp } from "vue";
import { createPinia } from "pinia";
// import App from "./App.vue";

const pinia = createPinia();

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(pinia);
  nuxtApp.vueApp.mount(pinia);
});
