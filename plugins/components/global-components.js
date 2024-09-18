import { defineComponent } from "vue";
import BaseButton from "@/components/base/BaseButton";
import BaseIcons from "@/components/base/BaseIcons";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("BaseButton", BaseButton);
  nuxtApp.vueApp.component("BaseIcons", BaseIcons);
});
