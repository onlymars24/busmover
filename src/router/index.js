import { createRouter, createWebHistory  } from 'vue-router'
import axiosClient from '../axiosClient'

import store from '../store'


// import store from '../store/index.ts'
// import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/races/:dispatchSlug/:arrivalSlug',
      name: 'Races',
      component: () => import('../views/Races.vue'),
      beforeEnter: async (to, from) => {
        // const store = useStore(key)
        // console.log(store.state)
        console.log(store.state.dispatchPoint, store.state.arrivalPoint)
        if(store.state.dispatchPoint && store.state.arrivalPoint){
          return
        }
        let points = null
        await axiosClient
        .get('/points/check/existence?dispatchSlug='+to.params.dispatchSlug+'&arrivalSlug='+to.params.arrivalSlug)
        .then(response => {
          points = response.data
          console.log(points)
        })
        .catch(error => {
          console.log(error)
        })
        if(!points['dispatchPoint'] || !points['arrivalPoint']){
          // 404
          return {
            name: 'NotFound',
            params: {pathMatch: to.path.split('/').slice(1)},
            query: to.query,
            hash: to.hash
          }
        }
        store.commit('pointsSetBySlugs', points)
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router