export default {
	namespaced: true,
	state() {
		return {
			// 初始一个状态数据
			address: uni.getStorageSync('address') || null,
			userProfile: uni.getStorageInfoSync('userProfile') || {
				avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
				nickname: '微信用户'
			},
			// token: uni.getStorageSync('token') || '',
			token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjU5LCJpYXQiOjE2NTYyMzIxNTQsImV4cCI6MTAwMTY1NjIzMjE1M30.F6HKP7fozTR71W_uIE__zKa8fxVNWSZWtx2EMu3dXAw'
		}
	},
	getters: {
		fullAddress(state) {
			if(!state.address) return ''
			const {provinceName, cityName, countyName, detailInfo} = state.address
			return provinceName + cityName + countyName + detailInfo
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
		},
		// saveToken(state, token) {
		// 	state.token = token
		// 	uni.setStorageSync('token',token)
		// }
	},
	actions: {
		async getToken() {
			// console.log('App Show')
			// 获取登录凭证
			const [err, {code}] = await uni.login()
			// console.log('登录凭证', code);
			// 获取用户信息
			const [err1, {rawData, signature, iv, encryptedData}] = await uni.getUserInfo()
			// console.log('获取用户信息', userInfo);
			// 调用接口 获取token
			const {data: res} = await uni.$http.post('/api/public/v1/users/wxlogin',{code, encryptedData, rawData, iv, signature})
			// console.log(res);
			// if(res.mssage.token){
			// 	this.commit('m_user/saveToken', res.mssage.token)
			// }
			
		}
	}
}