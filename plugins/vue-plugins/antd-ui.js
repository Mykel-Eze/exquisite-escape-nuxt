import { createApp } from "vue";
// import Antd from "ant-design-vue/lib";
import {
  Table,
  Dropdown,
  Menu,
  Modal,
  Tabs,
  Radio,
  Drawer,
  Collapse,
  Checkbox,
  Badge,
  Switch,
  Carousel,
  DatePicker,
} from "ant-design-vue";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Table);
  nuxtApp.vueApp.use(Dropdown);
  nuxtApp.vueApp.use(Menu);
  nuxtApp.vueApp.use(Modal);
  nuxtApp.vueApp.use(Tabs);
  nuxtApp.vueApp.use(Radio);
  nuxtApp.vueApp.use(Drawer);
  nuxtApp.vueApp.use(Collapse);
  nuxtApp.vueApp.use(DatePicker);

  // nuxtApp.vueApp.use(Antd);
  nuxtApp.vueApp.use(Checkbox);
  nuxtApp.vueApp.use(Badge);
  nuxtApp.vueApp.use(Switch);
  nuxtApp.vueApp.use(Carousel);
});
