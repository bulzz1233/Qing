// import { splice } from 'core-js/core/array';
import { MessageBox } from 'element-ui';
import * as $api from '../api/index';

export default {
    name: 'calendarData',
    namespaced: true,
    //日历的数据
    actions: {
        ToAddPlan(context, value) {
            $api.addplan.addplan(value).then(
                result => {
                    //接收存储用户信息
                    console.log('添加成功');
                    window.alert('添加成功')
                },
                error => {
                    console.log(error.message);
                }
            );
        },
        AllPlan(context, value) {
            // console.log(value);

            $api.allplan.allplan(value).then(
                result => {
                    //接收存储用户信息
                    // console.log(result.data);
                    context.commit('AllPlan', result.data);
                },
                error => {
                    console.log(error.message);
                }
            );
        },
        DelPlan(context, value) {
            $api.delplan.delplan(value).then(
                result => {
                    //接收存储用户信息

                    context.commit('DelPlan', JSON.parse(value));

                    MessageBox.alert('删除成功', '提示');
                },
                error => {
                    console.log(error.message);
                }
            );
        },
        UpdatePlan(context, value) {
            $api.updateplan.updateplan(value).then(
                result => {
                    //接收存储用户信息

                    //context.commit('DelPlan', JSON.parse(value));
                    console.log('修改成功');
                    // MessageBox.alert('已完成', '提示');
                },
                error => {
                    console.log(error.message);
                }
            );
        },
        Allfinish(context, value) {
            $api.allfinish.allfinish(value).then(
                result => {
                    context.commit('Allfinish', result.data);
                },
                error => {
                    console.log(error.message);
                }
            );
        },
        Addfinish(context, value) {
            console.log(value);
            $api.addfinish.addfinish(value).then(
                result => {
                    console.log('打卡成功');
                },
                error => {
                    console.log(error.message);
                }
            );
        },
    },
    mutations: {
        addTodoList(state, obj) {
            state.Plan.push(obj);
        },
        AllPlan(state, obj) {
            let arr = []
            obj.forEach(element => {
                arr.push(element);
            });
            state.Plan = arr
        },
        DelPlan(state, obj) {
            state.Plan.forEach((item, index, array) => {
                if (item.planId == obj.pid) {
                    array.splice(index, 1);
                }
            });

            // let i = [];
            // let u = i.filters((item, index) => {
            //     return item.planId != obj.pid
            // });
            // state.Plan = u
        },
        Allfinish(state, obj) {
            let i = 0;
            obj.forEach(element => {
                state.FinishDate.push(element.finishDate);
                i++;
            });
            state.FinishDay = i;
        },
    },
    state: {
        // 待做事项
        Plan: [],
        Test: [],
        FinishDate: [],
        FinishDay: 0,
    },
};
