// plugins/init-cart.js
import { useCartStore } from '@/store/cart';

export default defineNuxtPlugin(() => {
  const cartStore = useCartStore();
  cartStore.initializeStore();
});