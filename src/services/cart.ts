import { http } from '@/utils/http'

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
