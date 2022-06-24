<template >
  <view>
    <!-- 筛选 -->
    <view class="filter">
      <text class="active">综合</text>
      <text>销量</text>
      <text>价格</text>
    </view>
    <!-- 商品列表 -->
    <scroll-view  class="goods" scroll-y :scroll-top="scrollTop" @scroll = 'scroll' @scrolltolower="getMore">
      <view v-for="item in goodsList" :key="item.goods_id" class="item" @click="goDetail(item.goods_id)">
        <!-- 商品图片 -->
        <image class="pic" :src="item.goods_small_logo"></image>
        <!-- 商品信息 -->
        <view class="meta">
          <view class="name">{{item.goods_name}}</view>
          <view class="price">
            <text>￥</text>{{item.goods_price}}<text>.00</text>
          </view>
        </view>
      </view>
	  <view v-if="goodsList.length === 0" class="tips">{{msg}}</view>
      <!-- 加载更多 -->
      <view class="getMore" v-if="hasMore">正在加载...</view>
    </scroll-view>
	<!-- 回到顶部 -->
	<view class="goTop icon-top" v-if="old.scrollTop > 200" @click="goTop"></view>
  </view>
</template>

<script>
	import {debounce} from 'lodash';
  export default {
	onLoad(option) {
		// console.log(option);
		this.name = option.query
		// console.log(this.name);
		this.getGoodsList()
	},
	data() {
		return {
			name:'',
			goodsList: [],
			nextPage: 1,
			msg: '',
			hasMore: true,
			scrollTop: 0,
			old: {
				scrollTop: 0
			}
		}
	},
    methods: {
      goDetail(goodsId) {
		  // console.log(goodsId)
        uni.navigateTo({
          url: `/subpkg/pages/goods/index?query=` + goodsId
        })
      },
	  async getGoodsList() {
		  if(!this.name) return
		  // console.log(this.name);
		const {data : res} = await uni.$http.get('/api/public/v1/goods/search',{query: this.name,pagenum:this.nextPage++,pagesize:6})
		// console.log(res);
		if(res.meta.status !== 200) {
			return uni.showToast({
				title: '请求数据失败!',
				duration: 1500,
				icon: 'none'
			})
		}
		// 更新数据，重新渲染
		this.goodsList = this.goodsList.concat(res.message.goods)
		// this.goodsList = res.message.goods
		// 是否有更多数据
		this.hasMore = this.goodsList.length < res.message.total
		if(this.goodsList.length === 0) this.msg = '啥也没有 ! ! !'
		// console.log(this.goodsList);
	  },
	  getMore: debounce(function () {
		  this.getGoodsList()
	  },500),
	  scroll: function(e) {
		  this.old.scrollTop = e.detail.scrollTop
	  },
	  // 返回顶部
	  goTop(e) {
		  // console.log(11);
		  this.scrollTop = this.old.scrollTop
		  this.$nextTick(()=>{
				this.scrollTop = 0 
		  })
	  },
	  
    }
  }
</script>

<style scoped lang="scss">
  .filter {
    display: flex;
    height: 96rpx;
    line-height: 96rpx;
    border-bottom: 1rpx solid #ddd;

    /* #ifdef H5 */
    position: relative;
    z-index: 99;
    /* #endif */

    text {
      flex: 1;
      text-align: center;
      font-size: 30rpx;
      color: #333;

      &.active {
        color: #ea4451;
      }
    }
  }

  .goods {
    position: absolute;
    width: 100%;
    top: 97rpx;
    bottom: 0;
  }

  .item {
    display: flex;
    padding: 30rpx 20rpx 30rpx 0;
    margin-left: 20rpx;
    border-bottom: 1rpx solid #eee;

    &:last-child {
      border-bottom: none;
    }

    .pic {
      width: 200rpx;
      height: 200rpx;
      margin-right: 30rpx;
    }

    .meta {
      flex: 1;
      font-size: 27rpx;
      color: #333;
      position: relative;
    }

    .name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .price {
      position: absolute;
      bottom: 0;

      color: #ea4451;
      font-size: 33rpx;

      text {
        font-size: 22rpx;
      }
    }
  }
  .goTop {
  	position: fixed;
  	bottom: 30rpx;
  	/* #ifdef H5 */
  	bottom: 65px;
  	/* #endif */
  	right: 30rpx;
  
  	display: flex;
  	justify-content: center;
  	align-items: center;
  	width: 100rpx;
  	height: 100rpx;
  	font-size: 48rpx;
  	color: #666;
  	border-radius: 50%;
  	background-color: rgba(248, 248, 248, 0.8);
  }
</style>
