import Vue      from 'vue'
import './plugins/axios'
import App      from './App.vue'
import vuetify  from './plugins/vuetify'
import router   from './router'
import axios    from 'axios'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token')

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') === null) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
