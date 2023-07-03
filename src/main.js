import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2Ad53yNP6psp9tqER-qj9OP2h6sLFRPI",
  authDomain: "vue-firebase-auth-try.firebaseapp.com",
  projectId: "vue-firebase-auth-try",
  storageBucket: "vue-firebase-auth-try.appspot.com",
  messagingSenderId: "887755894280",
  appId: "1:887755894280:web:9e778c4c341dbb24e8abbd",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router);

app.mount("#app");
