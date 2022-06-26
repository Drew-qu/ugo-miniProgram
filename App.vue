<script>
	import { mapState } from 'vuex';
export default {
	computed: {
		...mapState('m_user', ['token'])
	},
	
 	onLaunch: async function() {
		// console.log('App Launch')
		const [err,res] = await uni.login()
		// console.log(res);
	},
	onShow: function() {
		// 在用户未登录的情况下获取 Token
		if(!token) this.$store.dispatch('m_user/getToken')
	},
	onHide: function() {
		console.log('App Hide')
	}
}
</script>

<style lang="scss">
@import './fonts';
image {
	width: 100%;
	height: 100%;
	vertical-align: middle;
}

input {
	display: block;
	height: 100%;
	padding: 0;
	box-sizing: border-box;
	outline: none;
}

.tips {
	text-align: center;
	margin-top: 200rpx;
	font-size: 36rpx;
	color: #666;
}

.getMore {
	text-align: center;
	line-height: 1;
	padding: 20rpx;
	font-size: 30rpx;
	color: #666;
	background-color: #fff;
}
</style>
