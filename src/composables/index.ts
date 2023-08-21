import type { YlGuessInstance } from '@/components/components'
import { ref } from 'vue'

/* 猜你喜欢组合式函数 */
export const useGuessList = () => {
  // 猜你喜欢ref实例
  const guessRef = ref<YlGuessInstance>()
  // 页面触底触发的事件
  const loading = ref<boolean>(false)
  const onScrolltolower = () => {
    if (loading.value) {
      return
    } else {
      loading.value = true
      guessRef.value?.getMore().then(() => (loading.value = false))
    }
  }
  return {
    guessRef,
    onScrolltolower,
  }
}
