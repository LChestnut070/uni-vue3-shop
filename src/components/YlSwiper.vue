<script setup lang="ts">
import type { BannerItem } from '@/types/home'
import { ref } from 'vue'

defineProps<{
  bannerList: BannerItem[]
}>()

// 控制swiper当前页页数
const activeIndex = ref<number>(0)

// 当swiper当前页发生变化时触发
const changeCurrent: UniHelper.SwiperOnChange = (e) => {
  activeIndex.value = e.detail!.current
}
</script>

<template>
  <view class="carousel">
    <!-- 轮播图 -->
    <swiper :circular="true" :autoplay="true" :interval="3000" @change="changeCurrent">
      <swiper-item v-for="item in bannerList" :key="item.id">
        <navigator url="/pages/index/index" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image" :src="item.imgUrl"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 自定义指示点 -->
    <view class="indicator">
      <text
        v-for="(item, index) in bannerList"
        :key="item.id"
        class="dot"
        :class="{ active: index === activeIndex }"
      ></text>
    </view>
  </view>
</template>

<style lang="scss">
:host {
  display: block;
  height: 280rpx;
}
/* 轮播图 */
.carousel {
  height: 280rpx;
  position: relative;
  overflow: hidden;
  transform: translateY(0);
  background-color: #efefef;
  .indicator {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 16rpx;
    display: flex;
    justify-content: center;
    .dot {
      width: 30rpx;
      height: 6rpx;
      margin: 0 8rpx;
      border-radius: 6rpx;
      background-color: rgba(255, 255, 255, 0.4);
    }
    .active {
      background-color: #fff;
    }
  }
  .navigator,
  .image {
    width: 100%;
    height: 100%;
  }
}
</style>
