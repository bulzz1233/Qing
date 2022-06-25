import axios from 'axios';
import { MessageBox } from 'element-ui';
import qs from 'qs'
axios.defaults.headers["Content-Type"]="application/json"
const request = axios.create({
    baseURL: '/api',
    timeout: 5000,
});
//请求拦截器
request.interceptors.request.use((config)=>{
    //获得token放到请求头
    const token = localStorage.getItem('token')
    if(token) config.headers.Authorization = token
    return config;
},error=>{
    console.log("请求发送失败",error)
    MessageBox.alert("请求发送失败","错误提示")
})
//响应拦截器
request.interceptors.response.use(resultWrapper=>{
    
    let result = resultWrapper.data
    if(result.success){
        return result
    }else{
        if(result.code&&result.code === 40000){
            //跳转登录页面
            localStorage.removeItem('token')
            localStorage.removeItem('user_data')
            window.location.reload()
        }else{
            MessageBox.alert(result.msg,"错误提示")
            return Promise.reject(result)
        }
        
    }
},
error=>{
    console.log("请求发送失败",error)
    Message.error("服务器")
    return Promise.reject("服务器响应失败")
})

    export default request;
