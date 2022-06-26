export default {
	namespaced: true,
	state() {
		return {
			// 初始一个状态数据
			address: uni.getStorageSync('address') || null,
			userProfile: uni.getStorageInfoSync('userProfile') || {
				avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
				nickname: '微信用户'
			}
		}
	},
	getters: {
		
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