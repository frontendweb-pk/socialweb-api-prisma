import 'vue3-toastify/dist/index.css';

import { createApp } from 'vue';

import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import './style.css';

// app instance
const app = createApp(App);

// middleware
app.use(router);

// store
const store = createPinia();
app.use(store);

// global components

// global directives
app.directive('focus', {
  mounted(el) {
    if (el.nodeName === 'INPUT') {
      el.focus();
    } else {
      el.querySelector('input').focus();
    }
  },
});

// define app-wise configuration

// mount app into #app element
app.mount('#app');
