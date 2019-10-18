import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('./layouts/Main.vue'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/',
          component: () => import('./views/dashboard/Dashboard.vue')
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('./views/dashboard/Dashboard.vue'),
          default: true
        },
        {
          path: 'clients',
          name: 'clients',
          component: () => import('./views/client/Clients.vue')
        },
        {
          path: 'client/:id',
          name: 'client',
          component: () => import('./views/client/Client.vue')
        },
        {
          path: 'companies',
          name: 'companies',
          component: () => import('./views/company/Companies.vue')
        },
        {
          path: 'company',
          name: 'company',
          component: () => import('./views/company/Company.vue')
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('./views/settings/Settings.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/authentication/Login.vue')
    }
  ]
})
