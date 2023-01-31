import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Input , Icon} from 'element-ui'


Vue.config.productionTip = false
Vue.use(Input,Icon)



new Vue({
  router,
  store,
  created(){
    Vue.prototype.$bus=this
  },
  render: h => h(App)
}).$mount('#app')
