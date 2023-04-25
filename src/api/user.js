import request from '@/utils/request';

// 登录
export const loginAPI = (login) => {
    return request.post('user/login', login);
}

// 注册
export const registerAPI = (register) => {
    return request.post('user/register', register);
}

// 获取用户信息
export const getUserInfoAPI = () => {
    return request.get('user/info/get');
}
