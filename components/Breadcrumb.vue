<template>
    <div class="breadcrumb-wrapper">
        <ul class="breadcrumb">
            <li v-for="(item, index) in items" :key="index" class="breadcrumb-item">
                <nuxt-link :to="item.path">{{ item.text }}</nuxt-link>
                <span>/</span>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'BreadCrumb',
    props: {
        items: {
            type: Array,
            required: true
        }
    },
}
</script>

<style>
ul.breadcrumb {
    display: flex;
    flex-wrap: wrap;
}

ul.breadcrumb span {
    padding: 0 5px;
}

.breadcrumb-item {
    color: #606161;
}

.breadcrumb-item a {
    font-size: 16px;
    color: var(--pry-color);
    text-decoration: underline;
}

/* .breadcrumb-item:last-child a {
    color: #606161;
    text-decoration: none;
} */
.breadcrumb-item a.router-link-exact-active {
    color: #606161;
    text-decoration: none;
}

.breadcrumb-item:last-child span {
    display: none;
}
</style>
