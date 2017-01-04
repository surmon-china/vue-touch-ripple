 /**
 *
 * Vue-touch-ripple
 * Adapted from rippleJS (https://github.com/samthor/rippleJS)
 * removed jQuery
 *
 */

const directive = require('./directive.js')
const component = require('./component.vue')

const vueTouchRipple = {
  touchRipple: component,
  install: function(Vue) {

    // component
    Vue.component('touch-ripple', component)

    // directive
    Vue.directive('touch-ripple', directive)
  }
}

module.exports = vueTouchRipple
