import * as $api from '../api/index'
export default {
    name: 'userData',
    namespaced:true,
    actions: {
        //发送请求，获取用户信息，返回token
        ToLogin() {
            $api.login.login().then(
                response => {
                    console.log(response);
                },
                error => {
                    alert(error.message);
                }
            );
        },
    },
    mutations: {},
    state: {
        // 待做事项
        Ttest: [],
    },
};
