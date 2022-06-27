import Vue from 'vue'
import App from './App.vue'
import {Button,Carousel,CarouselItem,Form,FormItem,Input,Icon,Backtop,Select,DatePicker,Switch,Checkbox,Radio,Row,Col,Option,RadioGroup,CheckboxGroup,Loading,MessageBox,Collapse,CollapseItem} from 'element-ui'
import './assets/css/index.css'
import VueRouter from 'vue-router'
import video from 'video.js'
import router from './router'
import store from './store'
import axios from 'axios';
Vue.prototype.$axios = axios  
Vue.config.productionTip = false
// Vue.prototype.$alert = MessageBox.alert
//引入自定义组件
import directive from './util/directives'
import 'video.js/dist/video-js.css'
// require('vue-video-player/dist/')
//使用
Vue.use(directive)
Vue.use(Button)
Vue.use(Carousel)
Vue.use(Form)
Vue.use(Icon)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(CarouselItem)
Vue.use(VueRouter)
Vue.use(Backtop)
Vue.use(Select)
Vue.use(DatePicker)
Vue.use(Switch)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(Row)
Vue.use(Col)
Vue.use(Option)
Vue.use(RadioGroup)
Vue.use(CheckboxGroup)
Vue.use(Loading)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.component(MessageBox.name,MessageBox)
Vue.prototype.$video = video
Vue.prototype.$confirm = MessageBox.confirm
// Vue.use(axios)
new Vue({
  render: h => h(App),
  store,
  router:router
}).$mount('#app')
