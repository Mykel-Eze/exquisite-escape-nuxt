<template>
    <div class="empty-search-container">
        <img src="@/assets/images/search.svg" alt="search">
        <div class="text-[#141414] text-[24px] leading-[1.2] my-1">{{ title }}</div>
        <div class="text-[16px]">{{ description }}</div>
    </div>
</template>

<script>
export default {
    name: "EmptySearch",
    props: {
        title: {
            type: String
        }, 
        description: {
            type: String
        }
    }
}
</script>

<style scoped>
.empty-search-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 356px;
    text-align: center;
    margin: auto;
    position: relative;
    top: 10%;
}
</style>