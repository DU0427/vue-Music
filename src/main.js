import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Message, Notification  } from 'element-ui'

Vue.config.productionTip = false

Vue.prototype.$message = Message
new Vue({
  router,
  store,
  created(){
    Vue.prototype.$bus=this
  },
  render: h => h(App)
}).$mount('#app')
