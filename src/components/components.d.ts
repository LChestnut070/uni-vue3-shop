import YlSwiper from './YlSwiper.vue'
import YlGuess from './YlGuess.vue'

// 组件的类型
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    YlSwiper: typeof YlSwiper
    YlGuess: typeof YlGuess
  }
}

// 组件实例的类型(通过ref获取到的实例),InstanceType用于获取组件的实例类型
export type YlGuessInstance = InstanceType<typeof YlGuess>
