
/*
* vue-touch-ripple
* Author: surmon@foxmail.com
* Github: https://github.com/surmon-china/vue-touch-ripple
*/

import compoment from './ripple.vue'

export const touchRipple = compoment

export const install = function (Vue, options) {
  if (options) {
    compoment.props.globalOptions.default = () => options
  }
  Vue.component(compoment.name, compoment)
}

export default { touchRipple, install }
