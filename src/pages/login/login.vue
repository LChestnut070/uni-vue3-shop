<script setup lang="ts">
import { reqLogin, reqLoginSimple } from '@/services/login'
import { useMemberStore } from '@/stores'
import type { LoginResult } from '@/types/member'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 生命周期函数
onLoad(async () => {
  // #ifdef MP-WEIXIN
  const res = await wx.login()
  code = res.code
  // #endif
})

// 获取手机号进行登录(需要企业appid)
let code = ''
const onGetphonenumber: UniHelper.ButtonOnGetphonenumber = async (ev) => {
  const encryptedData = ev.detail.encryptedData!
  const iv = ev.detail.iv!
  await reqLogin({ code, iv, encryptedData })
    .then((res) => {
      console.log('success', res)
      setUserInfo(res.result)
    })
    .catch((err) => {
      console.log('err', err)
    })
}

// 模拟快捷登录
const onGetphonenumberSimple = async () => {
  const res = await reqLoginSimple('18771821111')
  setUserInfo(res.result)
}

// 登录成功
const setUserInfo = (profile: LoginResult) => {
  // 保存用户信息
  const memberStore = useMemberStore()
  memberStore.setProfile(profile)
  // 轻提示
  uni.showToast({
    icon: 'success',
    title: '登录成功!',
  })
  // 页面跳转
  setTimeout(() => {
    // uni.switchTab({ url: '/pages/my/my' })
    uni.navigateBack()
  }, 1000)
}
</script>

<template>
  <view class="viewport">
    <!-- LOGO -->
    <view class="logo">
      <image
        src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/logo_icon.png"
      ></image>
    </view>
    <!-- 登录 -->
    <view class="login">
      <!-- 网页端 -->
      <!-- #ifdef H5 -->
      <input placeholder="请输入用户名/手机号码" class="input" type="text" />
      <input placeholder="请输入密码" class="input" type="text" password />
      <button class="button phone">登录</button>
      <!-- #endif -->
      <!-- 手机号快捷登录 -->
      <!-- #ifdef MP-WEIXIN -->
      <button class="button phone" open-type="getPhoneNumber" @getphonenumber="onGetphonenumber">
        <text class="icon icon-phone"></text>
        手机号快捷登录
      </button>
      <!-- #endif -->

      <!-- 模拟快捷登录 -->
      <view class="extra">
        <view class="caption">
          <text>其他登录方式</text>
        </view>
        <view class="options">
          <button @tap="onGetphonenumberSimple">
            <text class="icon icon-phone">模拟快捷登录</text>
          </button>
        </view>
      </view>
      <view class="tips">登录/注册即视为你同意《服务条款》和《小兔鲜儿隐私协议》</view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx 40rpx;
}

.logo {
  flex: 1;
  text-align: center;
  image {
    width: 220rpx;
    height: 220rpx;
    margin-top: 15vh;
  }
}

.login {
  display: flex;
  flex-direction: column;
  height: 60vh;
  padding: 40rpx 20rpx 20rpx;

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    color: #fff;
    .icon {
      font-size: 40rpx;
      margin-right: 6rpx;
    }
  }

  .phone {
    background-color: #28bb9c;
  }

  // .wechat {
  //   background-color: #06c05f;
  // }

  .extra {
    flex: 1;
    padding: 70rpx 70rpx 0;
    .caption {
      width: 440rpx;
      line-height: 1;
      border-top: 1rpx solid #ddd;
      font-size: 26rpx;
      color: #999;
      position: relative;
      text {
        transform: translate(-40%);
        background-color: #fff;
        position: absolute;
        top: -14rpx;
        left: 50%;
      }
    }

    .options {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 70rpx;
      button {
        padding: 0;
        background-color: transparent;
      }
    }

    .icon {
      font-size: 24rpx;
      color: #444;
      display: flex;
      flex-direction: column;
      align-items: center;

      &::before {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 6rpx;
        font-size: 40rpx;
        border: 1rpx solid #444;
        border-radius: 50%;
      }
    }
    // .icon-weixin::before {
    //   border-color: #06c05f;
    //   color: #06c05f;
    // }
  }
}

.tips {
  position: absolute;
  bottom: 80rpx;
  left: 20rpx;
  right: 20rpx;
  font-size: 22rpx;
  color: #999;
  text-align: center;
}
</style>
