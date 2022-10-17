import type { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from 'vuex'

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
        editPost: null
    },
    mutations: {
        toggleEditPost(state, payload) {
            state.editPost = payload
        }
    }
})

export function useStore() {
    return baseUseStore(key)
}

