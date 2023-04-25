<template>
    <div class="login-bg">
        <div class="login-card">
            <div class="card-content">
                <div class="content-left">
                    <img src="@/assets/login.png" alt="登录" />
                </div>
                <div class="content-right">
                    <transition name="fade" mode="out-in">
                        <div v-if="showLogin" key="1">
                            <login @register="setCard(false)" @finish="loginFinish"></login>
                        </div>

                        <div v-else key="2">
                            <register @login="setCard(true)"></register>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

const router = useRouter();

const showLogin = ref(true);

const loginFinish = () => {
    router.push({ name: "Home" });
}

const setCard = (val) => {
    showLogin.value = val;
}
</script>

<style lang="less" scoped>
.login-bg {
    top: 0;
    z-index: 999;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.45);
}

.login-card {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 50%;
    left: 50%;
    margin: -200px 0 0 -315px;
    width: 630px;
    height: 310px;
    padding: 10px 20px;
    background-color: #fff;
    border-radius: 20px;
    animation: fadein .3s ease-in;
    box-shadow: 16px 16px 50px -12px rgba(0, 0, 0, 0.8);

    .card-content {
        display: flex;
        height: 250px;
        align-items: center;
        margin-top: 20px;

        .content-left {
            width: 260px;
            text-align: center;

            img {
                width: 100%;
                margin-top: 20px;
            }
        }

        .content-right {
            width: 360px;
        }
    }
}

@keyframes fadein {
    0% {
        opacity: 0;
        transform: scale(0.1);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
    transition: all .5s ease;
}
</style>