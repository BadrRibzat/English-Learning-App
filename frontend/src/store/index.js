import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      }
    },
    setUser(state, user) {
      state.user = user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/auth/login', credentials);
        const { token, user } = response.data;
        commit('setToken', token);
        commit('setUser', user);
        return user;
      } catch (error) {
        console.error('Login failed:', error.response?.data?.message || error.message);
        throw error;
      }
    },
    async register({ commit }, userData) {
      try {
        const response = await axios.post('/auth/register', userData);
        const { token, user } = response.data;
        commit('setToken', token);
        commit('setUser', user);
        return user;
      } catch (error) {
        console.error('Registration failed:', error.response?.data?.message || error.message);
        throw error;
      }
    },
    logout({ commit }) {
      commit('setToken', null);
      commit('setUser', null);
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
  },
});
