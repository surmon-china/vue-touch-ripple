import type { Plugin } from 'vue'
import Component, { Props } from './ripple'
import { injectGlobalConfig } from './config'

import './style.scss'

export const TouchRipple = Component
export const install: Plugin = (app, defaultConfig?: Props) => {
  app.component(Component.name, Component)
  injectGlobalConfig(app, defaultConfig)
}

export default {
  TouchRipple: Component,
  install
}
