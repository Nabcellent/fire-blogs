import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBAG8Iz1votuJ1IAc6NJwYLpqAR1lEDiEE",
    authDomain: "fireblogs-7.firebaseapp.com",
    projectId: "fireblogs-7",
    storageBucket: "fireblogs-7.appspot.com",
    messagingSenderId: "428701339365",
    appId: "1:428701339365:web:9f742e53b32f4d1edc0e0c"
};

const app = initializeApp(firebaseConfig)
const timestamp = serverTimestamp

const storage = getStorage(app);

export { timestamp, storage }
export default getFirestore(app)
