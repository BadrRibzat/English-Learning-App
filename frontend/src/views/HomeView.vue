<template>
  <div class="home">
    <div class="hero">
      <h1>Welcome to the English Learning App</h1>
      <p class="tagline">
        Unlock your potential with our interactive lessons and exercises.
      </p>
      <button @click="startLearning" class="cta">Start Learning</button>
    </div>
    <div class="about">
      <h2>Why Choose Our App?</h2>
      <p class="description">
        Our English learning app is designed to help you master the language with ease. With our cutting-edge technology and engaging content, you'll be speaking fluently in no time. From beginner to advanced levels, we cater to learners of all abilities. Immerse yourself in a world of vocabulary, grammar, and conversation practice. Prepare for exams, improve your career prospects, or simply enjoy the journey of learning a new language. Join our vibrant community of language enthusiasts and embark on an unforgettable learning adventure today!
      </p>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'HomePage',
  setup() {
    const router = useRouter();

    const startLearning = () => {
      router.push('/lessons');
    };

    return { startLearning };
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: linear-gradient(to bottom, #4CAF50, #2E8B57);
  color: white;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.tagline {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.cta {
  background-color: white;
  color: #4CAF50;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.3s;
}

.cta:hover {
  transform: translateY(-5px);
}

.about {
  max-width: 800px;
  padding: 2rem;
}

.description {
  font-size: 1.2rem;
  line-height: 1.6;
}
</style>
