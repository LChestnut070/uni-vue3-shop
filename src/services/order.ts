import type {
  OrderCreateParams,
  OrderCreateResult,
  OrderListParams,
  OrderListResult,
  OrderLogisticResult,
  OrderPreResult,
  OrderResult,
} from '@/types/order'
import { http } from '@/utils/http'

// 购物车填写订单
export const reqGetOrderPreByCart = () => {
  return http<OrderPreResult>({
    url: '/member/order/pre',
    method: 'GET',
  })
}
// 商品详情页填写订单
export const reqGetOrderPreByGoods = (data: {
  skuId: string
  count: string
  addressId?: string
}) => {
  return http<OrderPreResult>({
    method: 'GET',
    url: '/member/order/pre/now',
    data,
  })
}
// 提交订单
export const reqSubmitOrder = (data: OrderCreateParams) => {
  return http<OrderCreateResult>({
    method: 'POST',
    url: '/member/order',
    data,
  })
}
// 获取订单详情
export const reqGetOrderById = (id: string) => {
  return http<OrderResult>({
    method: 'GET',
    url: `/member/order/${id}`,
  })
}
// 再次购买
export const reqGetOrderRepurchaseById = (id: string) => {
  return http<OrderPreResult>({
    method: 'GET',
    url: `/member/order/repurchase/${id}`,
  })
}
// 模拟发货
export const reqGetOrderConsignmentById = (id: string) => {
  return http({
    method: 'GET',
    url: `/member/order/consignment/${id}`,
  })
}
// 确认收货
export const reqOrderReceiptById = (id: string) => {
  return http<OrderResult>({
    method: 'PUT',
    url: `/member/order/${id}/receipt`,
  })
}
// 获取物流信息
export const reqGetOrderLogisticsById = (id: string) => {
  return http<OrderLogisticResult>({
    method: 'GET',
    url: `/member/order/${id}/logistics`,
  })
}
// 取消订单
export const reqGetOrderCancelById = (id: string, data: { cancelReason: string }) => {
  return http<OrderResult>({
    method: 'PUT',
    url: `/member/order/${id}/cancel`,
    data,
  })
}
// 删除订单
export const reqDeleteOrder = (data: { ids: string[] }) => {
  return http({
    method: 'DELETE',
    url: `/member/order`,
    data,
  })
}
// 获取订单列表
export const reqGetOrderList = (data: OrderListParams) => {
  return http<OrderListResult>({
    method: 'GET',
    url: `/member/order`,
    data,
  })
}
