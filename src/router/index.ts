import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/LandingView.vue'),
      meta: { title: 'Nexus - Librería y Coworking en Aranjuez' }
    },
    {
      path: '/espacios',
      name: 'espacios',
      component: () => import('../views/EspaciosView.vue'),
      meta: { title: 'Espacios - Nexus Coworking' }
    },
    {
      path: '/checkout/:id',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue'),
      meta: { title: 'Confirmar Reserva - Nexus' }
    }
  ],
})

router.beforeEach((to) => {
  document.title = to.meta.title as string || 'Nexus Coworking'
})

export default router
