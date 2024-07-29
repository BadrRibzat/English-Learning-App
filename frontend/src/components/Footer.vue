<template>
  <footer class="English-Learning-App-footer">
    <div class="language-selector">
      <label for="language-select">{{ $t('language') }}:</label>
      <select id="language-select" v-model="$i18n.locale">
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
        <option value="ch">Chinese</option>
        <option value="ar">Arabic</option>
        <option value="ko">Korean</option>
        <option value="ja">Japanese</option>
        <!-- Add more language options as needed -->
      </select>
    </div>
    <p>{{ $t('footerText') }}</p>
  </footer>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  name: 'Footer',
  setup () {
    const { t } = useI18n()
    return { t }
  }
}
</script>

<style scoped>
.app-footer {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f0f0f0;
  text-align: center;
}

.language-selector {
  margin-bottom: 1rem;
}

select {
  margin-left: 0.5rem;
  padding: 0.25rem;
}
</style>
