import { App, inject } from 'vue'
import { Props } from './ripple'

export const DEFAULT_CONFIG: Readonly<Required<Props>> = Object.freeze({
  color: '#fff',
  opacity: 0.3,
  duration: 380,
  transition: 'ease-out',
  keepLastRipple: true
})

const VTRConfigSymbol = Symbol('vue-touch-ripple-global-config')
export const injectGlobalConfig = (app: App, config?: Props) => {
  app.provide(VTRConfigSymbol, config)
}

export const useGlobalConfig = () => {
  return inject<Props>(VTRConfigSymbol, {} as Props)
}
