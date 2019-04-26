import Vue from 'vue'
import App from './App.vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import store from './store'
import router from './router'
import './mock'

import '@/styles/index.scss'

Vue.config.productionTip = false

Vue.use(Element, {
	size: 'medium' // set element-ui default size
})

new Vue({
	store,
	router,
	render: h => h(App),
}).$mount('#app')