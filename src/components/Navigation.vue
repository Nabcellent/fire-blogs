<template>
    <header>
        <nav class="container">
            <div class="branding">
                <router-link class="header" :to="{name:'Home'}">FireBlogs</router-link>
            </div>

            <div class="nav-links">
                <ul v-show="!mobile">
                    <router-link class="link" to="#">Home</router-link>
                    <router-link class="link" :to="{name:'Blogs'}">Blogs</router-link>
                    <router-link class="link" to="#">Create Post</router-link>
                    <router-link class="link" to="#">Sign In / Sign Up</router-link>
                </ul>
            </div>
        </nav>
        <img @click="toggleMobileNav" src="@/assets/Icons/bars-regular.svg" alt="" class="menu-icon" v-show="mobile">
        <transition name="mobile-nav">
            <ul class="mobile-nav" v-show="mobileNav">
                <router-link class="link" to="#">Home</router-link>
                <router-link class="link" :to="{name:'Blogs'}">Blogs</router-link>
                <router-link class="link" to="#">Create Post</router-link>
                <router-link class="link" to="#">Sign In / Sign Up</router-link>
            </ul>
        </transition>
    </header>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const mobile = ref(false)
const mobileNav = ref(false)
const windowWidth = ref(window.innerWidth)

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
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    z-index: 99;

    .link {
        font-weight: 500;
        padding: 0 8px;
        transition: 0.3s color ease;

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
            flex: 1;
            align-items: center;
            justify-content: flex-end;

            ul {
                margin-right: 32px;

                .link {
                    margin-right: 32px;
                }

                .link:last-child {
                    margin-right: 0;
                }
            }

            .profile {
                position: relative;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                color: #fff;
                background-color: #303030;

                span {
                    pointer-events: none;
                }

                .profile-menu {
                    position: absolute;
                    top: 60px;
                    right: 0;
                    width: 250px;
                    background-color: #303030;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

                    .info {
                        display: flex;
                        align-items: center;
                        padding: 15px;
                        border-bottom: 1px solid #fff;

                        .initials {
                            position: initial;
                            width: 40px;
                            height: 40px;
                            background-color: #fff;
                            color: #303030;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 50%;
                        }

                        .right {
                            flex: 1;
                            margin-left: 24px;

                            p:nth-child(1) {
                                font-size: 14px;
                            }

                            p:nth-child(2),
                            p:nth-child(3) {
                                font-size: 12px;
                            }
                        }
                    }

                    .options {
                        padding: 15px;

                        .option {
                            text-decoration: none;
                            color: #fff;
                            display: flex;
                            align-items: center;
                            margin-bottom: 12px;

                            .icon {
                                width: 18px;
                                height: auto;
                            }

                            p {
                                font-size: 14px;
                                margin-left: 12px;
                            }

                            &:last-child {
                                margin-bottom: 0;
                            }
                        }
                    }
                }
            }
        }

        .mobile-user-menu {
            margin-right: 40px;
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
        position: fixed;
        height: 100%;
        background-color: #303030;
        top: 0;
        left: 0;

        .link {
            padding: 15px 0;
            color: #fff;
        }
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
        transition: 1s ease all;
    }

    .mobile-nav-enter-from, .mobile-nav-leave-to {
        transform: translateX(-250px);
    }

    .mobile-nav-enter-to {
        transform: translateX(0);
    }
}
</style>