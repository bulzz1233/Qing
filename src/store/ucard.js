import * as $api from '../api/index'
export default{
    name:'ucardData',
    namespaced:true,
    //暂时没用
    actions:{
        UserLikes(context,value){
            $api.userLikes.userLikes(value).then(
                result => {
                    console.log("修改成功")
                },
                error=>{
                    console.log(error.message)
                }
            )
        },
        AllLikes(context,value){
            $api.allLikes.allLikes(value).then(
                result => {
                    context.commit('AllLikes', result.data);

                },
                error=>{
                    console.log(error.message)
                }
            )
        },

    },
    mutations:{
        AllLikes(state,obj){
            let arry=[]
            obj.forEach(element => {
                arry.push(element.sid)
            });
            state.Likes=arry
        },
        AddLikes(state,obj){
                state.Likes
        }
    },
    state:{
        Likes:[]
    }
}