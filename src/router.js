import Vue from 'vue'
import Router from 'vue-router'
import {getToken} from "./utils";
import navBar from '@/components/nav-bar';
Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      components: {
        default:() => import(/* webpackChunkName: "home" */ './views/home/Home.vue'),
        navBar:navBar
      },
      meta: { requiresAuth: true },
      props:{
        navBar:()=>({current:'home'})
      }
    },
    {
      path: '/mistake',
      name: 'mistake',
      components:{
        default:() => import(/* webpackChunkName: "Mistake" */ './views/mistake/Mistake.vue'),
        navBar:navBar
      },
      meta: { requiresAuth: true },
      props:{
        navBar:()=>({current:'mistake'})
      }
    },
    {
      path: '/check',
      name: 'check',
      component:() => import(/* webpackChunkName: "Check" */ './views/Check.vue'),
      meta: { requiresAuth: true },
      props:(route)=>({id:route.query.id})
    },
    {
      path: '/report',
      name: 'report',
      component:() => import(/* webpackChunkName: "Report" */ './views/Report.vue'),
      meta: { requiresAuth: true },
      props:(route)=>({id:route.query.id})
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.

      component: () => import(/* webpackChunkName: "login" */'./views/Login.vue')
    },
    {
      path: '*',
      name: 'error',
      component: () => import(/* webpackChunkName: "error" */'./views/Error.vue')
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
