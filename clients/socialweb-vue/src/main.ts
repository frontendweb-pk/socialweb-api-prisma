import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

// app instance
const app = createApp(App);

// middleware
app.use(router);

// store
const store = createPinia();
app.use(store);

// global components

// define app-wise configuration

// mount app into #app element
app.mount("#app");
