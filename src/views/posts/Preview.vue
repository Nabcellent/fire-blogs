<template>
    <div class="post-view">
        <div class="container quillWrapper">
            <h2>{{ blogTitle }}</h2>
            <img :src="blogCoverPhoto" alt=""/>
            <div class="post-content ql-editor" v-html="blogHTML"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { store } from "@/store";

const blogTitle = computed(() => store.state.blogTitle)
const blogHTML = computed(() => store.state.blogHTML)
const blogCoverPhoto = computed(() => store.state.blogPhotoFileURL)
</script>

<style lang="scss">
.post-view {
    min-height: 100%;

    .container {
        max-width: 1000px;
        padding: 60px 25px;
    }

    .ql-editor {
        padding: 0;
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
}
</style>
