import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import i18n from './i18n';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faCreditCard, faCalendarAlt, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPlay, faCreditCard, faCalendarAlt, faLock);

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(store);
app.use(i18n);
app.mount('#app');
