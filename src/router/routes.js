import { createRouter, createWebHistory } from 'vue-router';

export const LANDING_ROUTE = 'landing';
export const HOME_ROUTE = 'home';
export const CHARACTER_BUILDER_ROUTE = 'character-builder';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: LANDING_ROUTE,
      redirect: '/home',
    },
    {
      path: '/home',
      name: HOME_ROUTE,
      component: () => import('../components/HomePage.vue'),
    },
    {
      path: '/builder/:characterId',
      name: CHARACTER_BUILDER_ROUTE,
      component: () => import('../components/CharacterBuilder.vue'),
    },
  ],
});

export default router;
