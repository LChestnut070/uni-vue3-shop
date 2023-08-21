import type { ProfileDetail, ProfileParams } from '@/types/member'
import { http } from '@/utils/http'

// 获取会员信息
export const reqGetMemberProfile = () => {
  return http<ProfileDetail>({
    url: '/member/profile',
    method: 'GET',
  })
}

// 修改会员信息
export const reqPutMemberProfile = (data: ProfileParams) => {
  return http<ProfileDetail>({
    url: '/member/profile',
    method: 'PUT',
    data,
  })
}
