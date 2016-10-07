 /**
 *
 * Vue-touch-ripple
 * Adapted from rippleJS (https://github.com/samthor/rippleJS)
 * removed jQuery
 *
 */

var directive = require('./directive.js')
var component = require('./component.vue')

var touchRippleBuild = function(Vue) {

  // component
  Vue.component('touch-ripple', component)

  // directive
  Vue.directive('touch-ripple', directive)
}

var touchRipple = {
  touchRipple: component,
  install: function(Vue) {
    touchRippleBuild(Vue)
  }
}

module.exports = touchRipple