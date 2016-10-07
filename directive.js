var touchripple = require('./touchripple')

var GetCurrentStyle = function(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr]
  } else {
    return getComputedStyle(obj, false)[attr]
  }
}

var directive = {
  bind: function(el) {
    var element = this ? (this.el ? this.el : el) : el
    // console.log(element)
    if (element) {
      var ripple = document.createElement('div')
      ripple.className = 'touch-ripple'
      element.appendChild(ripple)
      element.style.position = 'relative'
      element.addEventListener('touchstart', touchripple.handleTouchStart)
      element.addEventListener('mousedown', touchripple.handleMouseDown)
    }
  },
  update: function(value) {
    // console.log(value)
  },
  unbind: function(el) {
    var element = this ? (this.el ? this.el : el) : el
    if (element) {
      element.removeEventListener('mousedown', touchripple.handleMouseDown)
      element.removeEventListener('touchstart', touchripple.handleTouchStart)
    }
  }
}

module.exports = directive