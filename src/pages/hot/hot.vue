// /src/pages/hot/hot.vue
<script setup lang="ts">
import { reqGetHotRecommendList } from '@/services/hot'
import type { GoodsItem, PageResult } from '@/types/global'
import type { SubTypeItem } from '@/types/hot'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 热门推荐页标题和发请求的url
const hotMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
]
// 热门推荐类型
const query = defineProps<{
  type: string
}>()
// 热门推荐被选中的模块
const checkedHot = hotMap.find((item) => {
  return item.type === query.type
})
// 热门推荐背景图
const banner = ref<string>('')
// 热门推荐子项列表(finish用于控制数据是否完毕状态,loading用于控制加载数据的状态)
const subTypesList = ref<(SubTypeItem & { finish?: boolean; loading?: boolean })[]>([])
// 热门推荐被选中的子项
const checkedType = ref<number>(0)

// 生命周期函数
onLoad(() => {
  // 动态设置标题
  uni.setNavigationBarTitle({ title: checkedHot!.title })
  // 获取数据
  getHotRecommendList()
})

// 获取热门推荐列表
const getHotRecommendList = async () => {
  const res = await reqGetHotRecommendList(checkedHot!.url, {
    // 动态区分开发环境与测试环境
    page: import.meta.env ? 33 : 1,
    pageSize: 10,
  })
  // 背景图
  banner.value = res.result.bannerPicture
  // 子项列表
  subTypesList.value = res.result.subTypes
}

// 触底事件
const onScrolltolower = async () => {
  // 选中的商品列表
  const goodsByTypes = subTypesList.value[checkedType.value]
  // 手动添加节流(scroll-view设置触发事件高度后反复滑动会导致频繁调用此事件,目前没有找到官方解决方案)
  if (goodsByTypes.loading) {
    return
  } else {
    // 开启加载状态
    goodsByTypes.loading = true
    // 如果当前页超过总页数则退出
    if (goodsByTypes.goodsItems.page < goodsByTypes.goodsItems.pages) {
      // 需要先改变值再传值.不可边改边传
      goodsByTypes.goodsItems.page++
    } else {
      // 切换为全部加载完毕状态
      goodsByTypes.finish = true
      return uni.showToast({
        icon: 'none',
        title: '已经没有更多商品了哦',
      })
    }
    // 发请求
    await reqGetHotRecommendList(checkedHot!.url, {
      subType: goodsByTypes.id,
      page: goodsByTypes.goodsItems.page,
      pageSize: goodsByTypes.goodsItems.pageSize,
    })
      .then((res) => {
        // 定义追加的数组
        const newsubTypes = res.result.subTypes[checkedType.value]
        // 追加
        goodsByTypes.goodsItems.items.push(...newsubTypes.goodsItems.items)
        // 解除加载效果
        goodsByTypes.loading = false
      })
      .catch(() => {
        goodsByTypes.loading = false
      })
  }
}
</script>

<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image :src="banner"></image>
    </view>
    <!-- 推荐选项 -->
    <view class="tabs">
      <text
        class="text"
        :class="{ active: checkedType === typeIndex }"
        v-for="(subTypes, typeIndex) in subTypesList"
        :key="subTypes.id"
        @tap="checkedType = typeIndex"
        >{{ subTypes.title }}</text
      >
    </view>
    <!-- 推荐列表 -->
    <scroll-view
      scroll-y
      lower-threshold="300"
      class="scroll-view"
      v-for="(item, typeIndex) in subTypesList"
      :key="item.id"
      v-show="checkedType === typeIndex"
      @scrolltolower="onScrolltolower"
    >
      <view class="goods">
        <navigator
          hover-class="none"
          class="navigator"
          v-for="goods in item.goodsItems.items"
          :key="goods.id"
          :url="`/pages/goods/goods?id=${goods.id}`"
        >
          <image class="thumb" :src="goods.picture"></image>
          <view class="name ellipsis">{{ goods.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goods.price }}</text>
          </view>
        </navigator>
      </view>
      <!-- 底部状态 -->
      <view class="loading-text">{{ item.finish ? '已经没有更多商品了哦~' : '正在加载...' }}</view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}
.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}
.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}
.scroll-view {
  flex: 1;
}
.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  width: 95vw;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;
  .text {
    margin: 0 20rpx;
    position: relative;
  }
  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;
  .navigator {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }
  .thumb {
    width: 305rpx;
    height: 305rpx;
  }
  .name {
    height: 70rpx;
    font-size: 26rpx;
    margin: 14rpx 0;
    text-overflow: ellipsis;
  }
  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }
  .symbol {
    font-size: 70%;
  }
  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>
