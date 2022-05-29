export default {
    name: 'calendarData',
    namespaced:true,
    //日历的数据
    actions: {},
    mutations: {
        addTodoList(state,obj){
            state.Ttest.push(obj)
        }
    },
    state: {
        // 待做事项
        Ttest: [
            {id:'2',  username:'a' , date: '2022/4/9', interval:0 ,content: '俯卧撑', done: false    ,reminder:'false'},
            {id:'1',  username:'a' , date: '2022/04/9',interval:0 , contevnt: '引体向上', done: false,reminder:'false' },
            {id:'3',  username:'a' , date: '2022/4/9', interval:0 ,content: '平板支撑', done: false  ,reminder:'false' },
            {id:'4',  username:'a' , date: '2022/4/10',interval:0 , content: '跑步1公里', done: false,reminder:'false' },
            {id:'5',  username:'a' , date: '2022/4/10',interval:0 , content: '引体1向上', done: false,reminder:'false' },
            {id:'6',  username:'a' , date: '2022/4/10',interval:0 , content: '引体2向上', done: false,reminder:'false' },
            {id:'7',  username:'a' , date: '2022/4/10',interval:0 , content: '引体3向上', done: false,reminder:'false' },
            {id:'8',  username:'a' , date: '2022/4/10',interval:0 , content: '引体3向上', done: false,reminder:'false' },
            {id:'9',  username:'a' , date: '2022/4/10',interval:0 , content: '引体3向上', done: false,reminder:'false' },
            {id:'10', username:'a' , date: '2022/4/10',interval:0 , content: '引31向上', done: false,reminder:'false' },
            {id:'11', username:'a' , date: '2022/4/12',interval:0 , content: '引4向上',  done: false,reminder:'false' },
            {id:'12',  username:'a' , date: '2022/5/23',interval:0 , content: '引体3向上', done: false,reminder:'false' },
            {id:'13',  username:'a' , date: '2022/5/24',interval:0 , content: '引体3向上', done: false,reminder:'false' },
            {id:'14',  username:'a' , date: '2022/5/24',interval:0 , content: '引体3向上', done: false,reminder:'false' },
            {id:'15', username:'a' , date: '2022/5/25',interval:0 , content: '引31向上', done: false,reminder:'false' },
            {id:'16', username:'a' , date: '2022/5/25',interval:0 , content: '引4向上',  done: false,reminder:'false' },
            {id:'17', username:'a' , date: '2022/6/3',interval:0 , content: '引31向上', done: false,reminder:'false' },
            {id:'18', username:'a' , date: '2022/6/15',interval:0 , content: '引4向上',  done: false,reminder:'false' },
            {id:'19',  username:'a' , date: '2022/6/10',interval:0 , content: '引体2向上', done: false,reminder:'false' },
            {id:'20',  username:'a' , date: '2022/6/10',interval:0 , content: '引体3向上', done: false,reminder:'false' },
            {id:'21',  username:'a' , date: '2022/6/10',interval:0 , content: '引体3向上', done: false,reminder:'false' },
        ]
    }
}


