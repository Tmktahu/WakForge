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
      component: () => import('../components/Home.vue'),
    },
    {
      path: '/builder/:buildId',
      name: CHARACTER_BUILDER_ROUTE,
      component: () => import('../components/CharacterBuilder.vue'),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../components/AboutView.vue')
    // }
  ],
});

export default router;
