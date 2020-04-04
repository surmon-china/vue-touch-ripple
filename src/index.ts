/**
 * @file vue-touch-ripple
 * @module exporter
 * @author Surmon <https://github.com/surmon-china>
 */

import _Vue, { PluginFunction } from 'vue'
import compoment from './ripple'

const COMPONENT_NAME = 'TouchRipple'

interface InstallFunction extends PluginFunction<any> {
  installed?: boolean
}

const install: InstallFunction = (Vue: typeof _Vue, globalOptions?: SwiperOptions) => {
  if (install.installed) return

  if (globalOptions) {
    (compoment as any).options.props.defaultOptions.default = () => globalOptions
  }
  Vue.component(COMPONENT_NAME, compoment)
  install.installed = true
}

export default {
  install,
  version: 'PACKAGE_VERSION',
  [COMPONENT_NAME]: compoment
}
