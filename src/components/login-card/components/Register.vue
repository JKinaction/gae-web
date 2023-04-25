<template>
    <div class="card-title">
        <img src="@/assets/logo.png" alt="logo" />
        <span>账号注册</span>
    </div>
    <n-form ref="formRef" :rules="rules" :model="registerForm" label-placement="left" label-width="auto">
        <n-form-item label="邮箱" path="username">
            <n-input placeholder="请输入邮箱" v-model:value="registerForm.username" />
        </n-form-item>
        <n-form-item label="密码" path="password">
            <n-input placeholder="请输入密码" v-model:value="registerForm.password" type="password" />
        </n-form-item>
        <n-form-item label="确认密码" path="conPass">
            <n-input placeholder="请输入确认密码" type="password" v-model:value="registerForm.conPass" />
        </n-form-item>
    </n-form>
    <div class="card-btn">
        <n-button @click="goLogin()">返回登录</n-button>
        <n-button type="primary" @click="registerClick">注册</n-button>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { registerAPI } from '@/api/user';
import { NForm, NFormItem, NButton, NInput, useMessage } from 'naive-ui';
import { statusCode } from '@/utils/status-code';

const emit = defineEmits(['login']);


const formRef = ref(null);
const message = useMessage();//通知

const registerForm = reactive({
    username: "",
    password: "",
    conPass: ""
})

const validatePasswordSame = (rule, value) => {
    return value === registerForm.password
}

const rules = {
    username: [
        { required: true, message: "请输入邮箱", trigger: ['blur', 'input'] },
    ],
    password: { required: true, message: '请输入密码', trigger: ['blur', 'input'] },
    conPass: [
        { required: true, message: '请再次输入密码', trigger: ['input', 'blur'] },
        { validator: validatePasswordSame, message: '两次密码输入不一致', trigger: ['blur', 'password-input'] }
    ],
}

const registerClick = () => {
    formRef.value?.validate((errors) => {
        if (!errors) {
            registerAPI(registerForm).then((res) => {
                if (res.data.code === statusCode.OK) {
                    message.success('注册成功');
                    goLogin();
                }
            }).catch((err) => {

                message.error(err.response.data.msg || '注册失败');
            });
        } else {
            message.error('请检查输入的数据');
        }
    })
}

const goLogin = () => {
    emit("login");
}

</script>

<style lang="less" scoped>
.card-title {
    display: flex;
    height: 30px;
    align-items: center;
    margin-bottom: 20px;

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
    position: absolute;
    right: 30px;
    bottom: 26px;
    width: 360px;
    display: flex;
    justify-content: space-between;

    button {
        width: 140px;
        height: 36px;
    }
}
</style>