<template>
    <div class="question">
        <div class="question-left">
            <div class="question-content">
                <div class="name">
                    <p class="label">题目</p>
                    <span>{{ question.Name }}</span>
                </div>
                <div class="content">
                    <p class="label">内容</p>
                    <span>{{ question.Contents }}</span>
                </div>
                <div class="user-input">
                    <p class="label">Funcs 函数使用</p>
                    <n-input type="textarea" v-model:value="form.funcs"></n-input>
                </div>
                <div class="user-input">
                    <p class="label">Vars 变量定义</p>
                    <n-input type="textarea" v-model:value="form.vars"></n-input>
                </div>
                <div class="user-input">
                    <p class="label">Signal 运算符禁用</p>
                    <n-input type="textarea" v-model:value="form.signal"></n-input>
                </div>
            </div>
            <div class="btn-list">
                <n-button type="primary" @click="check">检查</n-button>
                <n-button type="primary" @click="run">运行</n-button>
            </div>
        </div>
        <div class="question-right">
            <editor @update:value="updateCode"></editor>
            <div class="response">
                <p class="label">response</p>
                <span>{{ resdata }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getQuestionAPI } from "@/api/question";
import { runcodeAPI, checkfuncvarAPI } from "@/api/detect";
import { onBeforeMount, reactive, ref } from "vue";
import { useRoute } from 'vue-router';
import { statusCode } from "@/utils/status-code";
import { NInput, NButton, useMessage } from 'naive-ui';
import Editor from "@/components/editor/Index.vue";


const message = useMessage();
const route = useRoute();

const form = reactive({
    code: "",
    funcs: "",
    vars: "",
    signal: ""
})

const question = ref();
const getQuestion = (id) => {
    getQuestionAPI(id).then((res) => {
        question.value = res.data.data.question;
    })
}

const updateCode = (code) => {
    form.code = code;
}

const check = () => {
    const data = {
        questionid: Number.parseInt(route.query.questionid),
        funcs: form.funcs,
        vars: form.vars,
        signal: form.signal,
        code: form.code
    }

    checkfuncvarAPI(data).then((res) => {
        if (res.data.code === statusCode.OK) {            
            resdata.value = JSON.stringify(res.data.data);
            // message.success(JSON.stringify(res.data.data));
        } else {
            resdata.value = JSON.stringify(res.data.data);
            // message.success(JSON.stringify(res.data.data));
        }
    }).catch(() => {
        message.error("检查失败");
    })
}
const resdata = ref();
const run = () => {
    runcodeAPI(Number.parseInt(route.query.questionid), form.code).then((res) => {
        if (res.data.code === statusCode.OK) {
            resdata.value = JSON.stringify(res.data.data);
            // message.success(JSON.stringify(res.data.data));
        } else {
            resdata.value = JSON.stringify(res.data.data);
            // message.success(JSON.stringify(res.data.data));
        }
    }).catch(() => {
        message.error("运行失败");
    })
}


onBeforeMount(() => {
    getQuestion(Number.parseInt(route.query.questionid));
})
</script>


<style lang="less" scoped>
.question {
    background-color: #f3f4f5;
    height: 100vh;
    display: flex;
    overflow: hidden;

    .question-left {
        width: 50%;
        display: flex;
        flex-direction: column;

        .question-content {
            margin-bottom: 8px;
            padding-left: 16px;

            .label {

                color: #232323;
                margin: 8px 0;
                font-size: 18px;
            }

            .name {
                display: block;
                color: #232323;
                margin: 8px 0;
                font-size: 15px;
                line-height: 22px;
                font-weight: 400;
                background: #fff;
                border-radius: 6px;
            }


            .content {
                height: 16vh;
                display: block;
                font-size: 13px;
                color: #626262;
                padding: 10px 0;
                background: #fff;
                border-radius: 6px;
            }

            .user-input {
                padding: 6px;
                margin: 8px 0;
                border-radius: 6px;
                background: #fff;
            }
        }


        .btn-list {
            display: flex;
            align-items: center;
            margin: 0 16px;
            justify-content: space-between;
        }
    }

    .question-right {
        width: 50%;            
            .label {

                color: #232323;
                margin: 8px 0;
                font-size: 18px;
            }
            .response {
                height: 16vh;
                display: block;
                font-size: 13px;
                color: #626262;
                padding: 10px 0;
                background: #fff;
                border-radius: 6px;
            }
    }
}
</style>