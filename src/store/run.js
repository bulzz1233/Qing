import * as $api from '../api/index';

export default {
    name: 'runData',
    namespaced: true,
    //拓展下面的数据
    actions: {
        SearchByFit(context, value) {
            console.log(value);

            $api.searchByFit.searchByFit(value).then(
                result => {
                    context.commit('addYoung', result.data);
                },
                error => {
                    console.log(error.message);
                }
            );
        },
    },
    mutations: {
        addYoung(state, obj) {
            console.log('result' + obj);
            var i;
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
        addmid() {},
        addold() {},
    },
    state: {
        Young: [],
        Mid: [],
        Old: [],
    },
};
