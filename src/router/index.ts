import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import ForgotPassword from '../views/auth/ForgotPassword.vue'
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import db from "@/firebase/firebaseInit";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                title: 'Login',
                requiresAuth: false
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: {
                title: 'Register',
                requiresAuth: false
            }
        },
        {
            path: '/forgot-password',
            name: 'ForgotPassword',
            component: ForgotPassword,
            meta: {
                title: 'Forgot Password',
                requiresAuth: false
            }
        },
        {
            path: '/',
            name: 'Home',
            // route level code-splitting this generates a separate chunk (Blogs.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/Home.vue'),
            meta: {
                title: 'Home',
                requiresAuth: false
            }
        },
        {
            path: '/posts',
            name: 'Blogs',
            component: () => import('../views/posts/Index.vue'),
            meta: {
                title: 'Blogs',
                requiresAuth: false
            }
        },
        {
            path: '/posts/create',
            name: 'CreatePost',
            component: () => import('@/views/posts/Create.vue'),
            meta: {
                title: 'Create Post',
                requiresAuth: true,
                requiresAdmin: true
            }
        },
        {
            path: '/posts/preview',
            name: 'PreviewPost',
            component: () => import('@/views/posts/Preview.vue'),
            meta: {
                title: 'Preview Post',
                requiresAuth: true,
                requiresAdmin: true
            }
        },
        {
            path: '/posts/:id/view',
            name: 'ViewPost',
            component: () => import('@/views/posts/View.vue'),
            meta: {
                title: 'View Post',
                requiresAuth: false,
            }
        },
        {
            path: '/posts/:id/edit',
            name: 'EditPost',
            component: () => import('@/views/posts/Edit.vue'),
            meta: {
                title: 'Edit Post',
                requiresAuth: true,
                requiresAdmin: true
            }
        },
        {
            path: '/profile',
            name: 'Profile',
            component: () => import('../views/Profile.vue'),
            meta: {
                title: 'Profile',
                requiresAuth: true
            }
        },
        {
            path: '/admin',
            name: 'Admin',
            component: () => import('../views/Admin.vue'),
            meta: {
                title: 'Admin',
                requiresAuth: true,
                requiresAdmin: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | FireBlog`
    next()
})

router.beforeEach(async (to, from, next) => {
    const user = getAuth().currentUser,
        snap = await getDoc(doc(db, 'users', String(user?.uid)))
    let admin = false

    if (user) admin = Boolean(snap.data()?.is_admin)

    if (to.matched.some(res => res.meta.requiresAuth)) {
        if (user) {
            if (to.matched.some(res => res.meta.requiresAdmin)) {
                if (admin) return next()

                return next({ name: 'Home' })
            }

            return next()
        }

        return next({ name: 'Home' })
    }

    return next()
})

export default router
