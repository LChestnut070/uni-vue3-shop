<template>
  <!-- 订单列表 -->
  <scroll-view scroll-y class="orders" @scrolltolower="$emit('getOrderList', 'next')">
    <view class="card" v-for="item in orderList" :key="item.id">
      <!-- 订单信息 -->
      <view class="status">
        <text class="date">{{ item.createTime }}</text>
        <!-- 订单状态文字 -->
        <text>{{ orderStateList[item.orderState].text }}</text>
        <!-- 待评价/已完成/已取消 状态: 展示删除订单 -->
        <text class="icon-delete" v-if="item.orderState >= OrderState.DaiPingJia"></text>
      </view>
      <!-- 商品信息，点击商品跳转到订单详情，不是商品详情 -->
      <navigator
        v-for="sku in item.skus"
        :key="sku.id"
        class="goods"
        :url="`/pagesOrder/detail/detail?id=${item.id}`"
        hover-class="none"
      >
        <view class="cover">
          <image mode="aspectFit" :src="sku.image"></image>
        </view>
        <view class="meta">
          <view class="name ellipsis">{{ sku.name }}</view>
          <view class="type">{{ sku.attrsText }}</view>
        </view>
      </navigator>
      <!-- 支付信息 -->
      <view class="payment">
        <text class="quantity">共{{ item.totalNum }}件商品</text>
        <text>实付</text>
        <text class="amount"> <text class="symbol">¥</text>{{ item.payMoney }}</text>
      </view>
      <!-- 订单操作按钮 -->
      <view class="action">
        <!-- 待付款状态：显示去支付按钮 -->
        <template v-if="item.orderState === OrderState.DaiFuKuan">
          <view class="button primary" @tap="onOrderPay(item)">去支付</view>
        </template>
        <template v-else>
          <navigator
            class="button secondary"
            :url="`/pagesOrder/create/create?orderId=${item.id}`"
            hover-class="none"
          >
            再次购买
          </navigator>
          <!-- 待收货状态: 展示确认收货 -->
          <view v-if="item.orderState === OrderState.DaiShouHuo" class="button primary"
            >确认收货</view
          >
        </template>
      </view>
    </view>
    <!-- 底部提示文字 -->
    <view class="loading-text" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
      {{ orderList.length === 0 ? '没有更多数据~' : '正在加载...' }}
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { OrderState, orderStateList } from '@/services/constant'
import { reqGetPayMock, reqGetWxPayMiniPay } from '@/services/pay'
import type { OrderItem } from '@/types/order'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const $emit = defineEmits(['getOrderList'])
defineProps<{
  orderList: OrderItem[]
}>()

/* 去支付 */
const onOrderPay = async (item: OrderItem) => {
  // uni.showLoading({ title: '正在跳转支付页中' })
  // if (import.meta.env.DEV) {
  //   // 如果为开发环境
  //   await reqGetPayMock({ orderId: item.id })
  //   uni.hideLoading()
  // } else {
  //   // 如果为生产环境
  //   const res = await reqGetWxPayMiniPay({ orderId: item.id })
  //   uni.hideLoading()
  //   await wx.requestPayment(res.result)
  // }
  // // 支付成功
  // uni.showToast({
  //   icon: 'success',
  //   title: '支付成功',
  // })
  // // 再次获取列表
  // $emit('getOrderList')
  uni.navigateTo({ url: `/pagesOrder/detail/detail?id=${item.id}` })
}
</script>

<style scoped></style>
