<template>
    <div class="question-list">
        <div class="title">问题列表</div>
        <div class="question-item" v-for="item in questionList" @click="goQuestion(item.ID)">
            <span class="name">{{ item.Name }}</span>
            <span class="content">{{ item.Contents }}</span>
        </div>
    </div>
</template>


<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getQuestionListAPI } from '@/api/question';
import { statusCode } from '@/utils/status-code';
import { useMessage } from 'naive-ui';


const message = useMessage();
const router = useRouter();

const questionList = ref([]);
const getQuestionList = () => {
    getQuestionListAPI().then((res) => {
        if (res.data.code === statusCode.OK) {
            questionList.value = res.data.data.question;
        } else {
            message.error("获取问题列表失败");
        }
    }).catch(() => {
        message.error("获取问题列表失败");
    })
}

const goQuestion = (id) => {
    router.push({ name: "Question", query: { questionid: id } });
}

onBeforeMount(() => {
    getQuestionList();
})

// onBeforeMount(() => {
//     goQuestion(Number.parseInt(router.query.id));
// })
</script>

<style lang="less" scoped>
.question-list {
    width: 80%;
    margin: 30px auto 20px;

    .title {
        color: #212121;
        font-size: 18px;
        margin-bottom: 30px;
    }


    .question-item {
        background: #fff;
        border: 1px solid #ededed;
        border-radius: 5px;
        margin-bottom: 8px;
        cursor: pointer;
        padding-left: 16px;

        -webkit-box-shadow: 0 2px 5px 0 rgb(0 0 0 / 10%);
        box-shadow: 0 2px 5px 0 rgb(0 0 0 / 10%);


        .name {
            display: block;
            color: #232323;
            margin: 8px 0;
            font-size: 15px;
            line-height: 22px;
            font-weight: 400;
        }


        .content {
            display: block;
            font-size: 13px;
            color: #626262;
            padding: 10px 0;
        }
    }
}
</style>