import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { http } from '@/utils/http'

// 获取首页轮播图
export const reqGetHomeBannerList = (distributionSite = 1) => {
  return http<BannerItem[]>({
    url: '/home/banner',
    method: 'GET',
    data: {
      distributionSite,
    },
  })
}

// 获取分类面板
export const reqGetCategoryPanelList = () => {
  return http<CategoryItem[]>({
    url: '/home/category/mutli',
    method: 'GET',
  })
}

// 获取热门推荐
export const reqGetHotList = () => {
  return http<HotItem[]>({
    url: '/home/hot/mutli',
    method: 'GET',
  })
}
