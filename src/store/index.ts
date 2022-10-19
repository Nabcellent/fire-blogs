import type { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import db from '../firebase/firebaseInit'
import { getAuth } from "firebase/auth";

export interface State {
    sampleBlogCards: { title: string, blogCoverPhoto: string, blogDate: string }[]
    editPost?: boolean
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore({
    state: {
        sampleBlogCards: [
            { title: 'Blog card #1', blogCoverPhoto: 'stock-1', blogDate: 'May 1 2021' },
            { title: 'Blog card #2', blogCoverPhoto: 'stock-2', blogDate: 'May 1 2021' },
            { title: 'Blog card #3', blogCoverPhoto: 'stock-3', blogDate: 'May 1 2021' },
            { title: 'Blog card #4', blogCoverPhoto: 'stock-4', blogDate: 'May 1 2021' },
        ],
        editPost: null,
        user: null,
        profileId: null,
        profileEmail: null,
        profileFirstName: "",
        profileLastName: "",
        profileUsername: null,
        profileInitials: "",
    },
    mutations: {
        toggleEditPost(state, payload) {
            state.editPost = payload
        },
        updateUser(state, payload) {
            state.user = payload
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

                console.log(snap)
            } else {
                console.log("No such document!");
            }
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

