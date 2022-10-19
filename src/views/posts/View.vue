<template>
    <div class="post-view" v-if="currentBlog">
        <div class="container quillWrapper">
            <h2>{{ currentBlog[0].blogTitle }}</h2>
            <h4>Posted on: {{ new Date(currentBlog[0].blogDate).toLocaleString("en-us", {dateStyle: "long"})
                }}</h4>
            <img :src="currentBlog[0].blogCoverPhoto" alt=""/>
            <div class="post-content ql-editor" v-html="currentBlog[0].blogHTML"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { store } from "@/store";
import { useRoute } from "vue-router";

const route = useRoute()

const currentBlog = ref([])

onMounted(async () => {
    currentBlog.value = store.state.blogPosts.filter((post: { id: string }) => post.id === route.params.id);
})
</script>

<style lang="scss">
.post-view {
    h4 {
        font-weight: 400;
        font-size: 14px;
        margin-bottom: 24px;
    }
}
</style>
