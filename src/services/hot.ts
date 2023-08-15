import type { PageParams } from '@/types/global'
import type { HotResult } from '@/types/hot'
import { http } from '@/utils/http'

// 热门推荐请求参数
type HotParams = PageParams & {
  subType?: string
}
// 获取热门推荐列表
export const reqGetHotRecommendList = (url: string, data?: HotParams) => {
  return http<HotResult>({
    url,
    method: 'GET',
    data,
  })
}
