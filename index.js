 /**
 *
 * Vue-touch-ripple
 * Adapted from rippleJS (https://github.com/samthor/rippleJS)
 * removed jQuery
 *
 */

var directive = require('./src/directive.js')
var component = require('./src/component.vue')
component = component.default || component

var vueTouchRipple = {
  touchRipple: component,
  install: function(Vue) {

    // component
    Vue.component(component.name, component)

    // directive
    Vue.directive(component.name, directive)
  }
}

module.exports = vueTouchRipple
