import request from '@/utils/request';

// 获取问题列表
export const getQuestionListAPI = () => {
    return request.get('question/question-list');
}

// 获取问题
export const getQuestionAPI = (id) => {
    return request.post('question/question', { questionid: id });
}
