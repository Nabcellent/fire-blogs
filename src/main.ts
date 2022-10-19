import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { key, store } from "./store";
import type { FirebaseApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

let firebaseApp: FirebaseApp;

onAuthStateChanged(getAuth(), () => {
    const app = createApp(App)

    if (!firebaseApp) app.use(store, key).use(router).mount('#app')
})
