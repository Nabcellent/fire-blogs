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
            // route level code-splitting this generates a separate chunk (Blogs.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/Home.vue'),
            meta: {
                title: 'Home'
            }
        },
        {
            path: '/blogs',
            name: 'Blogs',
            component: () => import('../views/Blogs.vue'),
            meta: {
                title: 'Blogs'
            }
        },
        {
            path: '/posts/create',
            name: 'CreatePost',
            component: () => import('@/views/posts/Create.vue'),
            meta: {
                title: 'Create Post'
            }
        },
        {
            path: '/posts/preview',
            name: 'BlogPreview',
            component: () => import('@/views/posts/Create.vue')
        },
        {
            path: '/profile',
            name: 'Profile',
            component: () => import('../views/Profile.vue'),
            meta: {
                title: 'Profile'
            }
        },
        {
            path: '/admin',
            name: 'Admin',
            component: () => import('../views/Admin.vue'),
            meta: {
                title: 'Admin'
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | FireBlog`
    next()
})

export default router
