<template>
  <form
    id="book-flight-tab"
    class="search-inputs flex items-end"
    autocomplete="off"
  >
    <div class="input-field-wrapper">
      <div class="select-field-wrapper flex-div gap-[10px] mb-[30px]">
        <SelectField
          :options="[
            { value: 'one-way', name: 'One-way' },
            { value: 'round-trip', name: 'Round-trip' },
            { value: 'multi-city', name: 'Multi-city' },
          ]"
          label=""
          selectKey="value"
          selectName="name"
          v-model:value="flightObj.tripType"
          @select="flightObjSelectHandler($event, 'tripType')"
          altClass="d1"
        />
        <PassengerSelector v-model="flightObj.passengersNumber" />
      </div>
      <div class="flex flex-col gap-7">
        <div class="flex-div gap-3 grid-sm-break">
          <div class="flex-div gap-3 rel arrival-depature-inputs">
            <div class="relative">
              <InputField
                label="From where"
                placeholder="City or Airport"
                id="depature"
                type="text"
                inputClass="ls-inp-field"
                divClass="input-white-wrapper relative"
                :value="flightObj.originLocationName"
              />
              <div
                v-if="showDropdown.showFromDropdown"
                class="absolute bg-white mt-1 search-dropdown-wrapper"
              >
                <ul>
                  <li
                    v-for="(flight, index) in fromFlightList"
                    :key="index"
                    class="text-dark-gray py-2 px-4"
                    @click="selectFlightHandler(flight, 'from')"
                  >
                    <!-- {{ flight.name }} -->
                  </li>
                </ul>
              </div>
            </div>

            <!-- v-if="flightObj.tripType !== 'one-way'" -->

            <img
              src="~/assets/images/transfer-arrow.svg"
              alt="transfer-arrow"
              class="transfer-arrow"
            />
            <div class="relative">
              <InputField
                label="To where"
                placeholder="City or Airport"
                id="destination"
                type="text"
                inputClass="ls-inp-field"
                divClass="input-white-wrapper"
                :value="flightObj.destinationLocationName"
              />
              <div
                v-if="showDropdown.showToDropdown"
                class="absolute bg-white mt-1 search-dropdown-wrapper"
              >
                <ul>
                  <li
                    v-for="(flight, index) in toFlightList"
                    :key="index"
                    class="text-dark-gray py-2 px-4"
                    @click="selectFlightHandler(flight, 'to')"
                  >
                    <!-- {{ flight.name }} -->
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="input-white-wrapper flex-div flex-row">
            <DatePicker
              label="Leaving on"
              :defaultValue="currentDate"
              id="departure-date"
              type="text"
              inputClass="ls-inp-field datepicker"
              v-model="flightObj.departureDate"
              @input="flightObjSelectHandler($event, 'departureDate')"
            />
            <span v-if="flightObj.tripType !== 'one-way'" class="range-divider"
              >-</span
            >
            <DatePicker
              v-if="flightObj.tripType !== 'one-way'"
              label="Returning on"
              :defaultValue="currentDate"
              id="return-date"
              type="text"
              inputClass="ls-inp-field datepicker"
              v-model="flightObj.returnDate"
              @input="flightObjSelectHandler($event, 'returnDate')"
            />
          </div>

          <SelectField
            label="Cabin Type"
            id="cabin-type"
            type="text"
            inputClass="ls-inp-field remove-border"
            divClass="input-white-wrapper remove-border "
            :options="[
              { value: 'ECONOMY', name: 'Economy' },
              { value: 'PREMIUM_ECONOMY', name: 'Premium Economy' },
              { value: 'BUSINESS', name: 'Business' },
              { value: 'FIRST', name: 'First Class' },
            ]"
            selectKey="value"
            selectName="name"
            v-model:value="flightObj.travelClass"
            @select="flightObjSelectHandler($event, 'travelClass')"
            altClass="d1"
          />
        </div>
      </div>
    </div>

    <div class="tab-form-btn-wrapper">
      <div
        class="tfbw-div flex-div justify-center gap-[10px] text-[18px] mb-[20px]"
      >
        <img
          src="~/assets/images/best-check.svg"
          alt="best-check"
          class="best-check"
        />
        <span>Best Deal Guaranteed </span>
      </div>
      <button
        v-if="flightObj.tripType === 'multi-city'"
        class="tab-form-btn tfb-2 flex-div gap-3"
        type="button"
        @click="duplicateGridSmBreak"
      >
        <span>Add Flight</span>
        <img src="~/assets/images/plus-rectangle.svg" alt="plus-icon" />
      </button>
      <button
        class="tab-form-btn flex-div gap-3"
        @click.prevent="searchFlight()"
      >
        <span>Search Flights</span>
        <img src="~/assets/images/plane-icon.svg" alt="plane-icon" />
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
// import M from "materialize-css";
import { useRouter } from "vue-router";
// import { useApiPost } from "../../composables/services/useApi";
export default defineComponent({
  name: "FlightTab",

  setup() {
    const flightObj = ref({
      tripType: "one-way",
      passengersNumber: 1,
      departure: "",
      destination: "",
      departureDate: "",
      returnDate: "",
      travelClass: "",
      originLocationName: "",
      originLocationCode: "",
      destinationLocationName: "",
      destinationLocationCode: "",
    });
    const duplicatedRows = ref([]);
    const toFlightList = ref([]);
    const fromFlightList = ref([]);
    const showDropdown = ref({
      showToDropdown: false,
      showFromDropdown: false,
    });
    const router = useRouter();

    onMounted(() => {
      const elemsDatepicker = document.querySelectorAll(".datepicker");
      M.Datepicker.init(elemsDatepicker, {
        autoClose: true,
        format: "mmm dd",
        minDate: new Date(),
      });

      // const elemsDropdown2 = document.querySelector("select#tripType");
      // M.FormSelect.init(elemsDropdown2);
    });

    const getCurrentDate = () => {
      const date = new Date();
      const month = date.toLocaleString("default", { month: "short" });
      const day = date.getDate().toString().padStart(2, "0");
      return `${month} ${day}`;
    };
    const currentDate = getCurrentDate();

    const duplicateGridSmBreak = () => {
      const gridSmBreak: any = document.querySelector(".grid-sm-break");
      if (gridSmBreak) {
        const clonedGridSmBreak = gridSmBreak.cloneNode(true);

        // Set default values for duplicated inputs
        const inputs = clonedGridSmBreak.querySelectorAll(".arrival-depature-inputs input");
        inputs.forEach((input: HTMLInputElement) => {
          input.value = input.defaultValue;
        });

        gridSmBreak.parentNode?.appendChild(clonedGridSmBreak);
      }
    };

    const removeRow = (index: number) => {
      duplicatedRows.value.splice(index, 1);
    };
    const datePicker = () => {
      const elemsDatepicker = document.querySelectorAll(".datepicker");
      M.Datepicker.init(elemsDatepicker, {
        autoClose: true,
        format: "mmm dd",
        minDate: new Date(),
      });
    };

    const inputHandler = async (e: any, inputKey: string) => {
      if (e.target.value.length >= 3) {
        const { data }: any = await useApiPost("/flight/airport-nearby", {
          keyword: e.target.value,
          subType: "CITY",
        });
        if (inputKey === "to") {
          toFlightList.value = data.value.data;
          showDropdown.value.showToDropdown = true;
        } else {
          fromFlightList.value = data.value.data;
          showDropdown.value.showFromDropdown = true;
        }
      }
    };
    const searchFlight = async () => {
      const payload = {
        originLocationCode: flightObj.value.originLocationCode,
        destinationLocationCode: flightObj.value.destinationLocationCode,
        departureDate: flightObj.value.departureDate,
        returnDate: flightObj.value.returnDate,
        adults: flightObj.value.passengersNumber,
        // includedAirlineCodes: "TG",
        travelClass: flightObj.value.travelClass,
        max: "10",
        currencyCode: "NGN",
      };
      router.push({ path: "/search-results/flights", query: { ...payload } });
    };
    const selectFlightHandler = async (flight: any, inputKey: string) => {
      if (inputKey === "from") {
        flightObj.value = {
          ...flightObj.value,
          originLocationName: flight.name,
          originLocationCode: flight.iataCode,
        };
        showDropdown.value.showFromDropdown = false;
      } else {
        flightObj.value = {
          ...flightObj.value,
          destinationLocationName: flight.name,
          destinationLocationCode: flight.iataCode,
        };
        showDropdown.value.showToDropdown = false;
      }
    };
    const flightObjSelectHandler = (e: string, inputKey: string) => {
      flightObj.value = {
        ...flightObj.value,
        [inputKey]: e,
      };
    };
    return {
      duplicatedRows,
      currentDate,
      flightObj,
      toFlightList,
      fromFlightList,
      getCurrentDate,
      showDropdown,
      duplicateGridSmBreak,
      removeRow,
      datePicker,
      // inputHandler,
      searchFlight,
      selectFlightHandler,
      flightObjSelectHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
.remove-btn {
  background: red;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0;
}
.remove-border {
  .select-wrapper input.select-dropdown {
    border: none !important;
  }
}
</style>
