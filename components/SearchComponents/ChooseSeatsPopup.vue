<template>
    <div>
        <div class="side-popup">
            <div class="side-popup-header">
                <div class="flex-div gap-2 mb-4">
                    <img src="@/assets/images/close-popup.svg" alt="close" class="close-popup-icon"
                        @click="$emit('close-popup')">
                    <span>Choose your seats</span>
                </div>

                <div class="selected-flight-box flex-div gap-[15px]">
                    <img src="@/assets/images/plane.svg" alt="plane">
                    <div>
                        <small>Flight {{ activeTab }} of 2</small>
                        <div v-if="activeTab === 1">Lagos (LOS) to London (LHR)</div>
                        <div v-else-if="activeTab === 2">Lagos (LOS) to Paris (CDG)</div>
                    </div>
                </div>
            </div>

            <div class="flights-seats-block">
                <ul class="flight-seat-tabs-wrapper flex-div">
                    <li :class="{ active: activeTab === 1 }" @click="activeTab = 1">
                        <span>Travel 1</span>
                    </li>
                    <li :class="{ active: activeTab === 2 }" @click="activeTab = 2">
                        <span>Travel 2</span>
                    </li>
                </ul>

                <div class="flight-seats-wrapper">
                    <div id="travel-1-block" v-if="activeTab === 1">
                        <div class="seating-chart">
                            <div class="grid-div">
                                <div class="seat-div"></div> <!-- Empty top-left corner -->
                                <div v-for="col in cols" :key="col" class="seat-columns text-[14px]"
                                    :style="{ 'grid-column-start': (col === 'C' || col === 'F') ? 'span 2' : 'auto' }">
                                    <div>{{ col }}</div>
                                </div>
                                <!-- Column headers -->
                            </div>
                            <div v-for="row in rows" :key="row" class="grid-div seat-wrapper">
                                <div class="seat-row text-[14px]">{{ row }}</div> <!-- Row headers -->
                                <label v-for="col in cols" :key="col" :id="`${col}${row}`" class="seat"
                                    :class="{ 'booked': isBooked(col, row), 'selected': isSelected(col, row) }"
                                    :style="{ 'grid-column-start': (col === 'C' || col === 'F') ? 'span 2' : 'auto' }">
                                    <input type="checkbox" :disabled="isBooked(col, row)"
                                        @change="selectSeat(col, row)">
                                    {{ isBooked(col, row) ? 'X' : '' }} <!-- Mark booked seats with 'X' -->
                                    <i v-if="!isBooked(col, row)">{{col + row}}</i>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div id="travel-2-block" v-if="activeTab === 2">
                        <div class="seating-chart">
                            <div class="grid-div">
                                <div class="seat-div"></div> <!-- Empty top-left corner -->
                                <div v-for="col in cols" :key="col" class="seat-columns text-[14px]"
                                    :style="{ 'grid-column-start': (col === 'C' || col === 'F') ? 'span 2' : 'auto' }">
                                    <div>{{ col }}</div>
                                </div>
                                <!-- Column headers -->
                            </div>
                            <div v-for="row in rows" :key="row" class="grid-div seat-wrapper">
                                <div class="seat-row text-[14px]">{{ row }}</div> <!-- Row headers -->
                                <label v-for="col in cols" :key="col" :id="`${col}${row}`" class="seat"
                                    :class="{ 'booked': isBooked(col, row), 'selected': isSelected(col, row) }"
                                    :style="{ 'grid-column-start': (col === 'C' || col === 'F') ? 'span 2' : 'auto' }">
                                    <input type="checkbox" :disabled="isBooked(col, row)"
                                        @change="selectSeat(col, row)">
                                    {{ isBooked(col, row) ? 'X' : '' }} <!-- Mark booked seats with 'X' -->
                                    <i v-if="!isBooked(col, row)">{{ col + row }}</i>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="seat-price-wrapper flex-div justify-between">
                <div class="seat-price-block text-black">
                    <h6 class="text-[24px] m-0">₦0</h6>
                    <small class="text-[10px]">Seat: - O of 1 selected</small>
                </div>
                <div class="upgrade-seat-btn-wapper">
                    <div class="upgrade-seat-btn">Upgrade Seat</div>
                </div>
            </div>
        </div>
        <div class="side-popup-overlay" @click="$emit('close-popup')"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cols: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I' ], // Adjust according to your seating plan
            rows: Array.from({ length: 20 }, (_, i) => i + 1), // Adjust according to your seating plan
            bookedSeats: [ 'A1', 'B2', 'C3', 'D4', 'E5', 'F6', 'G7', 'H8', 'B1', 'i2', 'F3', 'F4', 'G1', 'H3', 'B7', 'H8', ], // Pre-booked seats
            selectedSeats: [], // Pre-selected seats

            activeTab: 1, // Active tab (1 for Travel 1, 2 for Travel 2)
        };
    },
    methods: {
        isBooked(col, row) {
            return this.bookedSeats.includes(`${col}${row}`);
        },
        isSelected(col, row) {
            return this.selectedSeats.includes(`${col}${row}`);
        },
        selectSeat(col, row) {
            const seatId = `${col}${row}`;
            const index = this.selectedSeats.indexOf(seatId);
            if (index > -1) {
                this.selectedSeats.splice(index, 1);
            } else {
                this.selectedSeats.push(seatId);
            }
        },
    },
};
</script>

<style scoped>
.seating-chart .grid-div {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    align-items: center;
    text-align: center;
    /* grid-column-gap: 20px; */
}
.seat {
    margin: 5px;
    width: 25px;
    height: 25px;
    border: 1px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    cursor: pointer;
}
.booked {
    background-color: #ccc;
    cursor: default;
}
.selected {
    background-color: var(--pry-color);
}
label i {
    font-size: 8px;
}
.seat-columns > div {
    width: 25px;
    margin: 5px;
}
</style>
