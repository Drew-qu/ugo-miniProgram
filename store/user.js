export default {
	namespaced: true,
	state() {
		return {
			// 初始一个状态数据
			address: uni.getStorageSync('address') || null,
			userProfile: uni.getStorageInfoSync('userProfile') || {}
		}
	},
	getters: {
		userInfo(state) {
			return state.userProfile.userInfo
		}
	},
	mutations: {
		saveAddress(state, address) {
			state.address = address
			uni.setStorageSync('address',address)
		},
		saveProfile(state,userProfile) {
			state.userProfile = userProfile
			uni.setStorageSync('userProfile',userProfile)
		}
	}
}