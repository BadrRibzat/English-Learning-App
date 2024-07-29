<!-- frontend/src/components/Header.vue -->
<template>
  <header>
    <nav>
      <div class="logo">
        <img src="/src/assets/logo.png" alt="English Learning App" />
      </div>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/lessons">Lessons</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/register">Register</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/login">Login</router-link></li>
        <li v-if="isAuthenticated"><router-link to="/profile">Profile</router-link></li>
        <li v-if="isAuthenticated"><a href="#" @click.prevent="logout">Logout</a></li>
        <li v-if="!hasPremiumAccess"><router-link to="/payment">Premium</router-link></li>
        <li><router-link to="/portfolio">Badr</router-link></li>
        <li><router-link to="/khaoula">Khaoula</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'Header',
  setup() {
    const store = useStore();
    const router = useRouter();

    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    const hasPremiumAccess = computed(() => store.getters.hasPremiumAccess);

    const logout = () => {
      store.dispatch('logout');
      router.push('/login');
    };

    return { isAuthenticated, hasPremiumAccess, logout };
  },
};
</script>

<style scoped>
header {
  background-color: #333;
  padding: 1rem;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo img {
  height: 40px;
}

ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin-left: 1rem;
}

a {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

a:hover {
  background-color: #555;
}

a.router-link-active {
  background-color: #007bff;
}
</style>

