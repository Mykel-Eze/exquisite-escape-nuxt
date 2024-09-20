import Toast, { type PluginOptions } from "vue-toastification";

export default defineNuxtPlugin((nuxtApp) => {
  const options: PluginOptions = {
    // You can set your default options here
  };

  nuxtApp.vueApp.use(Toast, options);
});