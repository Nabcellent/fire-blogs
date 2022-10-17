<template>
    <header>
        <nav class="container">
            <div class="branding">
                <router-link class="header" :to="{name:'home'}">FireBlogs</router-link>
            </div>

            <div class="nav-links">
                <ul v-show="!mobile">
                    <router-link class="link" to="#">Home</router-link>
                    <router-link class="link" to="#">Blogs</router-link>
                    <router-link class="link" to="#">Create Post</router-link>
                    <router-link class="link" to="#">Sign In / Sign Up</router-link>
                </ul>
            </div>
        </nav>
        <img @click="toggleMobileNav" src="@/assets/Icons/bars-regular.svg" alt="" class="menu-icon" v-show="mobile">
        <transition name="mobile-nav">
            <ul class="mobile-nav" v-show="mobileNav">
                <router-link class="link" to="#">Home</router-link>
                <router-link class="link" to="#">Blogs</router-link>
                <router-link class="link" to="#">Create Post</router-link>
                <router-link class="link" to="#">Sign In / Sign Up</router-link>
            </ul>
        </transition>
    </header>
</template>

<script setup>
import { onMounted, ref } from "vue";

const mobile = ref(false)
const mobileNav = ref(false)
const windowWidth = ref(null)

onMounted(() => {
    window.addEventListener('resize', checkScreen)
    checkScreen()
})

const checkScreen = () => {
    windowWidth.value = window.innerWidth

    if (windowWidth.value <= 750) {
        mobile.value = true
        return;
    }

    mobile.value = false
    mobileNav.value = false
}

const toggleMobileNav = () => {
    mobileNav.value = !mobileNav.value
}
</script>

<style lang="scss" scoped>
header {
    background-color: #fff;
    padding: 0 25px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);
    z-index: 99;

    .link {
        font-weight: 500;
        padding: 0 8px;
        transition: .3s color ease;

        &:hover {
            color: #1eb8b8;
        }
    }

    nav {
        display: flex;
        padding: 25px 0;

        .branding {
            display: flex;
            align-items: center;

            .header {
                font-weight: 600;
                font-size: 24px;
                color: #000;
                text-decoration: none;
            }
        }

        .nav-links {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            flex: 1;

            ul {
                margin-right: 32px;

                .link {
                    margin-right: 32px;
                }

                .link:last-child {
                    margin-right: 0;
                }
            }
        }
    }

    .menu-icon {
        cursor: pointer;
        position: absolute;
        top: 32px;
        right: 25px;
        height: 25px;
        width: auto;
    }

    .mobile-nav {
        padding: 20px;
        width: 70%;
        max-width: 250px;
        display: flex;
        flex-direction: column;
        top: 0;
        left: 0;
        position: fixed;
        height: 100%;
        background-color: #303030;

        .link {
            padding: 15px 0;
            color: #fff;
        }
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
        transition: all 1s ease;
    }

    .mobile-nav-enter {
        transform: translateX(-250px);
    }

    .mobile-nav-enter-to {
        transform: translateX(0);
    }

    .mobile-nav-leave-to {
        transform: translateX(-250px);
    }
}
</style>