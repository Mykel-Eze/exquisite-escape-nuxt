<template>
    <fieldset class="profile-item-block">
        <div class="profile-block-header flex-div justify-between">
            <span>{{ title }}</span>
            <button class="profile-button" type="button" @click="toggleEdit">{{ editMode ? 'Cancel' : 'Edit' }}</button>
        </div>
        <div class="profile-block-value" v-show="!editMode">{{ value || 'Not provided' }}</div>
        <div class="profile-edit-block" v-show="editMode">
            <div class="text-[12px] leading-[18px] md:w-[70%]">{{ description }}</div>
            <InputField 
                :label="label"
                divClass="profile-inp-field-block"
                :id="id"
                inputClass="profile-inp-field"
                :type="type"
                placeholder=""
                v-model="inputValue"
                :value="inputValue"
            />
            <button type="button" class="profile-save-btn" @click="save">Save</button>
        </div>
    </fieldset>
</template>

<script>
import { ref, watch } from 'vue';
import M from "materialize-css";

export default {
    name: "ProfileItemBlock",
    props: [ 'title', 'value', 'description', 'label', 'id', 'type', 'defaultValue' ],
    setup(props, { emit }) {
        const editMode = ref(false);
        const inputValue = ref(props.defaultValue);

        watch(() => props.value, newVal => {
            inputValue.value = newVal;
        });

        const toggleEdit = () => {
            editMode.value = !editMode.value;
        };

        const save = () => {
            emit('update:value', inputValue.value);
            editMode.value = false;
            M.toast({ html: 'Information updated successfully' })
        };

        return { editMode, inputValue, toggleEdit, save};
    }
}
</script>
