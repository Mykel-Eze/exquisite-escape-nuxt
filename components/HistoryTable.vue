<template>
  <div id="history-table">
    <div class="table-controls">
      <div class="history-search-bar-wrapper rel">
        <input v-model="searchQuery" placeholder="Search booking code" class="search-bar" />
        <img src="~/assets/images/search-icon.svg" alt="search-icon" class="search-icon">
      </div>
      <div class="filter-checkboxes">
        <label v-for="status in statusOptions" :key="status">
          <input
            type="checkbox"
            class="filled-in"
            :value="status"
            v-model="selectedStatuses"
            @change="filterItems"
          />
          <span>{{ status }}</span>
        </label>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredItems" :key="item[uniqueKey]">
          <td v-for="header in headers" :key="header">
            {{ item[camelCase(header)] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'HistoryTable',
  props: {
    data: {
      type: Array,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    statusOptions: {
      type: Array,
      required: true
    },
    uniqueKey: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchQuery: '',
      selectedStatuses: ['All'],
      filteredItems: []
    }
  },
  mounted() {
    this.filterItems()
  },
  methods: {
    filterItems() {
      let filtered = this.data

      if (!this.selectedStatuses.includes('All')) {
        filtered = filtered.filter(item => this.selectedStatuses.includes(item.status))
      }

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(item =>
          Object.values(item).some(value =>
            String(value).toLowerCase().includes(query)
          )
        )
      }

      this.filteredItems = filtered
    },
    camelCase(str) {
      return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }
  },
  watch: {
    searchQuery() {
      this.filterItems()
    },
    data: {
      handler() {
        this.filterItems()
      },
      deep: true
    }
  }
}
</script>

<style></style>