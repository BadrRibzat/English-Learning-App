<template>
  <div class="lessons">
    <h1>{{ $t('lessons') }}</h1>
    <ul v-if="lessons.length > 0">
      <li v-for="lesson in lessons" :key="lesson.id">
        <h2>{{ lesson.title }}</h2>
        <p>{{ lesson.description }}</p>
        <router-link :to="'/lessons/' + lesson.id" class="lesson-button">{{ $t('startLesson') }}</router-link>
      </li>
    </ul>
    <p v-else-if="error">{{ error }}</p>
    <p v-else>{{ $t('noLessonsAvailable') }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export default {
  name: 'LessonsView',
  setup() {
    const lessons = ref([]);
    const error = ref(null);
    const { t } = useI18n();
    const router = useRouter();

    onMounted(async () => {
      try {
        const response = await axios.get('/lessons');
        lessons.value = response.data;
      } catch (err) {
        console.error('Error fetching lessons:', err);
        error.value = t('errorFetchingLessons');
      }
    });

    const startLesson = (lessonId) => {
      router.push(`/lessons/${lessonId}`);
    };

    return { lessons, error, t, startLesson };
  }
}
</script>


<style scoped>
.lessons ul {
  list-style-type: none;
  padding: 0;
}

.lessons li {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  position: relative;
}

.lesson-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  margin-top: 10px;
}

.lesson-button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.premium-badge {
  background-color: gold;
  color: black;
  padding: 2px 5px;
  border-radius: 3px;
  margin-left: 10px;
  font-size: 0.8em;
}
</style>
