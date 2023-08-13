<script setup lang="ts">
import type { HotItem } from '@/types/home'

defineProps<{
  // 热门列表
  hotList: HotItem[]
}>()
</script>
<template>
  <!-- 推荐专区 -->
  <view class="panel hot">
    <view class="item" v-for="item in hotList" :key="item.id">
      <view class="title">
        <text class="title-text">{{ item.title }}</text>
        <text class="title-desc">{{ item.alt }}</text>
      </view>
      <navigator hover-class="none" url="/pages/hot/hot" class="cards">
        <image
          v-for="image in item.pictures"
          :key="image"
          class="image"
          mode="aspectFit"
          :src="image"
        ></image>
      </navigator>
    </view>
  </view>
</template>

<style scoped lang="scss">
// .hot {
//   display: flex;
//   flex-wrap: wrap;
//   min-height: 508rpx;
//   margin: 20rpx 10rpx 0;
//   background-color: #fff;
//   border-radius: 10rpx;
//   .item {
//     display: flex;
//     width: 50%;
//     height: 254rpx;
//     border-right: 1rpx solid #eee;
//     border-top: 1rpx solid #eee;
//     flex-direction: column;
//     .title {
//       display: flex;
//       align-items: center;
//       justify-content: start;
//       padding: 24rpx 24rpx 0;
//       color: #262626;
//       position: relative;
//       .title-text {
//         font-size: 36rpx;
//         margin-right: 18rpx;
//       }
//       .title-desc {
//         font-size: 24rpx;
//         color: #7f7f7f;
//       }
//     }
//     &:nth-child(2n) {
//       border-right: 0 none;
//     }
//     &:nth-child(-n + 2) {
//       border-top: 0 none;
//     }
//     .cards {
//       flex: 1;
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       .image {
//         width: 150rpx;
//         height: 150rpx;
//       }
//     }
//   }
// }
/* 热门推荐 */
.hot {
  display: flex;
  flex-wrap: wrap;
  min-height: 508rpx;
  margin: 20rpx 20rpx 0;
  border-radius: 10rpx;
  background-color: #fff;

  .title {
    display: flex;
    align-items: center;
    padding: 24rpx 24rpx 0;
    font-size: 32rpx;
    color: #262626;
    position: relative;
    .title-desc {
      font-size: 24rpx;
      color: #7f7f7f;
      margin-left: 18rpx;
    }
  }

  .item {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 254rpx;
    border-right: 1rpx solid #eee;
    border-top: 1rpx solid #eee;
    .title {
      justify-content: start;
    }
    &:nth-child(2n) {
      border-right: 0 none;
    }
    &:nth-child(-n + 2) {
      border-top: 0 none;
    }
    .image {
      width: 150rpx;
      height: 150rpx;
    }
  }
  .cards {
    flex: 1;
    padding: 15rpx 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
