import type { GoodsResult } from '@/types/goods'
import { http } from '@/utils/http'
// 获取商品详细信息
export const reqGetGoodsInfo = (id: number) => {
  return http<GoodsResult>({
    url: '/goods',
    method: 'GET',
    data: {
      id,
    },
  })
}
