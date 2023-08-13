<script setup lang="ts">
import CustomNavbar from '@/pages/index/components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import { reqGetCategoryPanelList, reqGetHomeBannerList, reqGetHotList } from '@/services/home'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 轮播图列表
const bannerList = ref<BannerItem[]>([])
// 分类列表
const categoryList = ref<CategoryItem[]>([])
// 热门列表
const hotList = ref<HotItem[]>([])

// 生命周期函数
onLoad(() => {
  getHomeBannerList(), getCategoryList(), getHotList()
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
</script>

<template>
  <view>
    <!-- 导航栏 -->
    <CustomNavbar />
    <!-- 轮播图 -->
    <YlSwiper :bannerList="bannerList" />
    <!-- 分类导航栏 -->
    <CategoryPanel :categoryList="categoryList" />
    <!-- 热门 -->
    <HotPanel :hotList="hotList" />
    <!-- 猜你喜欢 -->
    <YlGuess />
  </view>
</template>

<style lang="scss" scoped>
page {
  background-color: #f7f7f7;
}
</style>
