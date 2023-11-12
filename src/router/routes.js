import { createRouter, createWebHistory } from 'vue-router';

export const LANDING_ROUTE = 'landing';
export const CHARACTERS_ROUTE = 'characters';
export const CHARACTER_BUILDER_ROUTE = 'character-builder';
export const AUTO_BUILDER_ROUTE = 'auto-builder';
export const DATA_ROUTE = 'data';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: LANDING_ROUTE,
      redirect: '/characters',
    },
    {
      path: '/characters',
      name: CHARACTERS_ROUTE,
      component: () => import('@/components/CharactersPage.vue'),
    },
    {
      path: '/characters/:characterId',
      name: CHARACTER_BUILDER_ROUTE,
      component: () => import('@/components/characterSheet/CharacterSheet.vue'),
    },
    {
      path: '/auto-builder',
      name: AUTO_BUILDER_ROUTE,
      component: () => import('@/components/AutoBuilderPage.vue'),
    },
    {
      path: '/data',
      name: DATA_ROUTE,
      component: () => import('@/components/DataPage.vue'),
    },
  ],
});

export default router;
