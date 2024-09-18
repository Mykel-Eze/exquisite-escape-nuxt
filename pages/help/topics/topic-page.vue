<template>
    <div id="single-topic-page">
        <!--=== Top Section ===-->
        <SingleTopicTopSection
            topicPageTitle="How to cancel my booking?"
        />
        <!--=== end of Top Section ===-->

        <!--=== TopicContent Section ===-->
        <TopicContentSection />
        <!--=== end of TopicContent Section ===-->

        <!--=== RateArticle Section ===-->
        <RateArticle />
        <!--=== end of RateArticle Section ===-->

        <div class="container">
            <hr class="horizontal-divider" />
        </div>

        <!--=== RelatedArticles Section ===-->
        <RelatedArticlesSection />
        <!--=== end of RelatedArticles Section ===-->
    </div>
</template>

<script>
export default {
    name: "SingleTopicPage",
}
</script>

<style>

</style>