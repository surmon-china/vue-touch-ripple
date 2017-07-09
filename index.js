 /**
 *
 * Vue-touch-ripple
 * Adapted from rippleJS (https://github.com/samthor/rippleJS)
 * removed jQuery
 *
 */

const directive = require('./directive.js')
const component = require('./component.vue')
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
