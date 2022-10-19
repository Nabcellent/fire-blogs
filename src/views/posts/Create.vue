<template>
    <div class="create-post">
        <BlogCoverPreview v-show="store.state.blogPhotoPreview"/>
        <Loading v-show="loading"/>
        <div class="container">
            <div :class="{ invisible: !error }" class="err-message">
                <p><span>Error:</span>{{ errorMsg }}</p>
            </div>
            <div class="blog-info">
                <input type="text" placeholder="Enter Blog Title" v-model="blogTitle"/>
                <div class="upload-file">
                    <label for="blog-photo">Upload Cover Photo</label>
                    <input type="file" ref="blogPhoto" id="blog-photo" @change="fileChange" accept=".png, .jpg, ,jpeg"/>
                    <button @click="openPreview" class="preview"
                            :class="{ 'button-inactive': !store.state.blogPhotoFileURL }">
                        Preview Photo
                    </button>
                    <span>File Chosen: {{ store.state.blogPhotoName }}</span>
                </div>
            </div>
            <div class="editor">
                <vue-editor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler
                            @image-added="imageHandler"/>
            </div>
            <div class="blog-actions">
                <button @click="uploadBlog">Publish Blog</button>
                <router-link class="router-button" :to="{ name: 'BlogPreview' }">Post Preview</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import Loading from "@/components/Loading.vue";
import { store } from "@/store";
import { VueEditor } from "vue3-editor";
// import ImageResize from 'quill-image-resize-module';
import { computed, ref } from "vue";
import BlogCoverPreview from "@/components/BlogCoverPreview.vue";

// Quill.register('modules/imageResize', ImageResize);

const file = ref(null),
    blogPhoto = ref(null),
    error = ref(null),
    errorMsg = ref(null),
    editorSettings = ref({
        modules: {
            // imageResize: {}
        }
    })

const fileChange = () => {
    file.value = blogPhoto.value.files[0]

    const fileName = file.value.name

    store.commit('fileNameChange', fileName)
    store.commit('createFileURL', URL.createObjectURL(file.value))
}

const openPreview = () => store.commit('openPhotoPreview')

const profileId = computed(() => store.state.profileId),
    blogCoverPhotoName = computed(() => store.state.blogPhotoName),
    blogTitle = computed({
        get: () => store.state.blogTitle,
        set: payload => store.commit('updateBlogTitle', payload)
    }),
    blogHTML = computed({
        get: () => store.state.blogHTML,
        set: payload => store.commit('newBlogPost', payload)
    })
</script>

<style lang="scss">
.create-post {
    position: relative;
    height: 100%;

    button {
        margin-top: 0;
    }

    .router-button {
        text-decoration: none;
        color: #fff;
    }

    label,
    button,
    .router-button {
        transition: 0.5s ease-in-out all;
        align-self: center;
        font-size: 14px;
        cursor: pointer;
        border-radius: 20px;
        padding: 12px 24px;
        color: #fff;
        background-color: #303030;
        text-decoration: none;

        &:hover {
            background-color: rgba(48, 48, 48, 0.7);
        }
    }

    .container {
        position: relative;
        height: 100%;
        padding: 10px 25px 60px;
    }

    // error styling
    .invisible {
        opacity: 0 !important;
    }

    .err-message {
        width: 100%;
        padding: 12px;
        border-radius: 8px;
        color: #fff;
        margin-bottom: 10px;
        background-color: #303030;
        opacity: 1;
        transition: 0.5s ease all;

        p {
            font-size: 14px;
        }

        span {
            font-weight: 600;
        }
    }

    .blog-info {
        display: flex;
        margin-bottom: 32px;

        input:nth-child(1) {
            min-width: 300px;
        }

        input {
            transition: 0.5s ease-in-out all;
            padding: 10px 4px;
            border: none;
            border-bottom: 1px solid #303030;

            &:focus {
                outline: none;
                box-shadow: 0 1px 0 0 #303030;
            }
        }

        .upload-file {
            flex: 1;
            margin-left: 16px;
            position: relative;
            display: flex;

            input {
                display: none;
            }

            .preview {
                margin-left: 16px;
                text-transform: initial;
            }

            span {
                font-size: 12px;
                margin-left: 16px;
                align-self: center;
            }
        }
    }

    .editor {
        height: 60vh;
        display: flex;
        flex-direction: column;

        .quillWrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .ql-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: scroll;
        }

        .ql-editor {
            padding: 20px 16px 30px;
        }
    }

    .blog-actions {
        margin-top: 32px;

        button {
            margin-right: 16px;
        }
    }
}
</style>