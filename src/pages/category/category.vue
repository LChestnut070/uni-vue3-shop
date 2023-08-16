<script setup lang="ts">
import PageSkeleton from './pageSkeleton.vue'
import { reqGetCategoryList } from '@/services/category'
import { reqGetHomeBannerList } from '@/services/home'
import type { CategoryTopItem } from '@/types/category'
import type { BannerItem } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 分类顶部轮播图
const bannerList = ref<BannerItem[]>([])
// 分类全部数据
const categoryTopItemList = ref<CategoryTopItem[]>([])
// 当前一级分类序号
const categoryTopItemIndex = ref<number>(0)
// 骨架屏显示状态
const skeletonStatus = ref<boolean>(true)

// 生命周期函数
onLoad(async () => {
  await Promise.all([getCateBannerList(), getCategoryList()])
  skeletonStatus.value = false
})

// 获取分类顶部轮播图
const getCateBannerList = async () => {
  const res = await reqGetHomeBannerList(2)
  bannerList.value = res.result
}
// 获取分类数据
const getCategoryList = async () => {
  const res = await reqGetCategoryList()
  categoryTopItemList.value = res.result
}
</script>

<template>
  <!-- 骨架屏 -->
  <PageSkeleton v-if="skeletonStatus" />
  <!-- 页面 -->
  <view class="viewport" v-else>
    <!-- 搜索框 -->
    <view class="search">
      <view class="input">
        <text class="icon-search">女靴</text>
      </view>
    </view>
    <!-- 分类 -->
    <view class="categories">
      <!-- 左侧：一级分类 -->
      <scroll-view class="primary" scroll-y>
        <view
          v-for="(item, index) in categoryTopItemList"
          :key="item.id"
          class="item"
          :class="{ active: index === categoryTopItemIndex }"
          @tap="categoryTopItemIndex = index"
        >
          <text class="name"> {{ item.name }} </text>
        </view>
      </scroll-view>
      <!-- 右侧：二级分类 -->
      <scroll-view
        class="secondary"
        scroll-y
        v-for="(itemtop, index) in categoryTopItemList"
        :key="itemtop.id"
        v-show="categoryTopItemIndex === index"
      >
        <!-- 轮播图 -->
        <YlSwiper class="banner" :bannerList="bannerList" />
        <!-- 内容区域 -->
        <view class="panel" v-for="itemchildren in itemtop.children" :key="itemchildren.id">
          <!-- 二级分类名称 -->
          <view class="title">
            <text class="name">{{ itemchildren.name }}</text>
            <navigator class="more" hover-class="none">全部</navigator>
          </view>
          <!-- 三级分类 -->
          <view class="section">
            <navigator
              v-for="goods in itemchildren.goods"
              :key="goods.id"
              class="goods"
              hover-class="none"
              :url="`/pages/goods/goods?id=${goods.id}`"
            >
              <!-- 图片 -->
              <image class="image" :src="goods.picture"></image>
              <!-- 名称 -->
              <view class="name ellipsis">{{ goods.name }}</view>
              <!-- 价格 -->
              <view class="price">
                <text class="symbol">¥</text>
                <text class="number">{{ goods.price }}</text>
              </view>
            </navigator>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}
.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.search {
  padding: 0 30rpx 20rpx;
  background-color: #fff;
  .input {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    height: 64rpx;
    padding-left: 26rpx;
    color: #8b8b8b;
    font-size: 28rpx;
    border-radius: 32rpx;
    background-color: #f3f4f4;
  }
}
.icon-search {
  &::before {
    margin-right: 10rpx;
  }
}
/* 分类 */
.categories {
  flex: 1;
  // 必须至少指明任意最低高度
  min-height: 400rpx;
  display: flex;
}
/* 一级分类 */
.primary {
  // overflow: hidden;
  width: 180rpx;
  flex: none;
  background-color: #f6f6f6;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 96rpx;
    font-size: 26rpx;
    color: #595c63;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: 42rpx;
      bottom: 0;
      width: 96rpx;
      border-top: 1rpx solid #e3e4e7;
    }
  }
  .active {
    background-color: #fff;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 8rpx;
      height: 100%;
      background-color: #27ba9b;
    }
  }
}
.primary .item:last-child::after,
.primary .active::after {
  display: none;
}
/* 二级分类 */
.secondary {
  background-color: #fff;
  // 轮播图(子组件的节点)
  .carousel {
    height: 200rpx;
    margin: 0 30rpx 20rpx;
    border-radius: 4rpx;
    overflow: hidden;
  }
  // 轮播图(当前组件的节点(影响子组件大小))
  .banner {
    height: 230rpx;
  }
  .panel {
    margin: 0 30rpx 0rpx;
  }
  .title {
    height: 60rpx;
    line-height: 60rpx;
    color: #333;
    font-size: 28rpx;
    border-bottom: 1rpx solid #f7f7f8;
    .more {
      float: right;
      padding-left: 20rpx;
      font-size: 24rpx;
      color: #999;
    }
  }
  .more {
    &::after {
      font-family: 'erabbit' !important;
      content: '\e6c2';
    }
  }
  .section {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 20rpx 0;
    .goods {
      width: 150rpx;
      margin: 0rpx 30rpx 20rpx 0;
      &:nth-child(3n) {
        margin-right: 0;
      }
      image {
        width: 150rpx;
        height: 150rpx;
      }
      .name {
        padding: 5rpx;
        font-size: 22rpx;
        color: #333;
      }
      .price {
        padding: 5rpx;
        font-size: 18rpx;
        color: #cf4444;
      }
      .number {
        font-size: 24rpx;
        margin-left: 2rpx;
      }
    }
  }
}
</style>
