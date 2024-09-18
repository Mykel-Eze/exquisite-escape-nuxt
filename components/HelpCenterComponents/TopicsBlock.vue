<template>
  <div class="topic-block">
    <div class="topic-block-title">{{ topicBlockTitle }}</div>
    <ul class="topic-links-wrapper">
        <li>
            <nuxt-link to="/help/topics/topic-page" class="topic-link">Getting started on Exquisite Escape</nuxt-link>
        </li>
        <li>
            <nuxt-link to="/help/topics/topic-page" class="topic-link">Things to know about Exquisite Escape</nuxt-link>
        </li>
        <li>
            <nuxt-link to="/help/topics/topic-page" class="topic-link">How our search engine works</nuxt-link>
        </li>
        <li>
            <nuxt-link to="/help/topics/topic-page" class="topic-link">Why Exquisite Escape is your best option</nuxt-link>
        </li>
        <li>
            <nuxt-link to="/help/topics/topic-page" class="topic-link">Make your first bookings on Exquisite Escape</nuxt-link>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
    name: "TopicsBlock",
    props: {
        topicBlockTitle: {
            type: String,
            required: true
        },
    }
}
</script>

<style>

</style>