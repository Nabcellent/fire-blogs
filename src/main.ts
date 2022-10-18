import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { key, store } from "./store";
import type { FirebaseApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const app = createApp(App)

let firebaseApp: FirebaseApp;

onAuthStateChanged(getAuth(), () => {
    if (!firebaseApp) app.use(store, key).use(router).mount('#app')
})
