import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/Index.vue';
import { storageData } from '@/utils/storage-data';

const baseRoutes = [
    {
        path: '/',
        name: 'Home',
        meta: { auth: true },
        component: HomeView
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("../views/login/Index.vue")
    },
    {
        path: '/question',
        name: 'Question',
        component: () => import("../views/question/Index.vue")
    },
    {
        path: '/404',
        name: '404',
        component: () => import("../views/result/page-not-found/Index.vue")
    },
    {
        path: '/:catchAll(.*)',
        redirect: {
            name: "404"
        }
    }
]

const routes = baseRoutes

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})

router.beforeEach((to, from, next) => {
    //是否需要登录
    if (to.meta.auth && !storageData.get('userid')) {
        router.push({ name: 'Login' });
    } else {
        next();
    }
})

export default router
