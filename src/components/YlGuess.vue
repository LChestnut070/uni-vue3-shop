<script setup lang="ts">
import { reqGetHomeGuessLikeList } from '@/services/home'
import type { PageParams } from '@/types/global'
import type { GuessItem } from '@/types/home.d'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 分页参数(在首页设置为必选项)
const pageParams = ref<Required<PageParams>>({
  // 当前页
  page: 1,
  // 每页大小
  pageSize: 10,
})
// 总页数
const pages = ref<number>(parseInt(''))

// 生命周期函数
onLoad(() => {
  getHomeGuessLikeList()
})

// 获取猜你喜欢列表
const guessLikeList = ref<GuessItem[]>([])
const getHomeGuessLikeList = async () => {
  // 如果当前页超过了总页数,则结束程序
  if (pageParams.value.page > pages.value) {
    return uni.showToast({
      icon: 'none',
      title: '没有更多数据了哦~',
    })
  }
  const res = await reqGetHomeGuessLikeList(pageParams.value)
  /* guessLikeList为数组,push的值应该为对象,才能正确显示,res.result.items为数组,所以要进行解构 */
  // 猜你喜欢列表
  guessLikeList.value.push(...res.result.items)
  // 将总页数传递
  pages.value = res.result.pages
  // 当前页数+1,为下一次发请求做准备
  pageParams.value.page++
}

// 重置数据
const resetData = () => {
  guessLikeList.value = []
  pageParams.value.page = 1
  pages.value = parseInt('')
}

// 暴露方法
defineExpose({
  getMore: getHomeGuessLikeList,
  resetData,
})
</script>

<template>
  <!-- 猜你喜欢 -->
  <view class="caption">
    <text class="text">猜你喜欢</text>
  </view>
  <view class="guess">
    <navigator
      class="guess-item"
      v-for="item in guessLikeList"
      :key="item.id"
      :url="`/pages/goods/goods?id=${item.id}`"
    >
      <image class="image" mode="aspectFill" :src="item.picture"></image>
      <view class="name">{{ item.name }}</view>
      <view class="price">
        <text class="small">¥</text>
        <text>{{ item.price }}</text>
      </view>
    </navigator>
  </view>
  <view class="loading-text">
    {{ pageParams.page > pages ? '没有更多数据了哦~' : '正在加载...' }}
  </view>
</template>

<style lang="scss">
:host {
  display: block;
}
/* 分类标题 */
.caption {
  display: flex;
  justify-content: center;
  line-height: 1;
  padding: 36rpx 0 40rpx;
  font-size: 32rpx;
  color: #262626;
  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 28rpx 0 30rpx;

    &::before,
    &::after {
      content: '';
      width: 20rpx;
      height: 20rpx;
      background-image: url(@/static/images/bubble.png);
      background-size: contain;
      margin: 0 10rpx;
    }
  }
}

/* 猜你喜欢 */
.guess {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;
  .guess-item {
    width: 345rpx;
    padding: 24rpx 20rpx 20rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
    background-color: #fff;
  }
  .image {
    width: 304rpx;
    height: 304rpx;
  }
  .name {
    height: 75rpx;
    margin: 10rpx 0;
    font-size: 26rpx;
    color: #262626;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .price {
    line-height: 1;
    padding-top: 4rpx;
    color: #cf4444;
    font-size: 26rpx;
  }
  .small {
    font-size: 80%;
  }
}
// 加载提示文字
.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0;
}
</style>
