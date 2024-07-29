import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ContactView from '@/views/ContactView.vue';
import AboutView from '@/views/AboutView.vue';
import LessonsView from '@/views/LessonsView.vue';
import LessonDetailView from '@/views/LessonDetailView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import ProfileView from '@/views/ProfileView.vue';
import PaymentView from '@/views/PaymentView.vue';
import PortfolioView from '@/views/PortfolioView.vue';
import KhaoulaView from '@/views/KhaoulaView.vue';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomeView,
  },
  {
    path: '/contact',
    name: 'ContactPage',
    component: ContactView,
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutView,
  },
  {
    path: '/lessons',
    name: 'LessonsPage',
    component: LessonsView,
  },
  {
    path: '/lessons/:id',
    name: 'LessonDetailPage',
    component: LessonDetailView,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterView,
  },
  {
    path: '/payment',
    name: 'PaymentPage',
    component: PaymentView,
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: ProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: '/portfolio',
    name: 'PortfolioPage',
    component: PortfolioView,
  },
  {
    path: '/khaoula',
    name: 'KhaoulaPage',
    component: KhaoulaView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  if (isAuthenticated && to.name === 'LoginPage') {
    next({ name: 'ProfilePage' });
  } else {
    next();
  }
});

export default router;

