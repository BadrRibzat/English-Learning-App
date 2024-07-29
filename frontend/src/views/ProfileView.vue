<template>
  <div class="profile">
    <h1>{{ $t('profile') }}</h1>
    <div v-if="user">
      <h2 class="welcome-message">{{ $t('welcomeToYourProfile', { name: user.name }) }}</h2>
      <p>{{ $t('email') }}: {{ user.email }}</p>
      <h2>{{ $t('progress') }}</h2>
      <div v-if="lessons.length > 0">
        <div class="lesson-progress" v-for="lesson in lessons" :key="lesson.id">
          <h3>{{ lesson.title }}</h3>
          <p>{{ lesson.description }}</p>
          <p>{{ $t('progress') }}: {{ userProgress[lesson.id]?.completed || 0 }} / {{ userProgress[lesson.id]?.total || 0 }}</p>
          <router-link :to="{ name: 'LessonDetailPage', params: { id: lesson.id } }">
            {{ $t('startLesson') }}
          </router-link>
        </div>
      </div>
      <p v-else>{{ $t('noLessonsAvailable') }}</p>
    </div>
    <div v-else>
      {{ $t('loadingProfile') }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'ProfileView',
  data() {
    return {
      lessons: [],
      userProgress: {},
    };
  },
  computed: {
    ...mapGetters(['currentUser']),
    user() {
      return this.currentUser;
    },
  },
  async mounted() {
    try {
      const [lessonsResponse, progressResponse] = await Promise.all([
        axios.get('/lessons'),
        axios.get('/lessons/user/progress'),
      ]);
      this.lessons = lessonsResponse.data;
      this.userProgress = progressResponse.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  },
};
</script>

<style scoped>
.profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
}

.welcome-message {
  font-size: 24px;
  color: #2c3e50;
  margin: 20px 0;
  text-align: center;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.start-lesson-btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
}

.start-lesson-btn:hover {
  background-color: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

h2 {
  color: #2c3e50;
  margin-top: 20px;
}

.lesson-progress {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.start-lesson-btn {
  display: inline-block;
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 3px;
}
</style>
