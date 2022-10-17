<template>
    <div class="home">
        <BlogPost :post="welcomeScreen"/>
        <BlogPost v-for="(post, i) in sampleBlogPost" :key="i" :post="post"/>

        <div class="blog-card-wrap">
            <div class="container">
                <h3>View More Recent Blogs</h3>
                <div class="blog-cards">
                    <BlogCard v-for="(post, i) in sampleBlogCards" :key="i" :post="post"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BlogPost from "@/components/BlogPost.vue";
import BlogCard from "@/components/BlogCard.vue";

const welcomeScreen = ref({
    title: "Welcome!",
    blogPost:
        "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
    welcomeScreen: true,
    photo: "coding",
})

const sampleBlogPost = ref([
    {
        title: 'This is a filler title!',
        blogHTML: 'This is a filler blog post title!',
        blogCoverPhoto: 'beautiful-stories',
    },
    {
        title: 'This is a filler title!',
        blogHTML: 'This is a filler blog post title!',
        blogCoverPhoto: 'designed-for-everyone',
    }
])

const sampleBlogCards = ref([
    { title: 'Blog card #1', blogCoverPhoto: 'stock-1', blogDate: 'May 1 2021' },
    { title: 'Blog card #2', blogCoverPhoto: 'stock-2', blogDate: 'May 1 2021' },
    { title: 'Blog card #3', blogCoverPhoto: 'stock-3', blogDate: 'May 1 2021' },
    { title: 'Blog card #4', blogCoverPhoto: 'stock-4', blogDate: 'May 1 2021' },
])
</script>

<style lang="scss" scoped>
.blog-card-wrap {
    h3 {
        font-weight: 300;
        font-size: 28px;
        margin-bottom: 32px;
    }
}

.updates {
    .container {
        padding: 100px 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        @media (min-width: 800px) {
            padding: 125px 25px;
            flex-direction: row;
        }

        .router-button {
            display: flex;
            font-size: 14px;
            text-decoration: none;
            @media (min-width: 800px) {
                margin-left: auto;
            }
        }

        h2 {
            font-weight: 300;
            font-size: 32px;
            max-width: 425px;
            width: 100%;
            text-align: center;
            text-transform: uppercase;
            @media (min-width: 800px) {
                text-align: initial;
                font-size: 40px;
            }
        }
    }
}
</style>