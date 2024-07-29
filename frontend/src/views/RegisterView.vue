<template>
  <div class="register">
    <h1>Register</h1>
    <h2 class="welcome-message">{{ $t('welcomeToRegister') }}</h2>
    <form @submit.prevent="register" class="register-form">
      <input type="text" v-model="name" placeholder="Name" required class="form-input" />
      <input type="email" v-model="email" placeholder="Email" required class="form-input" />
      <input type="password" v-model="password" placeholder="Password" required class="form-input" />
      <button type="submit" class="register-btn">Register</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <div class="login-link">
      <span>Already have an account?</span>
      <router-link to="/login" class="login-btn">Login</router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'RegisterView',
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const error = ref(null);
    const store = useStore();
    const router = useRouter();

    const register = async () => {
      try {
        await store.dispatch('register', {
          name: name.value,
          email: email.value,
          password: password.value
        });
        router.push('/profile');
      } catch (err) {
        console.error('Registration error:', err);
        error.value = err.response?.data?.message || 'Registration failed. Please try again.';
      }
    };

    return { name, email, password, error, register };
  }
}
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
  padding: 40px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.welcome-message {
  font-size: 24px;
  color: #2c3e50;
  margin: 20px 0;
  text-align: center;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

.register-btn {
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
}

.register-btn:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.error {
  color: #e74c3c;
  text-align: center;
  margin-top: 20px;
}

.login-link {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  color: #7f8c8d;
}

.login-btn {
  color: #3498db;
  text-decoration: none;
  margin-left: 5px;
  transition: color 0.3s;
}

.login-btn:hover {
  color: #2980b9;
}
</style>

