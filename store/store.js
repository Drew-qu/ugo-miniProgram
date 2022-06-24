import Vue from 'vue';
import Vuex from 'vuex';

// 导入 cart 模块
import cartModule from './cart';

// 安装 Vuex
Vue.use(Vuex)

// 创建 store
const store = new Vuex.Store({
	state: {
		msg: 'vuex 成功运行...'
	},
	modules: {
		'm_cart': cartModule
	}
})

export default store