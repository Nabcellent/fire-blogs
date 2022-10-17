import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/blogs',
            name: 'Blogs',
            component: Home
        },
        {
            path: '/blogs',
            name: 'CreatePost',
            component: Home
        },
        {
            path: '/blogs',
            name: 'Login',
            component: Home
        }
    ]
})

export default router
