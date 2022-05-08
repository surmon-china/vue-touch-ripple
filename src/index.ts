import type { Plugin } from 'vue'
import _TouchRipple, { Props } from './ripple'
import { injectGlobalConfig } from './config'

import './style.scss'

export const TouchRipple = _TouchRipple
export const install: Plugin = (app, defaultConfig?: Props) => {
  app.component(_TouchRipple.name, _TouchRipple)
  injectGlobalConfig(app, defaultConfig)
}

export default {
  TouchRipple: _TouchRipple,
  install
}
