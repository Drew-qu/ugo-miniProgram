export default {
	namespaced: true,
	state() {
		return {
			// 初始的状态数据
			carts: uni.getStorageSync('cart') || []
		}
	},
	mutations: {
		addToCart(state, goods) {
			// console.log(state);
			// console.log(goods);
			const result = state.carts.find(item => item.goods_id === goods.goods_id)
			if(!result) {
				state.carts.push(goods)
			} else {
				// 存在相同商品时, 将数量加 1
				result.goods_count += 1
			}
			// 存入本地
			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state) {
			uni.setStorageSync('cart',state.carts)
		},
		toggleState(state, index) {
			state.carts[index].goods_state = !state.carts[index].goods_state
			this.commit('m_cart/saveToStorage')
		},
		toggleAll(state,allChecked) {
			// 遍历设置每个商品的选中状态
			state.carts.forEach(item => item.goods_state = !allChecked)
			this.commit('m_cart/saveToStorage')
		},
		increaseCount(state, index) {
			state.carts[index].goods_count += 1
		},
		decreaseCount(state, index) {
			if(state.carts[index].goods_count <= 1) return
			state.carts[index].goods_count -= 1
		},
		deleteGoods(state, index) {
			state.carts.splice(index, 1)
			uni.setStorageSync('cart',state.carts)
		}
	},
	getters: {
		cartCount(state) {
			return state.carts.length
		},
		// 是否为全选
		allChecked(state) {
			// 是否每个商品的 goods_state 属性都为 true
			return state.carts.every(item => item.goods_state)
		},
		// 统计购物车处于选中状态商品的总数量
		checkedCount(state) {
			return state.carts.reduce((count, item) => {
				// 如果商品状态未选中从则不参与统计
				if(!item.goods_state) return count
				// 累加每个商品的购买数量
				return count += item.goods_count
			}, 0)
		},
		// 计算商品的总结额
		amount(state) {
			return state.carts.reduce((amount, item) => {
				if(!item.goods_state) return amount
				return amount += item.goods_count * item.goods_price
			}, 0)
		}
	}
}