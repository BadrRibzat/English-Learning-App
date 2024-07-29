<template>
  <div class="lesson-detail">
    <div v-if="lesson">
      <h1>{{ lesson.title }}</h1>
      <p>{{ lesson.description }}</p>
      <div v-if="isAuthenticated">
        <h2>{{ $t('flashcards') }}</h2>
        <div class="progress-bar">
          <div class="progress" :style="{ width: `${progress}%` }"></div>
        </div>
        <div class="flashcards-container">
          <div
            v-for="flashcard in flashcards"
            :key="flashcard.id"
            class="flashcard"
            :class="{ flipped: flashcard.isFlipped, completed: flashcard.isCompleted }"
          >
            <div class="flashcard-inner">
              <div class="flashcard-front" @click="flipCard(flashcard)">
                <h3>{{ flashcard.word }}</h3>
                <p>{{ flashcard.definition }}</p>
              </div>
              <div class="flashcard-back">
                <div class="flashcard-content">
                  <h3>{{ flashcard.question }}</h3>
                  <input v-model="flashcard.userAnswer" @keyup.enter="checkAnswer(flashcard)" />
                  <button @click="checkAnswer(flashcard)">{{ $t('submit') }}</button>
                  <p v-if="flashcard.isAnswered">
                    {{ flashcard.isCorrect ? $t('correct') : $t('incorrect') }}
                  </p>
                  <button v-if="!flashcard.isCorrect" @click="resetCard(flashcard)">
                    {{ $t('tryAgain') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>{{ $t('loginToAccessLesson') }}</p>
        <router-link :to="{ name: 'LoginPage' }">{{ $t('login') }}</router-link>
      </div>
      <router-link :to="{ name: 'LessonsPage' }">{{ $t('backToLessons') }}</router-link>
    </div>
    <div v-else class="loading">
      {{ $t('loadingLesson') }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'LessonDetailView',
  data() {
    return {
      lesson: null,
      flashcards: [],
      progress: 0,
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    async fetchLessonData() {
      try {
        const lessonId = this.$route.params.id;
        const [lessonResponse, flashcardsResponse, progressResponse] = await Promise.all([
          axios.get(`/lessons/${lessonId}`),
          axios.get(`/lessons/${lessonId}/flashcards`),
          axios.get('/lessons/user/progress'),
        ]);

        this.lesson = lessonResponse.data;
        this.flashcards = flashcardsResponse.data.map(card => ({
          ...card,
          isFlipped: false,
          isCompleted: false,
          isAnswered: false,
          isCorrect: false,
          userAnswer: '',
        }));

        const lessonProgress = progressResponse.data[lessonId];
        if (lessonProgress) {
          this.progress = (lessonProgress.completed / lessonProgress.total) * 100;
        }
      } catch (error) {
        console.error('Error fetching lesson data:', error);
      }
    },
    flipCard(flashcard) {
      flashcard.isFlipped = !flashcard.isFlipped;
    },
    checkAnswer(flashcard) {
      flashcard.isAnswered = true;
      flashcard.isCorrect = this.isAnswerCorrect(flashcard.userAnswer, flashcard.word);
      if (flashcard.isCorrect) {
        flashcard.isCompleted = true;
        this.updateProgress();
      }
    },
    isAnswerCorrect(userAnswer, correctAnswer) {
      return userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    },
    resetCard(flashcard) {
      flashcard.isFlipped = false;
      flashcard.isAnswered = false;
      flashcard.isCorrect = false;
      flashcard.userAnswer = '';
    },
    updateProgress() {
      const completedCards = this.flashcards.filter(card => card.isCompleted).length;
      this.progress = (completedCards / this.flashcards.length) * 100;
      this.updateUserProgress();
    },
    async updateUserProgress() {
      try {
        const lessonId = this.$route.params.id;
        const completedCards = this.flashcards.filter(card => card.isCompleted).length;
        await axios.post('/lessons/user/progress', {
          lessonId,
          completed: completedCards,
          total: this.flashcards.length
        });
      } catch (error) {
        console.error('Error updating user progress:', error);
      }
    },
  },
  mounted() {
    this.fetchLessonData();
  },
};
</script>

<style scoped>
.lesson-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.flashcards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.flashcard {
  width: 300px;
  height: 200px;
  perspective: 1000px;
}

.flashcard-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 10px;
}

.flashcard.flipped .flashcard-inner {
  transform: rotateY(180deg);
}

.flashcard-front, .flashcard-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}

.flashcard-front {
  background-color: #f0f8ff;
  color: #333;
}

.flashcard-back {
  background-color: #e6f3ff;
  color: #333;
  transform: rotateY(180deg);
}

.input-area {
  width: 100%;
}

h3 {
  margin: 0 0 10px;
  font-size: 1.2em;
}

input {
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
}

button {
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
}

.submit-btn {
  background-color: #4CAF50;
  color: white;
}

.submit-btn:hover {
  background-color: #45a049;
}

.reset-btn {
  background-color: #f44336;
  color: white;
}

.reset-btn:hover {
  background-color: #da190b;
}

.correct {
  color: #4CAF50;
  font-weight: bold;
}

.incorrect {
  color: #f44336;
  font-weight: bold;
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #008CBA;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.back-link:hover {
  background-color: #007B9A;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  margin-bottom: 20px;
}

.progress {
  height: 100%;
  background-color: #4CAF50;
  border-radius: 10px;
  transition: width 0.5s ease-in-out;
}

.flashcard.completed .flashcard-inner {
  background-color: #e8f5e9;
}

.flashcard.completed .flashcard-front,
.flashcard.completed .flashcard-back {
  background-color: #e8f5e9;
}

.loading {
  text-align: center;
  font-size: 1.2em;
  margin-top: 20px;
}

.login-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 10px;
}

</style>

