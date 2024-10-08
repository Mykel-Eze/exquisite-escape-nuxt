// store/cart.js
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  getters: {
    isEmpty: (state) => state.items.length === 0,
    totalItems: (state) => state.items.length,
    totalPrice: (state) => {
      return state.items.reduce((total, item) => {
        const adultPrice = item.tour.amountsFrom.find(amount => amount.paxType === 'ADULT')?.amount || 0;
        const childPrice = item.tour.amountsFrom.find(amount => amount.paxType === 'CHILD')?.amount || 0;
        return total + (adultPrice * item.adults) + (childPrice * item.children);
      }, 0);
    }
  },
  actions: {
    initializeStore() {
      if (process.client) {
        const stored = localStorage.getItem('cartItems');
        if (stored) {
          this.items = JSON.parse(stored);
        }
      }
    },
    addItem(item) {
      const newItem = {
        ...item,
        id: Date.now().toString(),
        date: item.departureDate || item.date,
        destinationDate: item.destinationDate
      };
      this.items.push(newItem);
      this.saveToLocalStorage();
    },
    removeItem(id) {
      const index = this.items.findIndex(item => item.id === id);
      if (index !== -1) {
        this.items.splice(index, 1);
        this.saveToLocalStorage();
      }
    },
    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
    },
    getCartItemById(id) {
      return this.items.find(item => item.id === id);
    },
    updateItemDates(id, departureDate, destinationDate) {
      const item = this.getCartItemById(id);
      if (item) {
        item.date = departureDate;
        item.destinationDate = destinationDate;
        this.saveToLocalStorage();
      }
    },
    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
      }
    }
  }
});