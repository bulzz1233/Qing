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
                if (element.sportFit == 'young') {
                    state.Young.push(element);
                }
                if (element.sportFit == 'mid') {
                    state.Mid.push(element);
                }
                if (element.sportFit == 'old') {
                    state.Old.push(element);
                }
            });
        },
        addType(state,obj) {
            obj.forEach(element => {
                if (element.sportType == 'run') {
                    state.Run.push(element);
                }
                if (element.sportType == 'swim') {
                    state.Swim.push(element);
                }
                if (element.sportType == 'football') {
                    state.Footbal.push(element);
                }
                if (element.sportType == 'ride') {
                    state.Ride.push(element);
                }
                if (element.sportType == 'baseketball') {
                    state.Basketball.push(element);
                }
                if (element.sportType == 'yoga') {
                    state.Yoga.push(element);
                }
                if (element.sportType == 'walk') {
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
