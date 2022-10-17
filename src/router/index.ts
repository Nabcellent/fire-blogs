import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                title: 'Home'
            }
        },
        {
            path: '/blogs',
            name: 'Blogs',
            // route level code-splitting this generates a separate chunk (Blogs.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/Blogs.vue'),
            meta: {
                title: 'Blogs'
            }
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

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | FireBlog`
    next()
})

export default router
