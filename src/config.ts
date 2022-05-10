import { App, inject } from 'vue'
import { Props } from './ripple'

const VTRConfigSymbol = Symbol('vue-touch-ripple-global-config')
export const injectGlobalConfig = (app: App, config?: Props) => {
  app.provide(VTRConfigSymbol, config)
}

export const useGlobalConfig = () => {
  return inject<Props>(VTRConfigSymbol, {} as Props)
}
