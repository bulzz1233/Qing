import Vue from 'vue'
import Vuex from 'vuex'
import ucardData from './ucard'
import runData from './run'
import calendarData from './calendar'
import headData from './head'
import userData from './user'
Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        headData,
        ucardData,
        runData,
        calendarData,
        userData,
    }
})