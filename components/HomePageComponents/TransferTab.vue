<template>
  <form action="/search-results/transfers" class="search-inputs flex items-end" autocomplete="off">
    <div class="input-field-wrapper">
      <div class="select-field-wrapper flex-div gap-[10px] mb-[30px]">
        <SelectField
          :options="[
            { value: 'one-way', name: 'One-way' },
            { value: 'round-trip', name: 'Round-trip' },
          ]"
          label=""
          selectKey="value"
          selectName="name"
          v-model:value="transferObj.tripType"
          @select="transferObjSelectHandler($event, 'tripType')"
        />
        <PassengerSelector v-model="transferObj.passengersNumber" />
      </div>
      <div class="flex flex-cols gap-3">
        <div class="flex-div gap-3 grid-sm-break">
          <div class="flex-div gap-3 rel arrival-depature-inputs">
            <InputField
              label="From where?"
              placeholder="Terminal, Hotel"
              id="depature"
              type="text"
              inputClass="ls-inp-field"
              divClass="input-white-wrapper medium-inp-wrapper"
            />
            <img
              src="~/assets/images/transfer-arrow.svg"
              alt="transfer-arrow"
              class="transfer-arrow"
            />
            <InputField
              label="To where?"
              placeholder="Terminal, Hotel"
              id="destination"
              type="text"
              inputClass="ls-inp-field"
              divClass="input-white-wrapper medium-inp-wrapper"
            />
          </div>
          <DatePicker
            label="Leaving on"
            :defaultValue="currentDate"
            id="leaving-date"
            type="text"
            inputClass="ls-inp-field datepicker"
            divClass="input-white-wrapper"
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
      <button class="tab-form-btn flex-div gap-3">
        <span>Search Tour</span>
        <img src="~/assets/images/beach-icon.svg" alt="beach-icon" />
      </button>
    </div>
  </form>
</template>

<script>
import { ref, onMounted } from "vue";
// import M from "materialize-css";

export default {
  name: "TransferTab",
  setup() {
    const transferObj = ref({
      tripType: "one-way",
      passengersNumber: 1,
    });

    const getCurrentDate = () => {
      const date = new Date();
      const month = date.toLocaleString("default", { month: "short" });
      const day = date.getDate().toString().padStart(2, "0");
      return `${month} ${day}`;
    };
    const currentDate = ref(getCurrentDate());

    onMounted(() => {});

    const transferObjSelectHandler = (value, inputKey) => {
      transferObj.value[inputKey] = value;
    };

    return {
      currentDate,
      transferObj, 
      transferObjSelectHandler
    };
  },
};
</script>




<style></style>
