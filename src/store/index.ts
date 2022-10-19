import type { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore'
import db from '../firebase/firebaseInit'
import { getAuth } from "firebase/auth";

export interface State {
    sampleBlogCards: { title: string, blogCoverPhoto: string, blogDate: string }[]
    editPost?: boolean
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore({
    state: {
        blogPosts: [],
        postLoaded: false,
        blogHTML: 'Write your blog title here...',
        blogTitle: '',
        blogPhotoName: '',
        blogPhotoFileURL: "",
        blogPhotoPreview: false,
        editPost: false,

        user: null,
        profileId: null,
        profileEmail: null,
        profileFirstName: "",
        profileLastName: "",
        profileUsername: null,
        profileInitials: "",
        isAdmin: false
    },
    getters: {
        blogPostsFeed(state) {
            return state.blogPosts.slice(0, 2)
        },
        blogPostCards(state) {
            return state.blogPosts.slice(2, 6)
        }
    },
    mutations: {
        newBlogPost(state, payload) {
            state.blogHTML = payload
        },
        updateBlogTitle(state, payload) {
            state.blogTitle = payload
        },
        fileNameChange(state, payload) {
            state.blogPhotoName = payload
        },
        createFileURL(state, payload) {
            state.blogPhotoFileURL = payload
        },
        openPhotoPreview(state) {
            state.blogPhotoPreview = !state.blogPhotoPreview
        },
        toggleEditPost(state, payload) {
            state.editPost = payload
        },
        setBlogState(state, payload) {
            state.blogTitle = payload.title
            state.blogHTML = payload.html
            state.blogPhotoFileURL = payload.cover_photo
            state.blogPhotoName = payload.cover_photo_name
        },
        filterBlogPosts(state, payload) {
            state.blogPosts = state.blogPosts.filter((p: { id: string }) => p.id !== payload)
        },
        updateUser(state, payload) {
            state.user = payload
        },
        setProfileAdmin(state, payload) {
            state.isAdmin = payload
            console.log(state.isAdmin)
        },
        setProfileInfo(state, doc) {
            state.profileId = doc.id
            state.profileEmail = doc.data().email
            state.profileFirstName = doc.data().first_name
            state.profileLastName = doc.data().last_name
            state.profileUsername = doc.data().username
        },
        setProfileInitials(state) {
            const firstInitial = state.profileFirstName.match(/(\b\S)?/g)?.join(''),
                lastInitial = state.profileLastName.match(/(\b\S)?/g)?.join('')

            if (firstInitial && lastInitial)
                state.profileInitials = firstInitial + lastInitial
        },
        changeFirstName(state, payload) {
            state.profileFirstName = payload
        },
        changeLastName(state, payload) {
            state.profileLastName = payload
        },
        changeUsername(state, payload) {
            state.profileUsername = payload
        }
    },
    actions: {
        async getCurrentUser({ commit }) {
            const snap = await getDoc(doc(db, 'users', String(getAuth().currentUser?.uid)))

            if (snap.exists()) {
                commit('setProfileInfo', snap)
                commit('setProfileInitials')
                commit('setProfileAdmin', Boolean(snap.data().is_admin))
            } else {
                console.log("No such document!");
            }
        },
        async getPosts({ state }) {
            const q = query(collection(db, "posts"), orderBy('date', 'desc'));
            const snaps = await getDocs(q);

            snaps.forEach(doc => {
                if (!state.blogPosts.some((post: { id: string }) => post.id === doc.id)) {
                    // @ts-ignore
                    state.blogPosts.push(doc.data())
                }
            })

            state.postLoaded = true
        },
        async updatePost({ commit, dispatch }, payload) {
            commit('filterBlogPosts', payload)

            await dispatch('getPosts')
        },
        async deletePost({ commit }, payload) {
            await deleteDoc(doc(db, 'posts', payload))

            commit('filterBlogPosts', payload)
        },
        async updateUserSettings({ commit, state }) {
            await updateDoc(doc(db, 'users', String(state.profileId)), {
                first_name: state.profileFirstName,
                last_name: state.profileLastName,
                username: state.profileUsername
            })

            commit('setProfileInitials')
        }
    }
})

export function useStore() {
    return baseUseStore(key)
}

