<template>
    <div class="post-view" v-if="currentBlog.length > 0">
        <div class="container quillWrapper">
            <h2>{{ currentBlog[0].title }}</h2>
            <h4>Posted on: {{ new Date(currentBlog[0].date).toLocaleString("en-us", {dateStyle: "long"}) }}</h4>
            <img :src="currentBlog[0].cover_photo" alt=""/>
            <div class="post-content ql-editor" v-html="currentBlog[0].html"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { store } from "@/store";
import { useRoute } from "vue-router";

const route = useRoute()

const currentBlog = ref<{ id: string, title: string, html: string, cover_photo: string, date: string }[]>([])

onMounted(async () => {
    currentBlog.value = store.state.blogPosts.filter((post: { id: string }) => post.id === route.params.id);
})
</script>

<style lang="scss">
.post-view {
    min-height: 100%;

    .container {
        max-width: 1000px;
        padding: 60px 25px;
    }

    h4 {
        font-weight: 400;
        font-size: 14px;
        margin-bottom: 24px;
    }

    h2 {
        margin-bottom: 16px;
        font-weight: 300;
        font-size: 32px;
    }

    img {
        width: 100%;
        margin-bottom: 32px;
    }

    .ql-editor {
        padding: 0;
    }
}
</style>
