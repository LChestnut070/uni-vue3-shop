import type { LoginResult } from '@/types/member'
import { http } from '@/utils/http'

// 登录请求参数类型
type LoginParams = {
  code: string
  encryptedData: string
  iv: string
}
// 登录
export const reqLogin = (data: LoginParams) => {
  return http<LoginResult>({
    url: '/login/wxMin',
    method: 'POST',
    data,
  })
}
// 模拟快捷登录
export const reqLoginSimple = (phoneNumber: string) => {
  return http<LoginResult>({
    url: '/login/wxMin/simple',
    method: 'POST',
    data: {
      phoneNumber,
    },
  })
}
