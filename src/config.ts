import { App, inject } from 'vue'
import type { Props } from './interface'

export const DEFAULT_CONFIG: Readonly<Required<Props>> = Object.freeze({
  color: '#fff',
  opacity: 0.3,
  duration: 380,
  transition: 'ease-out',
  keepLastRipple: true
})

const CONFIG_SYMBOL = Symbol('vue-touch-ripple-global-config')
export const injectGlobalConfig = (app: App, config?: Props) => {
  app.provide(CONFIG_SYMBOL, config)
}

export const useGlobalConfig = () => {
  return inject<Props>(CONFIG_SYMBOL, {} as Props)
}
