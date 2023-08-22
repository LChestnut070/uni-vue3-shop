// src/pages/goods/goods.vue
<script setup lang="ts">
import type {
  SkuPopupEvent,
  SkuPopupInstanceType,
  SkuPopupLocaldata,
} from '@/components/vk-data-goods-sku-popup/vk-data-goods-sku-popup'
import AddressPanel from '@/pages/goods/components/AddressPanel.vue'
import ServicePanel from '@/pages/goods/components/ServicePanel.vue'
import { reqAddToCart } from '@/services/cart'
import { reqGetGoodsInfo } from '@/services/goods'
import type { GoodsResult } from '@/types/goods'
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'

// 商品id
const query = defineProps<{
  id: number
}>()
// 屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 生命周期函数
onLoad(() => {
  getGoodsInfo()
})

/* 获取商品详细信息 */
const goodsinfo = ref<GoodsResult>()
// 商品信息
const localdata = ref({} as SkuPopupLocaldata)
const getGoodsInfo = async () => {
  // 发请求
  const res = await reqGetGoodsInfo(query.id)
  goodsinfo.value = res.result
  // 为组件赋值数据
  localdata.value = {
    _id: res.result.id,
    name: res.result.name,
    goods_thumb: res.result.mainPictures[0],
    spec_list: res.result.specs.map((item) => {
      return {
        name: item.name,
        list: item.values,
      }
    }),
    sku_list: res.result.skus.map((item) => {
      return {
        _id: item.id,
        goods_id: res.result.id,
        goods_name: res.result.name,
        image: item.picture,
        price: item.price * 100,
        stock: item.inventory,
        sku_name_arr: item.specs.map((vv) => vv.valueName),
      }
    }),
  }
}

// 轮播图变换
const bannerIndex = ref<number>(0)
const onchange: UniHelper.SwiperOnChange = (event) => {
  bannerIndex.value = event.detail.current
}

// 查看轮播图
const previewImg = (url: string) => {
  uni.previewImage({
    current: url,
    urls: goodsinfo.value!.mainPictures,
  })
}

// 打开弹出层
const popupRef = ref<{
  open: (type?: UniHelper.UniPopupType) => void
  close: () => void
}>()
/* 控制弹出层的模式 */
const popupName = ref<'Address' | 'Service'>()
const openPopup = (model: typeof popupName.value) => {
  popupName.value = model
  popupRef.value?.open('bottom')
}

// 关闭弹出层
const closePopup = () => {
  popupRef.value?.close()
}

/* 打开SKU组件 */
// 控制SKU组件的显示与隐藏
const isShowSku = ref(false)
// 按钮模式类型
enum SkuMode {
  Both = 1,
  Cart = 2,
  Buy = 3,
}
// 按钮模式
const mode = ref<SkuMode>(SkuMode.Cart)
const onOpenSkuPopup = (value: SkuMode) => {
  isShowSku.value = true
  mode.value = value
}

// sku组件实例
const skuPopupRef = ref<SkuPopupInstanceType>()
// 计算被选中的值
const selectArrText = computed(() => {
  // selectArr的值为字符串类型数组
  return skuPopupRef.value?.selectArr?.join(' ').trim() || '请选择商品规格'
})

// 加入购物车
const onAddCart = async (e: SkuPopupEvent) => {
  await reqAddToCart(e._id, e.buy_num)
  uni.showToast({
    icon: 'success',
    title: '添加购物车成功',
  })
  isShowSku.value = false
}
</script>

<template>
  <scroll-view scroll-y class="viewport">
    <!-- 基本信息 -->
    <view class="goods">
      <!-- 商品主图 -->
      <view class="preview">
        <swiper circular @change="onchange">
          <swiper-item v-for="(item, index) in goodsinfo?.mainPictures" :key="index">
            <image mode="aspectFill" :src="item" @tap="previewImg(item)" />
          </swiper-item>
        </swiper>
        <!-- 图片序号 -->
        <view class="indicator">
          <text class="current">{{ bannerIndex + 1 }}</text>
          <text class="split">/</text>
          <text class="total">{{ goodsinfo?.mainPictures.length }}</text>
        </view>
      </view>

      <!-- 商品简介 -->
      <view class="meta">
        <!-- 商品价格 -->
        <view class="price">
          <text class="symbol">¥</text>
          <text class="number">{{ goodsinfo?.price }}</text>
        </view>
        <!-- 商品名称 -->
        <view class="name ellipsis">{{ goodsinfo?.name }} </view>
        <!-- 商品简介 -->
        <view class="desc"> {{ goodsinfo?.desc }} </view>
      </view>

      <!-- 操作面板 -->
      <view class="action">
        <view class="item arrow" @tap="onOpenSkuPopup(SkuMode.Both)">
          <text class="label">选择</text>
          <text class="text ellipsis"> {{ selectArrText }} </text>
        </view>
        <view class="item arrow" @tap="openPopup('Address')">
          <text class="label">送至</text>
          <text class="text ellipsis"> 请选择收获地址 </text>
        </view>
        <view class="item arrow" @tap="openPopup('Service')">
          <text class="label">服务</text>
          <text class="text ellipsis"> 无忧退 快速退款 免费包邮 </text>
        </view>
      </view>
    </view>

    <!-- 商品详情 -->
    <view class="detail panel">
      <view class="title">
        <text>详情</text>
      </view>
      <view class="content">
        <view class="properties">
          <!-- 属性详情 -->
          <view class="item" v-for="item in goodsinfo?.details.properties" :key="item.name">
            <!-- 属性名 -->
            <text class="label">{{ item.name }}</text>
            <!-- 属性值 -->
            <text class="value">{{ item.value }}</text>
          </view>
        </view>
        <!-- 图片详情 -->
        <image
          v-for="(item, index) in goodsinfo?.details.pictures"
          :key="index"
          mode="widthFix"
          :src="item"
        ></image>
      </view>
    </view>

    <!-- 同类推荐 -->
    <view class="similar panel">
      <view class="title">
        <text>同类推荐</text>
      </view>
      <view class="content">
        <navigator
          v-for="item in goodsinfo?.similarProducts"
          :key="item.id"
          class="goods"
          hover-class="none"
          :url="`/pages/goods/goods?id=${item.id}`"
        >
          <!-- 图片 -->
          <image class="image" mode="aspectFill" :src="item.picture"></image>
          <!-- 商品名称 -->
          <view class="name ellipsis">{{ item.name }}</view>
          <!--  -->
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ item.price }}</text>
          </view>
        </navigator>
      </view>
    </view>
  </scroll-view>

  <!-- 用户操作 -->
  <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
    <view class="icons">
      <!-- 收藏 -->
      <button class="icons-button"><text class="icon-heart"></text>收藏</button>
      <!-- 客服 -->
      <button class="icons-button" open-type="contact">
        <text class="icon-handset"></text>客服
      </button>
      <!-- 购物车 -->
      <navigator class="icons-button" url="/pages/cart/cart" open-type="switchTab">
        <text class="icon-cart"></text>购物车
      </navigator>
    </view>
    <view class="buttons">
      <view class="addcart" @tap="onOpenSkuPopup(SkuMode.Cart)"> 加入购物车 </view>
      <view class="buynow" @tap="onOpenSkuPopup(SkuMode.Buy)"> 立即购买 </view>
    </view>
  </view>

  <!-- 弹出层 -->
  <uni-popup ref="popupRef" type="bottom" background-color="#fff">
    <AddressPanel v-if="popupName === 'Address'" @closePopup="closePopup"></AddressPanel>
    <ServicePanel v-else @closePopup="closePopup"></ServicePanel>
  </uni-popup>

  <!-- sku弹窗组件 -->
  <vk-data-goods-sku-popup
    v-model="isShowSku"
    :localdata="localdata"
    :mode="mode"
    add-cart-background-color="#FFA868"
    buy-now-background-color="#27BA9B"
    ref="skuPopupRef"
    :actived-style="{
      color: '#27BA9B',
      borderColor: '#27BA9B',
      backgroundColor: '#E9F8F5',
    }"
    @add-cart="onAddCart"
  ></vk-data-goods-sku-popup>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.viewport {
  background-color: #f4f4f4;
}

.panel {
  margin-top: 20rpx;
  background-color: #fff;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90rpx;
    line-height: 1;
    padding: 30rpx 60rpx 30rpx 6rpx;
    position: relative;
    text {
      padding-left: 10rpx;
      font-size: 28rpx;
      color: #333;
      font-weight: 600;
      border-left: 4rpx solid #27ba9b;
    }
    navigator {
      font-size: 24rpx;
      color: #666;
    }
  }
}

/* 商品信息 */
.goods {
  background-color: #fff;
  .preview {
    height: 750rpx;
    position: relative;
    .indicator {
      height: 40rpx;
      padding: 0 24rpx;
      line-height: 40rpx;
      border-radius: 30rpx;
      color: #fff;
      font-family: Arial, Helvetica, sans-serif;
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      bottom: 30rpx;
      right: 30rpx;
      .current {
        font-size: 26rpx;
      }
      .split {
        font-size: 24rpx;
        margin: 0 1rpx 0 2rpx;
      }
      .total {
        font-size: 24rpx;
      }
    }
  }
  .meta {
    position: relative;
    border-bottom: 1rpx solid #eaeaea;
    .price {
      height: 130rpx;
      padding: 25rpx 30rpx 0;
      color: #fff;
      font-size: 34rpx;
      box-sizing: border-box;
      background-color: #35c8a9;
    }
    .number {
      font-size: 56rpx;
    }
    .brand {
      width: 160rpx;
      height: 80rpx;
      overflow: hidden;
      position: absolute;
      top: 26rpx;
      right: 30rpx;
    }
    .name {
      max-height: 88rpx;
      line-height: 1.4;
      margin: 20rpx;
      font-size: 32rpx;
      color: #333;
    }
    .desc {
      line-height: 1;
      padding: 0 20rpx 30rpx;
      font-size: 24rpx;
      color: #cf4444;
    }
  }
  .action {
    padding-left: 20rpx;
    .arrow {
      &::after {
        position: absolute;
        top: 50%;
        right: 30rpx;
        content: '\e6c2';
        color: #ccc;
        font-family: 'erabbit' !important;
        font-size: 32rpx;
        transform: translateY(-50%);
      }
    }
    .item {
      height: 90rpx;
      padding-right: 60rpx;
      border-bottom: 1rpx solid #eaeaea;
      font-size: 26rpx;
      color: #333;
      position: relative;
      display: flex;
      align-items: center;
      &:last-child {
        border-bottom: 0 none;
      }
    }
    .label {
      width: 60rpx;
      color: #898b94;
      margin: 0 16rpx 0 10rpx;
    }
    .text {
      flex: 1;
      -webkit-line-clamp: 1;
    }
  }
}

/* 商品详情 */
.detail {
  padding-left: 20rpx;
  .content {
    margin-left: -20rpx;
  }
  .properties {
    padding: 0 20rpx;
    margin-bottom: 30rpx;
    .item {
      display: flex;
      line-height: 2;
      padding: 10rpx;
      font-size: 26rpx;
      color: #333;
      border-bottom: 1rpx dashed #ccc;
    }
    .label {
      width: 200rpx;
    }
    .value {
      flex: 1;
    }
  }
}

/* 同类推荐 */
.similar {
  padding-left: 20rpx;
  .content {
    padding: 0 20rpx 20rpx;
    margin-left: -20rpx;
    background-color: #f4f4f4;
    overflow: hidden;
    navigator {
      width: 345rpx;
      padding: 24rpx 20rpx 20rpx;
      margin: 20rpx 20rpx 0 0;
      border-radius: 10rpx;
      background-color: #fff;
      float: left;
    }
    .image {
      height: 260rpx;
    }
    .name {
      height: 80rpx;
      margin: 10rpx 0;
      font-size: 26rpx;
      color: #262626;
    }
    .price {
      line-height: 1;
      font-size: 20rpx;
      color: #cf4444;
    }
    .number {
      font-size: 26rpx;
      margin-left: 2rpx;
    }
  }
  navigator {
    &:nth-child(even) {
      margin-right: 0;
    }
  }
}

/* 底部工具栏 */
.toolbar {
  background-color: #fff;
  height: 100rpx;
  padding: 0 20rpx;
  border-top: 1rpx solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;
  .buttons {
    display: flex;
    & > view {
      width: 220rpx;
      text-align: center;
      line-height: 72rpx;
      font-size: 26rpx;
      color: #fff;
      border-radius: 72rpx;
    }
    .addcart {
      background-color: #ffa868;
    }
    .buynow {
      background-color: #27ba9b;
      margin-left: 20rpx;
    }
  }
  .icons {
    padding-right: 10rpx;
    display: flex;
    align-items: center;
    flex: 1;
    .icons-button {
      flex: 1;
      text-align: center;
      line-height: 1.4;
      padding: 0;
      margin: 0;
      border-radius: 0;
      font-size: 20rpx;
      color: #333;
      background-color: #fff;
    }
    text {
      display: block;
      font-size: 34rpx;
    }
  }
}
</style>
