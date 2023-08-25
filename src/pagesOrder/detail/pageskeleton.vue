<template name="skeleton">
  <view class="sk-container">
    <view class="navbar" style="padding-top: 54px">
      <view class="wrap">
        <navigator
          class="back icon-left sk-pseudo sk-pseudo-circle"
          open-type="navigateBack"
        ></navigator>
        <view class="title sk-transparent sk-text-14-2857-227 sk-text">订单详情</view>
      </view>
    </view>
    <scroll-view :enable-back-to-top="true" :scroll-y="true" class="viewport" id="scroller">
      <view class="overview sk-image" style="padding-top: 74px">
        <view
          class="status icon-clock sk-transparent sk-text-0-0000-436 sk-text sk-pseudo sk-pseudo-circle"
          >等待付款</view
        >
        <view class="tips sk-transparent">
          <text class="money sk-transparent sk-text-0-0000-479 sk-text">应付金额: ¥ 99.00</text>
          <text class="time sk-transparent sk-text-0-0000-564 sk-text">支付剩余</text> 00 时 29 分
          59 秒
        </view>
        <view
          class="button sk-transparent sk-text-27-7778-225 sk-text"
          style="background-position-x: 50%"
          >去支付</view
        >
      </view>
      <view class="shipment">
        <view class="item sk-image">
          <view class="message sk-transparent sk-text-14-2857-930 sk-text">
            您已在广州市天河区黑马程序员完成取件，感谢使用菜鸟驿站，期待再次为您服务。
          </view>
          <view class="date sk-transparent sk-text-14-2857-818 sk-text"> 2023-04-14 13:14:20 </view>
        </view>
        <view class="locate sk-image">
          <view class="user sk-transparent sk-text-14-2857-971 sk-text"> 张三 13333333333 </view>
          <view class="address sk-transparent sk-text-14-2857-497 sk-text">
            广东省 广州市 天河区 黑马程序员
          </view>
        </view>
      </view>
      <view class="goods">
        <view class="item">
          <navigator class="navigator" hover-class="none">
            <image class="cover sk-image"></image>
            <view class="meta">
              <view class="name ellipsis sk-transparent sk-text-14-2857-170 sk-text"
                >ins风小碎花泡泡袖衬110-160cm</view
              >
              <view class="type sk-transparent sk-text-22-2222-633 sk-text">藏青小花， 130</view>
              <view class="price">
                <view class="actual">
                  <text class="symbol sk-transparent sk-opacity">¥</text>
                  <text class="sk-transparent sk-text-14-2857-358 sk-text">99.00</text>
                </view>
              </view>
              <view class="quantity sk-transparent sk-text-14-2857-799 sk-text">x1</view>
            </view>
          </navigator>
          <navigator class="navigator" hover-class="none">
            <image class="cover sk-image"></image>
            <view class="meta">
              <view class="name ellipsis sk-transparent sk-text-14-2857-489 sk-text"
                >ins风小碎花泡泡袖衬110-160cm</view
              >
              <view class="type sk-transparent sk-text-22-2222-843 sk-text">藏青小花， 130</view>
              <view class="price">
                <view class="actual">
                  <text class="symbol sk-transparent sk-opacity">¥</text>
                  <text class="sk-transparent sk-text-14-2857-320 sk-text">99.00</text>
                </view>
              </view>
              <view class="quantity sk-transparent sk-text-14-2857-6 sk-text">x1</view>
            </view>
          </navigator>
          <view class="action">
            <view
              class="button primary sk-transparent sk-text-29-4118-84 sk-text"
              style="background-position-x: 50%"
              >申请售后</view
            >
            <navigator
              class="button sk-transparent sk-text-29-4118-374 sk-text"
              style="background-position-x: 50%"
            >
              去评价
            </navigator>
          </view>
        </view>
        <view class="total">
          <view class="row">
            <view class="text sk-transparent sk-text-0-0000-190 sk-text">商品总价: </view>
            <view class="symbol sk-transparent sk-text-0-0000-73 sk-text sk-pseudo sk-pseudo-circle"
              >99.00</view
            >
          </view>
          <view class="row">
            <view class="text sk-transparent sk-text-0-0000-656 sk-text">运费: </view>
            <view
              class="symbol sk-transparent sk-text-0-0000-863 sk-text sk-pseudo sk-pseudo-circle"
              >10.00</view
            >
          </view>
          <view class="row">
            <view class="text sk-transparent sk-text-0-0000-824 sk-text">应付金额: </view>
            <view
              class="symbol primary sk-transparent sk-text-0-0000-179 sk-text sk-pseudo sk-pseudo-circle"
              >109.00</view
            >
          </view>
        </view>
      </view>
      <view class="detail">
        <view class="title sk-transparent sk-text-0-0000-152 sk-text">订单信息</view>
        <view class="row">
          <view class="item sk-transparent">
            订单编号: 1694538527133405186
            <text class="copy sk-transparent sk-text-0-0000-941 sk-text">复制</text>
          </view>
          <view class="item sk-transparent sk-text-0-0000-220 sk-text"
            >下单时间: 2023-04-14 13:14:20</view
          >
        </view>
      </view>
      <xtx-guess class="r"></xtx-guess>
      <view class="toolbar-height" style="padding-bottom: 34px"></view>
      <view class="toolbar" style="padding-bottom: 34px">
        <view class="button primary sk-transparent sk-text-14-2857-400 sk-text"> 去支付 </view>
        <view class="button sk-transparent sk-text-14-2857-52 sk-text"> 取消订单 </view>
      </view>
    </scroll-view>
  </view>
</template>
<style>
.sk-transparent {
  color: transparent !important;
}
.sk-text-14-2857-227 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 43.9535rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-0-0000-436 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 34.8837rpx;
  position: relative !important;
}
.sk-text-0-0000-479 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 24.4186rpx;
  position: relative !important;
}
.sk-text-0-0000-564 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 24.4186rpx;
  position: relative !important;
}
.sk-text-27-7778-225 {
  background-image: linear-gradient(
    transparent 27.7778%,
    #eeeeee 0%,
    #eeeeee 72.2222%,
    transparent 0%
  ) !important;
  background-size: 100% 62.7907rpx;
  position: relative !important;
}
.sk-text-14-2857-930 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-818 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-971 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-497 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-170 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-22-2222-633 {
  background-image: linear-gradient(
    transparent 22.2222%,
    #eeeeee 0%,
    #eeeeee 77.7778%,
    transparent 0%
  ) !important;
  background-size: 100% 40.814rpx;
  position: relative !important;
}
.sk-opacity {
  opacity: 0 !important;
}
.sk-text-14-2857-358 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-799 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: absolute !important;
}
.sk-text-14-2857-489 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-22-2222-843 {
  background-image: linear-gradient(
    transparent 22.2222%,
    #eeeeee 0%,
    #eeeeee 77.7778%,
    transparent 0%
  ) !important;
  background-size: 100% 40.814rpx;
  position: relative !important;
}
.sk-text-14-2857-320 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-6 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: absolute !important;
}
.sk-text-29-4118-84 {
  background-image: linear-gradient(
    transparent 29.4118%,
    #eeeeee 0%,
    #eeeeee 70.5882%,
    transparent 0%
  ) !important;
  background-size: 100% 59.3023rpx;
  position: relative !important;
}
.sk-text-29-4118-374 {
  background-image: linear-gradient(
    transparent 29.4118%,
    #eeeeee 0%,
    #eeeeee 70.5882%,
    transparent 0%
  ) !important;
  background-size: 100% 59.3023rpx;
  position: relative !important;
}
.sk-text-0-0000-190 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 24.4186rpx;
  position: relative !important;
}
.sk-text-0-0000-73 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 24.4186rpx;
  position: relative !important;
}
.sk-text-0-0000-656 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 24.4186rpx;
  position: relative !important;
}
.sk-text-0-0000-863 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 24.4186rpx;
  position: relative !important;
}
.sk-text-0-0000-824 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 24.4186rpx;
  position: relative !important;
}
.sk-text-0-0000-179 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 34.8837rpx;
  position: relative !important;
}
.sk-text-0-0000-152 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 29.6512rpx;
  position: relative !important;
}
.sk-text-0-0000-941 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 19.186rpx;
  position: relative !important;
}
.sk-text-0-0000-220 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 24.4186rpx;
  position: relative !important;
}
.sk-text-14-2857-400 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-52 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-image {
  background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
