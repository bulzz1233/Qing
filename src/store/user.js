import * as $api from '../api/index'
export default {
    name: 'userData',
    namespaced:true,
    actions: {
        //发送请求，获取用户信息，返回token
        ToLogin(context,value) {
            console.log(value)

            $api.login.login(value).then(
                result => {
                    //接收存储用户信息
                    console.log(result.data);
                    
                    localStorage.setItem("user_data",JSON.stringify(result.data))
                    localStorage.setItem("token",result.data.token)
                    
                    context.commit('addUser',result.data)
                    window.location.reload()
                },
                error => {
                    console.log(error.message);
                }
            );
        },
        //请求注册
        ToRegister(context,value){
            $api.register.register(value).then(
                response => {
                    alert("注册成功");
                    window.location.reload()
                },
                error => {
                    alert(error.message);
                }
            );
        }
    },
    mutations: {
            //添加
            addUser(state,data){
                state.userData.push(data)
                
            }
    },
    state: {
        // 用户信息
        userData:[],
    },
};
