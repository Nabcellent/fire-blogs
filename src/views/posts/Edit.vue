<template>
    <div class="create-post">
        <BlogCoverPreview v-show="store.state.blogPhotoPreview"/>
        <Loading v-show="loading"/>
        <div class="container">
            <div :class="{ invisible: !error }" class="err-message">
                <p><span>Error: </span>{{ errorMsg }}</p>
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
                <button @click="updatePost">Save Changes</button>
                <router-link class="router-button" :to="{ name: 'PreviewPost' }">Preview Changes</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import Loading from "@/components/Loading.vue";
import { store } from "@/store";
import { VueEditor } from "vue3-editor";
import Quill from 'quill';
import ImageResize from 'quill-image-resize';
import { computed, onMounted, ref } from "vue";
import BlogCoverPreview from "@/components/BlogCoverPreview.vue";
import { getDownloadURL, ref as sRef, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase/firebaseInit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../../firebase/firebaseInit";
import router from "@/router";
import { useRoute } from "vue-router";

Quill.register('modules/imageResize', ImageResize);

const route = useRoute()

const file = ref(null),
    loading = ref(false),
    blogPhoto = ref(null),
    routeId = ref(""),
    currentBlog = ref([]),
    error = ref(false),
    errorMsg = ref(""),
    editorSettings = ref({
        modules: {
            imageResize: {
                parchment: Quill.import('parchment')
            }
        }
    })

onMounted(() => {
    routeId.value = route.params.id
    currentBlog.value = store.state.blogPosts.filter(p => p.id === routeId.value)

    store.commit('setBlogState', currentBlog.value[0])
})

const fileChange = () => {
    file.value = blogPhoto.value.files[0]

    const fileName = file.value.name

    store.commit('fileNameChange', fileName)
    store.commit('createFileURL', URL.createObjectURL(file.value))
}

const openPreview = () => store.commit('openPhotoPreview')

const imageHandler = (file, Editor, cursorLocation, resetUploader) => {
    const storageRef = sRef(storage, `documents/post-photos/${file.name}`),
        uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
    }, err => {
        console.log(err)
        console.log(err.serverResponse)
    }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            Editor.insertEmbed(cursorLocation, 'image', downloadURL)

            console.log('File available at', downloadURL);

            resetUploader()
        });
    })
}

const updatePost = async () => {
    const snap = await getDoc(doc(db, 'posts', routeId.value))

    if (blogTitle.value.length !== 0 && blogHTML.value.length !== 0) {
        loading.value = true

        let updateData = {}

        if (file.value) {
            const storageRef = sRef(storage, `documents/cover-photos/${store.state.blogPhotoName}`),
                uploadTask = uploadBytesResumable(storageRef, file.value);

            uploadTask.on('state_changed', snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, err => {
                loading.value = false
                console.log(err)
            }, async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                updateData = {
                    title: blogTitle.value,
                    html: blogHTML.value,
                    cover_photo: downloadURL,
                    cover_photo_name: blogCoverPhotoName.value,
                }
            })
        }

        updateData = {
            ...updateData,
            html: blogHTML.value,
            title: blogTitle.value,
        }

        await updateDoc(snap.ref, updateData)

        await store.dispatch('updatePost', routeId.value)

        loading.value = false

        await router.push({name: 'ViewPost', params: {id: snap.id}})

        return
    }

    error.value = true
    errorMsg.value = "Please ensure blog title and blog post have been filled!"

    setTimeout(() => error.value = false, 5000)
}

const blogCoverPhotoName = computed(() => store.state.blogPhotoName),
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