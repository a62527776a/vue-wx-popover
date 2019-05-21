import App from './App.vue'
import WXPopover from '../src/index.js'
import Vue from 'vue'

Vue.use(WXPopover, {
  offsetX: -15
})

new Vue({
  render: h => h(App)
}).$mount('#app')