import Vue from 'vue'
import Router from 'vue-router'
import {getToken} from "./utils";

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/home/Home.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/home/Home.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/mistake',
      name: 'mistake',
      component: () => import(/* webpackChunkName: "about" */ './views/mistake/Mistake.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.

      component: () => import('./views/Login.vue')
    },
    {
      path: '*',
      name: 'error',
      component: () => import('./views/Error.vue')
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!getToken('token') || getToken('token')==='undefined') {
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
