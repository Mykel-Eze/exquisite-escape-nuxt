// middleware/tour-review-auth.js
import { useCartStore } from '~/store/cart'

export default defineNuxtRouteMiddleware((to) => {
  const cartStore = useCartStore()

  const id = to.params.id
  if (!cartStore.getCartItemById(id)) {
    return navigateTo('/search-results/tours')
  }
})