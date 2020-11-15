import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
        path: '/map',
        name: 'Map',
        component: () => import('../views/Map')
    },
    {
        path: '/qna',
        name: 'Question',
        component: () => import('../views/QuestionView.vue')
    },
    {
        path: '/qna/content/:num',
        name: 'Contents',
        component: () => import('../views/Contents.vue')
    },
    {
        path: '/reservation',
        name: 'Reservation',
        component: () => import('../views/ReservationView.vue')
    },
    {
        path: '/member/login',
        name: 'Login',
        component: () => import('../views/member/Login.vue')
    },
    {
        path: '/member/signup',
        name: 'SignUp',
        component: () => import('../views/member/SignUp.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
