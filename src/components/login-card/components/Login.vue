<template>
    <div class="card-title">
        <img src="@/assets/logo.png" alt="logo" />
        <span>账号登录</span>
    </div>
    <n-form ref="formRef" :rules="rules" :model="loginForm" label-placement="left" label-width="auto">
        <n-form-item label="邮箱" path="email">
            <n-input placeholder="请输入邮箱" v-model:value="loginForm.email" />
        </n-form-item>
        <n-form-item label="密码" path="password">
            <n-input placeholder="请输入密码" v-model:value="loginForm.password" type="password" />
        </n-form-item>
        <div class="card-btn">
            <n-button @click="goRegister()">注册</n-button>
            <n-button type="primary" @click="loginClick()">登录</n-button>
        </div>
    </n-form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { loginAPI } from '@/api/user';
import { storageData as storage } from '@/utils/storage-data';
import { NForm, NFormItem, NButton, NInput, useMessage } from 'naive-ui';

const emit = defineEmits(['register', 'finish']);


const formRef = ref(null);
const message = useMessage();//通知

const loginForm = reactive({
    email: "",
    password: "",
})

const rules = {
    email: [
        { required: true, message: "请输入邮箱", trigger: ['blur', 'input'] },
    ],
    password: { required: true, message: '请输入密码', trigger: ['blur', 'input'] },
}

const loginClick = () => {
    formRef.value?.validate((errors) => {
        if (!errors) {
            loginAPI(loginForm).then((res) => {
                if (res.data.code === 2000) {
                    storage.set("userid", res.data.data.userid);
                    emit('finish');
                }
            }).catch((err) => {
                message.error(err.response.data.msg || '登录失败');
            });
        } else {
            message.error('请检查输入的数据');
        }
    })
}

const goRegister = () => {
    emit("register");
}
</script>

<style lang="less" scoped>
.card-title {
    display: flex;
    height: 50px;
    align-items: center;
    margin-bottom: 30px;

    img {
        width: 40px;
        height: 40px;
    }

    span {
        color: #18a058;
        font-size: 26px;
        margin-left: 10px;
    }
}

.card-btn {
    width: 100%;
    display: flex;
    margin-top: 10px;
    justify-content: space-between;

    button {
        width: 150px;
        height: 40px;
    }
}
</style>