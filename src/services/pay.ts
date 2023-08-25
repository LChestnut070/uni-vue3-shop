import { http } from '@/utils/http'
// 去支付
export const reqGetWxPayMiniPay = (data: { orderId: string }) => {
  return http<WechatMiniprogram.RequestPaymentOption>({
    method: 'GET',
    url: '/pay/wxPay/miniPay',
    data,
  })
}
// 模拟支付
export const reqGetPayMock = (data: { orderId: string }) => {
  return http({
    method: 'GET',
    url: '/pay/mock',
    data,
  })
}
