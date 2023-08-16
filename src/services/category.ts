import type { CategoryTopItem } from '@/types/category'
import { http } from '@/utils/http'
// 获取分类面板
export const reqGetCategoryList = () => {
  return http<CategoryTopItem[]>({
    url: '/category/top',
    method: 'GET',
  })
}
