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
      console.log("Loading flight from local storage");
      if (process.client) {
        const storedFlight = localStorage.getItem('selectedFlight');
        console.log("Stored flight:", storedFlight);
        if (storedFlight) {
          this.selectedFlight = JSON.parse(storedFlight);
          console.log("Parsed stored flight:", this.selectedFlight);
        } else {
          console.log("No stored flight found");
          this.selectedFlight = null;
        }
      }
    },
  },
});