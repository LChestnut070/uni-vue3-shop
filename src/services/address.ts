import type { AddressItem, AddressParams } from '@/types/address'
import { http } from '@/utils/http'

// 获取个人地址列表
export const reqGetAddressList = () => {
  return http<AddressItem[]>({
    url: '/member/address',
    method: 'GET',
  })
}
// 新增地址
export const reqAddAddress = (data: AddressParams) => {
  return http({
    url: '/member/address',
    method: 'POST',
    data,
  })
}
// 获取收货地址详情
export const reqGetAddressInfoById = (id: string) => {
  return http<AddressItem>({
    url: `/member/address/${id}`,
    method: 'GET',
  })
}
// 修改地址
export const reqUpdateAddress = (id: string, data: AddressParams) => {
  return http({
    url: `/member/address/${id}`,
    method: 'PUT',
    data,
  })
}
// 删除地址
export const reqDeleteAddressById = (id: string) => {
  return http({
    method: 'DELETE',
    url: `/member/address/${id}`,
  })
}
