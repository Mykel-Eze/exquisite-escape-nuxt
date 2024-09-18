<template>
    <div class="create-package-wrapper max-w-[710px]">
        <div class="form-group">
            <label for="#packageName">Package name</label>
            <input
                type="text"
                id="packageName"
                v-model="localFormData.packageName"
                placeholder="What should we call your package"
                required
            />
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <textarea
                id="description"
                v-model="localFormData.description"
                placeholder="Write a short description"
                class="materialize-textarea"
                required
            ></textarea>
        </div>
    </div>
</template>

<script>
export default {
    name: "CreatePackage",
    props: ['formData'],
    data() {
        return {
            localFormData: this.formData
        }
    },
    watch: {
        localFormData: {
            deep: true,
            handler(newValue) {
                this.$emit('update:formData', newValue)
            }
        }
    }
}
</script>

<style>

</style>