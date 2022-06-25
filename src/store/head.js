import axios from "axios";
import * as $api from '../api/index'

export default {
    name: 'headData',
    namespaced:true,
    //搜索的数据
    actions: {
        //发送请求，获取搜索提示列表
        searchTips_list(context,value){
            $api.search.search(value).then(
                response=>{
                    
                    context.commit("addTips",response.data)
                },
                error =>{
                    alert(error.message)
                }
            )
        }
        //Ttest(){console.log('d')} 
    },
    mutations: {
        addTips(state,data){
            state.Tips_list=data
            
        }
    },
    state: {
        Tips_list: [],
    },
};
