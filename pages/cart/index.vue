<template>
  <view class="wrapper">
	<template v-if="carts.length">
		<!-- 收货信息 -->
		<view class="shipment">
		  <template v-if="address">
			  <view class="dt">收货人: </view>
			  <view class="dd meta">
			    <text class="name">{{address.userName}}</text>
			    <text class="phone">{{address.telNumber}}</text>
			  </view>
			  <view class="dt">收货地址:</view>
			  <view class="dd">			
				{{address.provinceName}}
				{{address.cityName}}
				{{address.countyName}}
				{{address.detailInfo}}
			  </view>
		  </template>
			<button type="primary" @click="saveAddress" v-else>添加收货地址</button>
		</view>
		<!-- 购物车 -->
		<view class="carts">
		  <view class="item">
		    <!-- 店铺名称 -->
			<view class="shopname">优购生活馆</view>
				<van-swipe-cell right-width="65"  class="goods" v-for="(item, index) in carts" :key="item.goods_id">
					<van-cell-group class='group'>
					  <!-- 商品图片 -->
					  <image class="pic" :src="item.goods_small_logo" @click='goDetali(item.goods_id)'></image>
					  <!-- 商品信息 -->
					  <view class="meta">
						<view class="name" @click='goDetali(item.goods_id)'>{{ item.goods_name }}</view>
						<view class="price">
						  <text>￥</text>{{ item.goods_price }}<text>.00</text>
						</view>
						<!-- 加减 -->
						<view class="amount">
						  <text class="reduce" @click="decreaseCount(index)">-</text>
						  <input type="number" :key="item.goods_id" :value="item.goods_count" class="number">
						  <text class="plus" @click="increaseCount(index)">+</text>
						</view>
					  </view>
					  <!-- 选框 -->
					  <view class="checkbox" @click="toggleState(index)">
						<icon type="success" size="20" :color="item.goods_state ? '#ea4451' : '#ccc'"></icon>
					  </view>
					</van-cell-group>
					<van-button slot="right" type="danger" class= 'button-delete' @click='hDelete(index)'>删除</van-button>
				</van-swipe-cell>
		  </view>
		</view>
		<!-- 其它 -->
		<view class="extra">
		  <label class="checkall" @click="toggleAll">
		    <icon type="success" :color="allChecked ? '#ea4451' : '#ccc'" size="20"></icon>
		    全选
		  </label>
		  <view class="total">
		    合计: <text>￥</text><label>{{ amount }}</label><text>.00</text>
		  </view>
		  <view class="pay">结算({{checkedCount}})</view>
		</view>
	</template>
	<view class="tips" v-else>
		啥也没有 ~~~
		<button type="primary" @click="goBuyGoods" class="guanggaung">去逛逛吧!!!</button>
	</view>
  </view>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
  export default {
	data() {
		return {
		}
	},
	computed: {
		...mapState('m_cart', ['carts']),
		...mapState('m_user', ['address']),
		...mapGetters('m_cart', ['allChecked','checkedCount', 'amount'])
	},
	methods: {
		toggleState(index) {
			this.$store.commit('m_cart/toggleState', index)
		},
		toggleAll(){
			this.$store.commit('m_cart/toggleAll', this.allChecked)
		},
		decreaseCount(index) {
			this.$store.commit('m_cart/decreaseCount', index)
		},
		increaseCount(index) {
			this.$store.commit('m_cart/increaseCount', index)
		},
		async saveAddress(){
			// #ifdef MP-WEIXIN
			// 同步方式获取收货地址
			const [err,{errMsg,...address}] = await uni.chooseAddress()
			// 检查是否获取成功
			if(err) {
				return uni.showToast({
					title: '获取地址失败 !',
					icon: 'none'
				})
			}
			// 调用  mutations 将地址存到 vuex 和本地存储
			this.$store.commit('m_user/saveAddress', address)
			// console.log(this.address);
			// #endif
			
			// #ifndef MP-WEIXIN
			uni.showToast({
				title: '暂不支持 H5',
				icon: 'none'
			})
			// #endif
		},
		goBuyGoods() {
			uni.switchTab({
				url: '/pages/category/index'
			})
		},
		hDelete(index) {
			// console.log(index);
			this.$store.commit('m_cart/deleteGoods', index)
		},
		goDetali(id) {
			uni.navigateTo({
				url: `/subpkg/pages/goods/index?query=` + id
			})
		}
	}
  }
</script>

<style scoped lang="scss">
  .shipment {
    height: 100rpx;
    line-height: 2;
    padding: 30rpx 30rpx 40rpx 30rpx;
    font-size: 27rpx;
    color: #333;
    background-color: #fff;
    background-image: url(http://static.botue.com/ugo/images/cart_border%402x.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;

    .dt {
      width: 140rpx;
      float: left;
      clear: both;
    }

    .dd {
      padding-left: 160rpx;
    }

    .meta {
      padding-right: 50rpx;
    }

    text.phone {
      float: right;
    }
  }

  .carts {
    background-color: #f4f4f4;
    padding-bottom: 110rpx;
    overflow: hidden;

    .shopname {
      padding: 30rpx;
      margin-top: 20rpx;
      font-size: 30rpx;
      color: #333;
      background-color: #fff;
      border-top: 1rpx solid #eee;
      border-bottom: 1rpx solid #eee;
    }

    .goods {
      display: flex;
      padding: 30rpx 20rpx 30rpx 0;
      // margin-left: 105rpx;
      border-bottom: 1rpx solid #eee;
      background-color: #fff;
  
      position: relative;
	
	.group {
		width: 750rpx;
		height: 100%;
		display: flex;
	}
	
      .checkbox {
        width: 80rpx;
        height: 100%;
        background-color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        left: 0;
        top: 0;
      }

      &:last-child {
        border-bottom: none;
      }

      .pic {
        width: 200rpx;
        height: 200rpx;
        margin-left: 80rpx;
      }

      .meta {
        flex: 1;
        font-size: 27rpx;
        color: #333;
        position: relative;
      }

      .name {
        width: 95%;
        overflow: hidden;
		margin-left: 10rpx;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .price {
        position: absolute;
		left: 0rpx;
        bottom: 0rpx;

        color: #ea4451;
        font-size: 33rpx;

        text {
          font-size: 22rpx;
        }
      }

	 .button-delete {
		display: flex;
		margin-top: 50rpx;
	  }
	  
      .amount {
        position: absolute;
        bottom: 0;
        right: 20rpx;

        height: 48rpx;
        text-align: center;
        border: 1rpx solid #ddd;
        border-radius: 8rpx;

        display: flex;
        align-items: center;

        text {
          display: block;
          width: 60rpx;
          line-height: 48rpx;
          font-size: 36rpx;
          color: #ddd;
          text-align: center;
        }

        input {
          width: 60rpx;
          height: 48rpx;
          min-height: 48rpx;
          font-size: 27rpx;
          border-left: 1rpx solid #ddd;
          border-right: 1rpx solid #ddd;
        }
      }
    }
  }

  .extra {
    position: fixed;
    bottom: 0;
    /* #ifdef H5 */
    bottom: 50px;
    /* #endif */
    left: 0;
    z-index: 9;

    width: 750rpx;
    height: 96rpx;
    text-align: center;
    line-height: 96rpx;
    font-size: 36rpx;
    border-top: 1rpx solid #eee;
    background-color: #fff;
    color: #333;
    display: flex;

    .checkall {
      width: 140rpx;
      line-height: 1;
      margin-left: 25rpx;
      display: flex;
      align-items: center;

      icon {
        margin-right: 20rpx;
      }
    }

    .total {
      display: flex;
      justify-content: center;
      flex: 1;

      label, text {
        color: #ea4451;
        vertical-align: bottom;
        position: relative;
        bottom: -2rpx;
      }

      text {
        position: relative;
        bottom: -3rpx;
        font-size: 24rpx;

        &:first-child {
          margin-left: 10rpx;
        }
      }
    }

    .pay {
      width: 200rpx;
      background-color: #ea4451;
      color: #fff;
    }
  }
  .guanggaung{
	  position: fixed;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%,-50%);
	  width: 200rpx;
	  height: 200rpx;
	  border-radius: 50%;
	  line-height: 200rpx;
  }
</style>

