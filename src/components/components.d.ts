import YlSwiper from './YlSwiper.vue'
import YlGuess from './YlGuess.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    YlSwiper: typeof YlSwiper
    YlGuess: typeof YlGuess
  }
}
