// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ContactView from '../views/ContactView.vue';
import LessonsView from '../views/LessonsView.vue';
import LessonDetailView from '../views/LessonDetailView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import PortfolioView from '../views/PortfolioView.vue';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomeView
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutView
  },
  {
    path: '/contact',
    name: 'ContactPage',
    component: ContactView
  },
  {
    path: '/lessons',
    name: 'LessonsPage',
    component: LessonsView
  },
  {
    path: '/lessons/:id',
    name: 'LessonDetailPage',
    component: LessonDetailView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginView
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterView
  },
  {
    path: '/portfolio',
    name: 'PortfolioPage',
    component: PortfolioView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard to check for authentication
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
