import axios from "axios";

export default {
    name: 'headData',
    namespaced:true,
    //搜索的数据
    actions: {
        // 发送请求，获取搜索提示列表
        // searchTips_list(context){
        //     axios.get('').then(
        //         response=>{
        //             context.commit()
        //         },
        //         error =>{
        //             alert(error.message)
        //         }
        //     )
        // }
        Ttest(){console.log('d')} 
    },
    mutations: {},
    state: {
        Ttest: [
            {
                id: '001',
                title: '这是一段测试文字这是一段测试文字这是一段测试文字',
                img: '2',
                star: 5,
                isStar: false,
            },
            {
                id: '002',
                title: '这是第二段测试文字这是一段测试文字这是一段测试文字',
                img: '2',
                star: 6,
                isStar: false,
            },
            {
                id: '003',
                title: '这是第三段测试文字这是一段测试文字这是一段测试文字',
                img: '2',
                star: 7,
                isStar: false,
            },
            {
                id: '004',
                title: '这是第四段测试文字这是一段测试文字这是一段测试文字',
                img: '2',
                star: 8,
                isStar: false,
            },
        ],
    },
};
