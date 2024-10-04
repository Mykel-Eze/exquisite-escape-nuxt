<template>
  <div class="tourist-selector">
    <div @click="toggleDropdown" class="flex-div" :class="isOpen ? 'toggleOpen' : ''">
      <div class="dropdown-header">
        {{ totalTourists }} Tourist{{ totalTourists !== 1 ? 's' : '' }}
      </div>
      <SvgIcons icon="caret" />
    </div>
    <div v-if="isOpen" class="dropdown-content2">
      <div class="tourist-type">
        <div class="tourist">
          <span>Adults</span>
          <small>Age 5 or above</small>
        </div>
        <div class="counter">
          <button type="button" @click="decrement('adults')" :disabled="tourists.adults <= 1">
            <span>-</span>
          </button>
          <span>{{ tourists.adults }}</span>
          <button type="button" @click="increment('adults')" class="counter-add-btn">
            <span>+</span>
          </button>
        </div>
      </div>
      <div class="tourist-type">
        <div class="tourist">
          <span>Children</span>
          <small>Age 0 - 4</small>
        </div>
        <div class="counter">
          <button type="button" @click="decrement('children')" :disabled="tourists.children <= 0">
            <span>-</span>
          </button>
          <span>{{ tourists.children }}</span>
          <button type="button" @click="increment('children')" class="counter-add-btn">
            <span>+</span>
          </button>
        </div>
      </div>
      <!-- <div class="tourist-type">
        <div class="tourist">
          <span>Infants</span>
          <small>Under 2</small>
        </div>
        <div class="counter">
          <button type="button" @click="decrement('infants')" :disabled="tourists.infants <= 0">
            <span>-</span>
          </button>
          <span>{{ tourists.infants }}</span>
          <button type="button" @click="increment('infants')" class="counter-add-btn">
            <span>+</span>
          </button>
        </div>
      </div> -->
      <div class="right-align">
        <button @click="closeDropdown" class="done-button">Done</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: "ADULT"
    }
  },
   emits: ['update:modelValue'],
  data() {
    return {
      isOpen: false,
      tourists: {
        adults: 1,
        children: 0,
        // infants: 0
      }
    }
  },
  computed: {
    totalTourists() {
      return this.tourists.adults + this.tourists.children
    },
    paxType() {
      // if (this.tourists.infants > 0) return "INFANT";
      if (this.tourists.children > 0) return "CHILD";
      return "ADULT";
    }
  },
  watch: {
    paxType: {
      handler(newValue) {
        this.$emit('update:modelValue', newValue);
      }
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    closeDropdown() {
      this.isOpen = false
    },
    increment(type) {
      this.tourists[type]++
    },
    decrement(type) {
      if (this.tourists[type] > 0) {
        this.tourists[type]--
      }
    }
  }
}
</script>

<style scoped>
.tourist-selector {
  position: relative;
  min-width: 160px;
}
.tourist-selector .flex-div {
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid #FFF;
  background: rgba(229, 246, 245, 0.20);
  width: 100%;
  height: 50px;
  padding: 0px 20px;
  cursor: pointer;
  margin-bottom: 8px;
  justify-content: space-between;
}
.dropdown-header {
  font-size: 16px;
}
.dropdown-content2 {
  background-color: white;
  padding: 10px;
  position: absolute;
  z-index: 3;
  border-radius: 10px;
  color: #606161;
  box-shadow: 0px 24px 20px 0px rgba(16, 24, 40, 0.08);
}
.tourist-type {
  display: flex;
  gap: 50px;
  align-items: center;
  margin-bottom: 20px;
}
.tourist-type .tourist {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: max-content;
}
.tourist-type .tourist small {
  font-size: 12px;
  color: #9D9D9D;
}
.counter {
  display: flex;
  align-items: center;
}
.counter button {
  width: 20px;
  height: 20px;
  line-height: 1;
  background-color: white;
  border: 1px solid var(--pry-color);
  border-radius: 5px;
  cursor: pointer;
  padding: 0;
  color: var(--pry-color);
  position: relative;
}
.counter > span {
  margin: 0 10px;
  font-size: 18px;
}
.counter .counter-add-btn {
  background-color: rgba(0, 167, 157, 0.2);
}
.counter button span {
  position: absolute;
  top: -5%;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.done-button {
  width: 110px;
  height: 38px;
  font-size: 16px;
  background-color: var(--pry-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 10px;
}
</style>