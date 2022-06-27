<template>
    <v-chart class="chart" :option="option" />
</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import store from '@/store';

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent]);

export default {
    name: 'circular',
    components: {
        VChart,
    },
    provide: {
        [THEME_KEY]: 'light ',
    },
    data() {
        return {
            option: {
                title: {
                    text: '我的运动偏好',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)',
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: [],
                },
                series: [
                    {
                        name: '我的运动偏好',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                        },
                    },
                ],
            },
        };
    },
    computed: {
        chart_data() {
            return this.$store.state.calendarData.Plan;
        },
    },
    watch: {
        chart_data: {
            deep: true,
            handler(newArry, oldArry) {
                
            },
        },
    },
    mounted() {
        this.$nextTick(
            ()=>{
                let walk = 0;
                let run = 0
                let swim = 0
                let football = 0
                let ride = 0
                let baseketball = 0
                let yoga = 0

        let arry = [];
        arry = this.chart_data;
        arry.forEach(element => {
            if (element.sportType == 'run') {
                run++;
            }
            if (element.sportType == 'swim') {
                swim++;
            }
            if (element.sportType == 'football') {
                football++;
            }
            if (element.sportType == 'ride') {
                ride++;
            }
            if (element.sportType == 'baseketball') {
                baseketball++;
            }
            if (element.sportType == 'yoga') {
                yoga++;
            }
            if (element.sportType == 'walk') {
                walk++;
            }
        });
        if (run != 0) {
            let obj1 = {
                name: '跑步',
                value: run,
            };
            this.option.series[0].data.push(obj1);
            this.option.legend.data.push('跑步');
        }
        if (swim != 0) {
            let obj2 = {
                name: '游泳',
                value: swim,
            };
            this.option.series[0].data.push(obj2);
            this.option.legend.data.push('游泳');
        }
        if (football != 0) {
            let obj3 = {
                name: '足球',
                value: football,
            };
            this.option.series[0].data.push(obj3);
            this.option.legend.data.push('足球');
        }
        if (ride != 0) {
            let obj4 = {
                name: '骑行',
                value: ride,
            };
            this.option.series[0].data.push(obj4);
            this.option.legend.data.push('骑行');
        }
        if (baseketball != 0) {
            let obj5 = {
                name: '篮球',
                value: baseketball,
            };
            this.option.series[0].data.push(obj5);
            this.option.legend.data.push('篮球');
        }
        if (yoga != 0) {
            let obj5 = {
                name: '瑜伽',
                value: yoga,
            };
            this.option.series[0].data.push(obj5);
            this.option.legend.data.push('瑜伽');
        }
        if (walk != 0) {
            let obj5 = {
                name: '行走',
                value: walk,
            };
            this.option.series[0].data.push(obj5);
            this.option.legend.data.push('行走');
        }
            }
        )
        
    },
};
</script>

<style scoped>
.chart {
    height: 100vh;
}
</style>

<style>
body {
    margin: 0;
}
</style>
