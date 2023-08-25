import type { CartItem } from '@/types/cart'
import { http } from '@/utils/http'

// 加入购物车
export const reqAddToCart = (skuId: string, count: number) => {
  return http({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count,
    },
  })
}

// 获取购物车列表
export const reqGetCartList = () => {
  return http<CartItem[]>({
    url: '/member/cart',
    method: 'GET',
  })
}

// 删除购物车商品
export const reqDeleteSku = (data: { ids: string[] }) => {
  return http({
    method: 'DELETE',
    url: '/member/cart',
    data,
  })
}
// 修改购买数量、选中状态
export const reqUpdateSku = (skuId: string, data: { selected?: boolean; count?: number }) => {
  return http({
    method: 'PUT',
    url: `/member/cart/${skuId}`,
    data,
  })
}
// 修改全选状态
export const reqUpdateAllSkuStatus = (data: { selected: boolean }) => {
  return http({
    method: 'PUT',
    url: '/member/cart/selected',
    data,
  })
}
