import { defineStore } from 'pinia';

export const useFlightStore = defineStore('flight', {
  state: () => ({
    selectedFlight: null,
    dictionaries: null,
  }),
  actions: {
    setSelectedFlight(flight) {
      this.selectedFlight = flight;
      if (process.client) {
        localStorage.setItem('selectedFlight', JSON.stringify(flight));
      }
    },
    setDictionaries(dictionaries) {
      this.dictionaries = dictionaries;
      if (process.client) {
        localStorage.setItem('flightDictionaries', JSON.stringify(dictionaries));
      }
    },
    loadSelectedFlight() {
      if (process.client) {
        const storedFlight = localStorage.getItem('selectedFlight');
        if (storedFlight) {
          this.selectedFlight = JSON.parse(storedFlight);
        } else {
          console.log("No stored flight found");
          this.selectedFlight = null;
        }
      }
    },
    clearSelectedFlight() {
      this.selectedFlight = null;
      if (process.client) {
        localStorage.removeItem('selectedFlight');
      }
    },
  },
});