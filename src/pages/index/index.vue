<script setup lang="ts">
import CustomNavbar from '@/pages/index/components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import Pageskeleton from '@/pages/index/components/Pageskeleton.vue'
import { reqGetCategoryPanelList, reqGetHomeBannerList, reqGetHotList } from '@/services/home'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import type { YlGuessInstance } from '@/components/components'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 轮播图列表
const bannerList = ref<BannerItem[]>([])
// 分类列表
const categoryList = ref<CategoryItem[]>([])
// 热门列表
const hotList = ref<HotItem[]>([])
// 猜你喜欢ref实例
const guessRef = ref<YlGuessInstance>()
// 下拉刷新的状态
const refreshStatus = ref<boolean>(false)
// 骨架屏显示状态
const skeletonStatus = ref<boolean>(true)

// 生命周期函数
onLoad(async () => {
  // 开启骨架屏
  skeletonStatus.value = true
  await Promise.all([getHomeBannerList(), getCategoryList(), getHotList()])
  // 关闭骨架屏
  skeletonStatus.value = false
})

// 获取轮播图
const getHomeBannerList = async () => {
  const res = await reqGetHomeBannerList()
  bannerList.value = res.result
}
// 获取分类导航
const getCategoryList = async () => {
  const res = await reqGetCategoryPanelList()
  categoryList.value = res.result
}
// 获取热门列表
const getHotList = async () => {
  const res = await reqGetHotList()
  hotList.value = res.result
}
// 页面触底触发的事件
const onScrolltolower = () => {
  guessRef.value?.getMore()
}
// 页面下拉刷新
const onRefresherrefresh = async () => {
  // 开启加载动画
  refreshStatus.value = true
  // 清除数据
  guessRef.value?.resetData()
  // Promise.all可以同时执行多个异步请求
  await Promise.all([
    getHomeBannerList(),
    getCategoryList(),
    getHotList(),
    guessRef.value?.getMore(),
  ])
  // uni.stopPullDownRefresh()只能当页面下拉刷新时才有用,scroll-view调用没有用
  refreshStatus.value = false
}
</script>

<template>
  <!-- 导航栏 -->
  <CustomNavbar />

  <scroll-view
    scroll-y
    lower-threshold="300"
    refresher-enabled
    :refresher-triggered="refreshStatus"
    class="scroll-views"
    @scrolltolower="onScrolltolower"
    @refresherrefresh="onRefresherrefresh"
  >
    <Pageskeleton v-if="skeletonStatus"></Pageskeleton>
    <template v-else>
      <!-- 轮播图 -->
      <YlSwiper :bannerList="bannerList" />
      <!-- 分类导航栏 -->
      <CategoryPanel :categoryList="categoryList" />
      <!-- 热门 -->
      <HotPanel :hotList="hotList" />
      <!-- 猜你喜欢 -->
      <YlGuess ref="guessRef" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
// page页面设置不可以scoped,否则不生效
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll-views {
  flex: 1;
}
</style>
