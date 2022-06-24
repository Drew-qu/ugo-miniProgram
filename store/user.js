export default {
	namespaced: true,
	state() {
		// 初始一个状态数据
		address: uni.getStorageSync('address') || null
	},
	mutations: {
		saveAddress(state,address) {
			state.address = address
			uni.setStorageSync('address',address)
		}
	}
}