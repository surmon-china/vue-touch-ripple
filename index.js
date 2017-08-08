 /**
 *
 * Vue-touch-ripple
 * Adapted from rippleJS (https://github.com/samthor/rippleJS)
 * removed jQuery
 *
 */

var directive = require('./directive.js')
var component = require('./component.vue')
require('./component.css')

component = component.default || component

const vueTouchRipple = {
  touchRipple: component,
  install: function(Vue) {

    // component
    Vue.component(component.name, component)

    // directive
    Vue.directive(component.name, directive)
  }
}

module.exports = vueTouchRipple
