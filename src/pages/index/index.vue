<script setup lang="ts">
import CustomNavbar from '@/pages/index/components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import Pageskeleton from '@/pages/index/components/Pageskeleton.vue'
import { reqGetCategoryPanelList, reqGetHomeBannerList, reqGetHotList } from '@/services/home'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { useGuessList } from '@/composables'

// 骨架屏显示状态
const skeletonStatus = ref<boolean>(true)
// 猜你喜欢组合式函数
const { guessRef, onScrolltolower } = useGuessList()

// 生命周期函数
onLoad(async () => {
  // 开启骨架屏
  skeletonStatus.value = true
  await Promise.all([getHomeBannerList(), getCategoryList(), getHotList()])
  // 关闭骨架屏
  skeletonStatus.value = false
})

// 获取轮播图
const bannerList = ref<BannerItem[]>([])
const getHomeBannerList = async () => {
  const res = await reqGetHomeBannerList(1)
  // 轮播图列表
  bannerList.value = res.result
}

// 获取分类导航
const categoryList = ref<CategoryItem[]>([])
const getCategoryList = async () => {
  const res = await reqGetCategoryPanelList()
  // 分类列表
  categoryList.value = res.result
}

// 获取热门列表
const hotList = ref<HotItem[]>([])
const getHotList = async () => {
  const res = await reqGetHotList()
  // 热门列表
  hotList.value = res.result
}

// 页面下拉刷新
const refreshStatus = ref<boolean>(false)
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
