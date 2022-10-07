import * as $api from '../api/index';

export default {
    name: 'runData',
    namespaced: true,
    //拓展下面的数据
    actions: {
        SearchByFit(context, value) {

            $api.searchByFit.searchByFit(value).then(
                result => {
                    context.commit('addYoung', result.data);
                },
                error => {
                    console.log(error.message);
                }
            );
        },
        AllSport(context, value){
            $api.allsport.allsport(value).then(

                result => {
                    console.log(result.data)
                    context.commit('addType', result.data);
                    context.commit('allData', result.data);
                },
                error => {
                    console.log(error.message);
                }
            )
        }
    },
    mutations: {
        
        addYoung(state, obj) {
            obj.forEach(element => {
                if (element.sportFit.includes('young')) {
                    state.Young.push(element);
                }
                if (element.sportFit.includes('mid')) {
                    state.Mid.push(element);
                }
                if (element.sportFit.includes('old')) {
                    state.Old.push(element);
                }
            });
        },
        addType(state,obj) {
            obj.forEach(element => {
                if (element.sportType.indexOf('run')!=-1) {
                    state.Run.push(element);
                }
                if (element.sportType.indexOf('swim')!=-1) {
                    state.Swim.push(element);
                }
                if (element.sportType.indexOf('football')!=-1) {
                    state.Football.push(element);
                }
                if (element.sportType.indexOf('ride')!=-1) {
                    state.Ride.push(element);
                }
                if (element.sportType.indexOf('basketball')!=-1) {
                    state.Basketball.push(element);
                }
                if (element.sportType.indexOf('yoga')!=-1) {
                    state.Yoga.push(element);
                }
                if (element.sportType.indexOf('walk')!=-1) {
                    state.Walk.push(element);
                }
            });
        },
        allData(state,obj){
            obj.forEach(element=>{
                state.All.push(element)
            })
        }
    },
    state: {
        All:[],
        Young: [],
        Mid: [],
        Old: [],
        Run:[],
        Swim:[],
        Football:[],
        Ride:[],
        Basketball:[],
        Yoga:[],
        Walk:[],
    },
};
