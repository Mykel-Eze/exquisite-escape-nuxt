<template>
    <div class="room-guest-selector relative">
        <div @click="toggleDropdown" class="selector-header">
            <div class="flex flex-col w-[max-content]">
                <label>Rooms and guests</label>
                <span>{{ rooms }} Room{{ rooms !== 1 ? 's' : '' }}, {{ totalGuests }} Guest{{ totalGuests !== 1 ? 's' : '' }}</span>
            </div>
        </div>
        <div v-if="isOpen" class="dropdown-content2">
            <div v-for="(room, index) in localRoomsData" :key="index" class="room-section">
                <!-- <div class="text-[16px]">Room {{ index + 1 }}</div> -->
                <div class="guest-type">
                    <div class="guest">
                        <span>Adults</span>
                        <small>Age 12 or above</small>
                    </div>
                    <div class="counter">
                        <button type="button" @click="updateGuests(index, 'adults', -1)" :disabled="room.adults <= 1">
                            <span>-</span>
                        </button>
                        <span>{{ room.adults }}</span>
                        <button type="button" class="counter-add-btn" @click="updateGuests(index, 'adults', 1)">
                            <span>+</span>
                        </button>
                    </div>
                </div>
                <div class="guest-type">
                    <div class="guest">
                        <span>Children</span>
                        <small>Age 2 - 12</small>
                    </div>
                    <div class="counter">
                        <button type="button" @click="updateGuests(index, 'children', -1)" :disabled="room.children <= 0">
                            <span>-</span>
                        </button>
                        <span>{{ room.children }}</span>
                        <button type="button" class="counter-add-btn" @click="updateGuests(index, 'children', 1)">
                            <span>+</span>
                        </button>
                    </div>
                </div>
                <button type="button" v-if="index > 0" @click="removeRoom(index)" class="remove-room flex-div gap-2">
                    <span>Remove Room {{ index + 1 }}</span>
                    <img src="~/assets/images/trash.svg" alt="trash" class="remove-room-icon">
                </button>
            </div>
            <div class="flex-div gap-3 mb-3">
                <button type="button" v-if="localRoomsData.length < 3" @click="addRoom" class="add-room">
                    <span>Add Room {{ localRoomsData.length + 1 }} <b class="pry-color">+</b></span>
                </button>
                <button type="button" @click="closeDropdown" class="done-button">
                    Done
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Array,
      default: () => [{ adults: 1, children: 0 }]
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isOpen: false,
      localRoomsData: this.modelValue
    }
  },
  computed: {
    rooms() {
      return this.localRoomsData.length
    },
    totalGuests() {
      return this.localRoomsData.reduce((total, room) => total + room.adults + room.children, 0)
    }
  },
  watch: {
    modelValue: {
      handler(newValue) {
        this.localRoomsData = JSON.parse(JSON.stringify(newValue))
      },
      deep: true
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    closeDropdown() {
      this.isOpen = false
    },
    updateGuests(roomIndex, guestType, change) {
      const room = this.localRoomsData[roomIndex]
      room[guestType] = Math.max(guestType === 'adults' ? 1 : 0, room[guestType] + change)
      this.emitUpdate()
    },
    addRoom() {
      if (this.localRoomsData.length < 3) {
        this.localRoomsData.push({ adults: 1, children: 0 })
        this.emitUpdate()
      }
    },
    removeRoom(index) {
      this.localRoomsData.splice(index, 1)
      this.emitUpdate()
    },
    emitUpdate() {
      this.$emit('update:modelValue', JSON.parse(JSON.stringify(this.localRoomsData)))
    }
  }
}
</script>

<style scoped>
/* .room-guest-selector {
  width: 300px;
} */
.selector-header {
    color: var(--sec-color);
    cursor: pointer;
    border-radius: 10px;
    border: 1px solid #B2E5E2;
    background: #ffffff;
    height: 85px;
    box-sizing: border-box;
    padding: 20px;
}
.selector-header span {
    font-size: 24px;
    height: 31px;
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
  min-width: 100%;
  top: 95px;
}

.room-section {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.guest-type {
  display: flex;
  gap: 50px;
  align-items: center;
  margin-bottom: 20px;
}
.guest-type .guest {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: max-content;
}
.guest-type .guest small {
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
.remove-room {
  margin-bottom: 10px;
  width: max-content;
  justify-content: center;
  max-width: 170px;
}
.add-room, .remove-room {
  color: #545454;
  background: none;
  border: 1px solid #EDEDED;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  height: 38px;
  border-radius: 8px;
  font-weight: bold;
}
.done-button {
  width: 110px;
  height: 38px;
  font-size: 14px;
  background-color: var(--pry-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

</style>