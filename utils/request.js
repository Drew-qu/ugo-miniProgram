// 按需导入 $http 对象
import {
	$http
} from '@escook/request-miniprogram'

import store from '@/store/store'

// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http

// 配置请求根路径
// $http.baseUrl = 'https://api-hmugo-web.itheima.net'
$http.baseUrl = 'https://uinav.com'

// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
	// do somethimg...
	uni.showLoading({
		title: '玩命加载中...',
		mask: true
	})
	// z只有路径中包含了 /my/ 的才需要 token
	if(options.url.includes('/my/')) {
		options.header = {
			Authorization: store.state.m_user.token
		}
	}
}


// 请求完成之后做一些事情
$http.afterRequest = function(res) {
	// do something...
	uni.hideLoading()
}

uni.$http = $http