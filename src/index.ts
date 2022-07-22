import type { Plugin } from 'vue'
import type { Props } from './interface'
import { injectGlobalConfig } from './config'
import Component from './component'

import './style.scss'

export type { Props, Events } from './interface'
export { DEFAULT_CONFIG } from './config'

export const TouchRipple = Component
export const install: Plugin = (app, defaultConfig?: Props) => {
  app.component(Component.name, Component)
  injectGlobalConfig(app, defaultConfig)
}

export default {
  TouchRipple: Component,
  install
}
