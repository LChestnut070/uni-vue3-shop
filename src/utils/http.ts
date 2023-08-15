import { useMemberStore } from '@/stores'

const baseUrl = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 请求拦截器
const httpInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    // 非hhtp开头拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseUrl + options.url
    }
    // 请求超时时间
    options.timeout = 10000
    // 请求头
    options.header = {
      // 对options进行解构,如果有与下列配置相同的则会被替换相同部分,如果没有则会被添加
      ...options.header,
      'source-client': 'miniapp',
    }
    // token,登录后访问
    const meberStore = useMemberStore()
    const token = meberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

// 定义返回类型
interface resData<T> {
  code: string
  msg: string
  result: T
}

// 响应拦截器
export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<resData<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        // 状态码2××
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as resData<T>)
        } else if (res.statusCode === 401) {
          // 401:未登录使用登录权限功能
          const meberStore = useMemberStore()
          // 清空用户信息
          meberStore.clearProfile()
          // 跳转登录页
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          // 其他错误
          uni.showToast({
            icon: 'none',
            title: (res.data as resData<T>).msg || '请求错误!',
          })
          reject(res)
        }
      },
      fail(err) {
        // 网络错误
        uni.showToast({
          icon: 'none',
          title: '网络错误,请切换网络后重试',
        })
        reject(err)
      },
    })
  })
}
