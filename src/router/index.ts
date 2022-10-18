import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import ForgotPassword from '../views/auth/ForgotPassword.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                title: 'Login'
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: {
                title: 'Register'
            }
        },
        {
            path: '/forgot-password',
            name: 'ForgotPassword',
            component: ForgotPassword,
            meta: {
                title: 'Forgot Password'
            }
        },
        {
            path: '/',
            name: 'Home',
            component: () => import('../views/Home.vue'),
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
        }
    ]
})

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | FireBlog`
    next()
})

export default router
