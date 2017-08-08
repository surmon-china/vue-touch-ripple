(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.VueTouchRipple = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./src/component.vue":3,"./src/directive.js":4}],2:[function(require,module,exports){
/**
 * Adapted from dominus v6.0.1
 * https://github.com/bevacqua/dominus/blob/master/src/classes.js
 */

var trim = /^\s+|\s+$/g;
var whitespace = /\s+/g;

function interpret(input) {
  return typeof input === 'string' ? input.replace(trim, '').split(whitespace) : input;
}

function classes(el) {
  if (isElement(el)) {
    return el.className.replace(trim, '').split(whitespace);
  }

  return [];
}

function set(el, input) {
  if (isElement(el)) {
    el.className = interpret(input).join(' ');
  }
}

function add(el, input) {
  var current = remove(el, input);
  var values = interpret(input);

  current.push.apply(current, values);
  set(el, current);

  return current;
}

function remove(el, input) {
  var current = classes(el);
  var values = interpret(input);

  values.forEach(function(value) {
    var i = current.indexOf(value);
    if (i !== -1) {
      current.splice(i, 1);
    }
  });

  set(el, current);

  return current;
}

function contains(el, input) {
  var current = classes(el);
  var values = interpret(input);

  return values.every(function(value) {
    return current.indexOf(value) !== -1;
  });
}

function isElement(o) {
  var elementObjects = typeof HTMLElement === 'object';

  return elementObjects ? o instanceof HTMLElement : isElementObject(o);
}

function isElementObject(o) {
  return o &&
    typeof o === 'object' &&
    typeof o.nodeName === 'string' &&
    o.nodeType === 1;
}

module.exports = {
  add: add,
  remove: remove,
  contains: contains,
  has: contains,
  set: set,
  get: classes
};
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var touchripple = require('./touchripple');
exports.default = {
  name: 'touch-ripple',
  ready: function ready() {
    this.initialize();
  },
  mounted: function mounted() {
    this.initialize();
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$el) {
      this.$el.removeEventListener('mousedown', touchripple.handleMouseDown);
      // this.$el.removeEventListener('touchstart', touchripple.handleTouchStart)
    }
  },

  methods: {
    initialize: function initialize() {
      if (this.$el) {
        // console.log(this, this.$el.ontouchstart)
        this.$el.addEventListener('mousedown', touchripple.handleMouseDown);
        /*
        if (window.ontouchstart === null) {
          this.$el.addEventListener('touchstart', touchripple.handleTouchStart)
        } else {
          this.$el.addEventListener('mousedown', touchripple.handleMouseDown)
        }
        */
      }
    }
  }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div style=position:relative><slot></slot><div class=touch-ripple></div></div>"

},{"./touchripple":5}],4:[function(require,module,exports){
var touchripple = require('./touchripple')

var GetCurrentStyle = function(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr]
  } else {
    return getComputedStyle(obj, false)[attr]
  }
}

var directive = {
  bind: function (el) {
    var element = this ? (this.el ? this.el : el) : el
    // console.log(element)
    if (element) {
      var ripple = document.createElement('div')
      ripple.className = 'touch-ripple'
      element.appendChild(ripple)
      element.style.position = 'relative'
      // element.addEventListener('touchstart', touchripple.handleTouchStart)
      element.addEventListener('mousedown', touchripple.handleMouseDown)
    }
  },
  update: function (value) {
    // console.log(value)
  },
  unbind: function (el) {
    var element = this ? (this.el ? this.el : el) : el
    if (element) {
      element.removeEventListener('mousedown', touchripple.handleMouseDown)
      // element.removeEventListener('touchstart', touchripple.handleTouchStart)
    }
  }
}

module.exports = directive

},{"./touchripple":5}],5:[function(require,module,exports){
/**
 * Vue-touch-ripple
 * Adapted from rippleJS (https://github.com/samthor/rippleJS)
 */

var classlist = require('./classlist')

// startRipple
var startRipple = function(eventType, event) {

  // 获取事件目标元素
  var holder = event.currentTarget || event.target

  // console.log(holder)

  // 当前元素不能包含既定元素
  if (!classlist.has(holder, 'touch-ripple')) {
    if (!holder) return
    holder = holder.querySelector('.touch-ripple')
    if (!holder) return
  }

  var prev = holder.getAttribute('data-ui-event')
  if (prev && prev !== eventType) return

  holder.setAttribute('data-ui-event', eventType)

  // Create and position the ripple
  var rect = holder.getBoundingClientRect()
  var x = event.offsetX
  var y

  if (x !== undefined) {
    y = event.offsetY
  } else {
    x = event.clientX - rect.left
    y = event.clientY - rect.top
  }

  var ripple = document.createElement('div')
  var max

  if (rect.width === rect.height) {
    max = rect.width * 1.412
  } else {
    max = Math.sqrt(
      (rect.width * rect.width) + (rect.height * rect.height)
    )
  }

  var dim = (max * 2) + 'px'

  ripple.style.width = dim
  ripple.style.height = dim
  ripple.style.marginLeft = -max + x + 'px'
  ripple.style.marginTop = -max + y + 'px'

  // Activate/add the element
  ripple.className = 'ripple'
  holder.appendChild(ripple)

  setTimeout(function() {
    classlist.add(ripple, 'held')
  }, 0)

  var releaseEvent = (eventType === 'mousedown' ? 'mouseup' : 'touchend')

  var release = function() {
    document.removeEventListener(releaseEvent, release)

    classlist.add(ripple, 'done')

    // Larger than the animation duration in CSS
    setTimeout(function() {
      holder.removeChild(ripple)

      if (!holder.children.length) {
        classlist.remove(holder, 'active')
        holder.removeAttribute('data-ui-event')
      }
    }, 450)
  }

  document.addEventListener(releaseEvent, release)
}

// 鼠标按下
var handleMouseDown = function(e) {
  // Trigger on left click only
  if (e.button === 0) {
    startRipple(e.type, e)
  }
}

// 触摸事件开始
var handleTouchStart = function(e) {
  var touchs = e.changedTouches;
  if (touchs) {
    touchs.forEach(function (t) {
      startRipple(e.type, t)
    });
  }
}

module.exports = {
  startRipple: startRipple,
  handleMouseDown: handleMouseDown,
  handleTouchStart: handleTouchStart
}

},{"./classlist":2}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9fYnJvd3Nlci1wYWNrQDYuMC4yQGJyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImluZGV4LmpzIiwic3JjL2NsYXNzbGlzdC5qcyIsInNyYy9jb21wb25lbnQudnVlIiwic3JjL2RpcmVjdGl2ZS5qcyIsInNyYy90b3VjaHJpcHBsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiAvKipcbiAqXG4gKiBWdWUtdG91Y2gtcmlwcGxlXG4gKiBBZGFwdGVkIGZyb20gcmlwcGxlSlMgKGh0dHBzOi8vZ2l0aHViLmNvbS9zYW10aG9yL3JpcHBsZUpTKVxuICogcmVtb3ZlZCBqUXVlcnlcbiAqXG4gKi9cblxudmFyIGRpcmVjdGl2ZSA9IHJlcXVpcmUoJy4vc3JjL2RpcmVjdGl2ZS5qcycpXG52YXIgY29tcG9uZW50ID0gcmVxdWlyZSgnLi9zcmMvY29tcG9uZW50LnZ1ZScpXG5jb21wb25lbnQgPSBjb21wb25lbnQuZGVmYXVsdCB8fCBjb21wb25lbnRcblxudmFyIHZ1ZVRvdWNoUmlwcGxlID0ge1xuICB0b3VjaFJpcHBsZTogY29tcG9uZW50LFxuICBpbnN0YWxsOiBmdW5jdGlvbihWdWUpIHtcblxuICAgIC8vIGNvbXBvbmVudFxuICAgIFZ1ZS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsIGNvbXBvbmVudClcblxuICAgIC8vIGRpcmVjdGl2ZVxuICAgIFZ1ZS5kaXJlY3RpdmUoY29tcG9uZW50Lm5hbWUsIGRpcmVjdGl2ZSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZ1ZVRvdWNoUmlwcGxlXG4iLCIvKipcclxuICogQWRhcHRlZCBmcm9tIGRvbWludXMgdjYuMC4xXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9iZXZhY3F1YS9kb21pbnVzL2Jsb2IvbWFzdGVyL3NyYy9jbGFzc2VzLmpzXHJcbiAqL1xyXG5cclxudmFyIHRyaW0gPSAvXlxccyt8XFxzKyQvZztcclxudmFyIHdoaXRlc3BhY2UgPSAvXFxzKy9nO1xyXG5cclxuZnVuY3Rpb24gaW50ZXJwcmV0KGlucHV0KSB7XHJcbiAgcmV0dXJuIHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycgPyBpbnB1dC5yZXBsYWNlKHRyaW0sICcnKS5zcGxpdCh3aGl0ZXNwYWNlKSA6IGlucHV0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGFzc2VzKGVsKSB7XHJcbiAgaWYgKGlzRWxlbWVudChlbCkpIHtcclxuICAgIHJldHVybiBlbC5jbGFzc05hbWUucmVwbGFjZSh0cmltLCAnJykuc3BsaXQod2hpdGVzcGFjZSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gW107XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldChlbCwgaW5wdXQpIHtcclxuICBpZiAoaXNFbGVtZW50KGVsKSkge1xyXG4gICAgZWwuY2xhc3NOYW1lID0gaW50ZXJwcmV0KGlucHV0KS5qb2luKCcgJyk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGQoZWwsIGlucHV0KSB7XHJcbiAgdmFyIGN1cnJlbnQgPSByZW1vdmUoZWwsIGlucHV0KTtcclxuICB2YXIgdmFsdWVzID0gaW50ZXJwcmV0KGlucHV0KTtcclxuXHJcbiAgY3VycmVudC5wdXNoLmFwcGx5KGN1cnJlbnQsIHZhbHVlcyk7XHJcbiAgc2V0KGVsLCBjdXJyZW50KTtcclxuXHJcbiAgcmV0dXJuIGN1cnJlbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZShlbCwgaW5wdXQpIHtcclxuICB2YXIgY3VycmVudCA9IGNsYXNzZXMoZWwpO1xyXG4gIHZhciB2YWx1ZXMgPSBpbnRlcnByZXQoaW5wdXQpO1xyXG5cclxuICB2YWx1ZXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgdmFyIGkgPSBjdXJyZW50LmluZGV4T2YodmFsdWUpO1xyXG4gICAgaWYgKGkgIT09IC0xKSB7XHJcbiAgICAgIGN1cnJlbnQuc3BsaWNlKGksIDEpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBzZXQoZWwsIGN1cnJlbnQpO1xyXG5cclxuICByZXR1cm4gY3VycmVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY29udGFpbnMoZWwsIGlucHV0KSB7XHJcbiAgdmFyIGN1cnJlbnQgPSBjbGFzc2VzKGVsKTtcclxuICB2YXIgdmFsdWVzID0gaW50ZXJwcmV0KGlucHV0KTtcclxuXHJcbiAgcmV0dXJuIHZhbHVlcy5ldmVyeShmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgcmV0dXJuIGN1cnJlbnQuaW5kZXhPZih2YWx1ZSkgIT09IC0xO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0VsZW1lbnQobykge1xyXG4gIHZhciBlbGVtZW50T2JqZWN0cyA9IHR5cGVvZiBIVE1MRWxlbWVudCA9PT0gJ29iamVjdCc7XHJcblxyXG4gIHJldHVybiBlbGVtZW50T2JqZWN0cyA/IG8gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCA6IGlzRWxlbWVudE9iamVjdChvKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNFbGVtZW50T2JqZWN0KG8pIHtcclxuICByZXR1cm4gbyAmJlxyXG4gICAgdHlwZW9mIG8gPT09ICdvYmplY3QnICYmXHJcbiAgICB0eXBlb2Ygby5ub2RlTmFtZSA9PT0gJ3N0cmluZycgJiZcclxuICAgIG8ubm9kZVR5cGUgPT09IDE7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGFkZDogYWRkLFxyXG4gIHJlbW92ZTogcmVtb3ZlLFxyXG4gIGNvbnRhaW5zOiBjb250YWlucyxcclxuICBoYXM6IGNvbnRhaW5zLFxyXG4gIHNldDogc2V0LFxyXG4gIGdldDogY2xhc3Nlc1xyXG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuXG52YXIgdG91Y2hyaXBwbGUgPSByZXF1aXJlKCcuL3RvdWNocmlwcGxlJyk7XG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIG5hbWU6ICd0b3VjaC1yaXBwbGUnLFxuICByZWFkeTogZnVuY3Rpb24gcmVhZHkoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gIH0sXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gIH0sXG4gIGJlZm9yZURlc3Ryb3k6IGZ1bmN0aW9uIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuJGVsKSB7XG4gICAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0b3VjaHJpcHBsZS5oYW5kbGVNb3VzZURvd24pO1xuICAgICAgLy8gdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNocmlwcGxlLmhhbmRsZVRvdWNoU3RhcnQpXG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgICAgaWYgKHRoaXMuJGVsKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMsIHRoaXMuJGVsLm9udG91Y2hzdGFydClcbiAgICAgICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdG91Y2hyaXBwbGUuaGFuZGxlTW91c2VEb3duKTtcbiAgICAgICAgLypcbiAgICAgICAgaWYgKHdpbmRvdy5vbnRvdWNoc3RhcnQgPT09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdG91Y2hyaXBwbGUuaGFuZGxlVG91Y2hTdGFydClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0b3VjaHJpcHBsZS5oYW5kbGVNb3VzZURvd24pXG4gICAgICAgIH1cbiAgICAgICAgKi9cbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5pZiAobW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSkgbW9kdWxlLmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cy5kZWZhdWx0XG47KHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJmdW5jdGlvblwiPyBtb2R1bGUuZXhwb3J0cy5vcHRpb25zOiBtb2R1bGUuZXhwb3J0cykudGVtcGxhdGUgPSBcIjxkaXYgc3R5bGU9cG9zaXRpb246cmVsYXRpdmU+PHNsb3Q+PC9zbG90PjxkaXYgY2xhc3M9dG91Y2gtcmlwcGxlPjwvZGl2PjwvZGl2PlwiXG4iLCJ2YXIgdG91Y2hyaXBwbGUgPSByZXF1aXJlKCcuL3RvdWNocmlwcGxlJylcblxudmFyIEdldEN1cnJlbnRTdHlsZSA9IGZ1bmN0aW9uKG9iaiwgYXR0cikge1xuICBpZiAob2JqLmN1cnJlbnRTdHlsZSkge1xuICAgIHJldHVybiBvYmouY3VycmVudFN0eWxlW2F0dHJdXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGdldENvbXB1dGVkU3R5bGUob2JqLCBmYWxzZSlbYXR0cl1cbiAgfVxufVxuXG52YXIgZGlyZWN0aXZlID0ge1xuICBiaW5kOiBmdW5jdGlvbiAoZWwpIHtcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMgPyAodGhpcy5lbCA/IHRoaXMuZWwgOiBlbCkgOiBlbFxuICAgIC8vIGNvbnNvbGUubG9nKGVsZW1lbnQpXG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIHZhciByaXBwbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgcmlwcGxlLmNsYXNzTmFtZSA9ICd0b3VjaC1yaXBwbGUnXG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHJpcHBsZSlcbiAgICAgIGVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnXG4gICAgICAvLyBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaHJpcHBsZS5oYW5kbGVUb3VjaFN0YXJ0KVxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0b3VjaHJpcHBsZS5oYW5kbGVNb3VzZURvd24pXG4gICAgfVxuICB9LFxuICB1cGRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIC8vIGNvbnNvbGUubG9nKHZhbHVlKVxuICB9LFxuICB1bmJpbmQ6IGZ1bmN0aW9uIChlbCkge1xuICAgIHZhciBlbGVtZW50ID0gdGhpcyA/ICh0aGlzLmVsID8gdGhpcy5lbCA6IGVsKSA6IGVsXG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdG91Y2hyaXBwbGUuaGFuZGxlTW91c2VEb3duKVxuICAgICAgLy8gZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdG91Y2hyaXBwbGUuaGFuZGxlVG91Y2hTdGFydClcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaXJlY3RpdmVcbiIsIi8qKlxuICogVnVlLXRvdWNoLXJpcHBsZVxuICogQWRhcHRlZCBmcm9tIHJpcHBsZUpTIChodHRwczovL2dpdGh1Yi5jb20vc2FtdGhvci9yaXBwbGVKUylcbiAqL1xuXG52YXIgY2xhc3NsaXN0ID0gcmVxdWlyZSgnLi9jbGFzc2xpc3QnKVxuXG4vLyBzdGFydFJpcHBsZVxudmFyIHN0YXJ0UmlwcGxlID0gZnVuY3Rpb24oZXZlbnRUeXBlLCBldmVudCkge1xuXG4gIC8vIOiOt+WPluS6i+S7tuebruagh+WFg+e0oFxuICB2YXIgaG9sZGVyID0gZXZlbnQuY3VycmVudFRhcmdldCB8fCBldmVudC50YXJnZXRcblxuICAvLyBjb25zb2xlLmxvZyhob2xkZXIpXG5cbiAgLy8g5b2T5YmN5YWD57Sg5LiN6IO95YyF5ZCr5pei5a6a5YWD57SgXG4gIGlmICghY2xhc3NsaXN0Lmhhcyhob2xkZXIsICd0b3VjaC1yaXBwbGUnKSkge1xuICAgIGlmICghaG9sZGVyKSByZXR1cm5cbiAgICBob2xkZXIgPSBob2xkZXIucXVlcnlTZWxlY3RvcignLnRvdWNoLXJpcHBsZScpXG4gICAgaWYgKCFob2xkZXIpIHJldHVyblxuICB9XG5cbiAgdmFyIHByZXYgPSBob2xkZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXVpLWV2ZW50JylcbiAgaWYgKHByZXYgJiYgcHJldiAhPT0gZXZlbnRUeXBlKSByZXR1cm5cblxuICBob2xkZXIuc2V0QXR0cmlidXRlKCdkYXRhLXVpLWV2ZW50JywgZXZlbnRUeXBlKVxuXG4gIC8vIENyZWF0ZSBhbmQgcG9zaXRpb24gdGhlIHJpcHBsZVxuICB2YXIgcmVjdCA9IGhvbGRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICB2YXIgeCA9IGV2ZW50Lm9mZnNldFhcbiAgdmFyIHlcblxuICBpZiAoeCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgeSA9IGV2ZW50Lm9mZnNldFlcbiAgfSBlbHNlIHtcbiAgICB4ID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdFxuICAgIHkgPSBldmVudC5jbGllbnRZIC0gcmVjdC50b3BcbiAgfVxuXG4gIHZhciByaXBwbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICB2YXIgbWF4XG5cbiAgaWYgKHJlY3Qud2lkdGggPT09IHJlY3QuaGVpZ2h0KSB7XG4gICAgbWF4ID0gcmVjdC53aWR0aCAqIDEuNDEyXG4gIH0gZWxzZSB7XG4gICAgbWF4ID0gTWF0aC5zcXJ0KFxuICAgICAgKHJlY3Qud2lkdGggKiByZWN0LndpZHRoKSArIChyZWN0LmhlaWdodCAqIHJlY3QuaGVpZ2h0KVxuICAgIClcbiAgfVxuXG4gIHZhciBkaW0gPSAobWF4ICogMikgKyAncHgnXG5cbiAgcmlwcGxlLnN0eWxlLndpZHRoID0gZGltXG4gIHJpcHBsZS5zdHlsZS5oZWlnaHQgPSBkaW1cbiAgcmlwcGxlLnN0eWxlLm1hcmdpbkxlZnQgPSAtbWF4ICsgeCArICdweCdcbiAgcmlwcGxlLnN0eWxlLm1hcmdpblRvcCA9IC1tYXggKyB5ICsgJ3B4J1xuXG4gIC8vIEFjdGl2YXRlL2FkZCB0aGUgZWxlbWVudFxuICByaXBwbGUuY2xhc3NOYW1lID0gJ3JpcHBsZSdcbiAgaG9sZGVyLmFwcGVuZENoaWxkKHJpcHBsZSlcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGNsYXNzbGlzdC5hZGQocmlwcGxlLCAnaGVsZCcpXG4gIH0sIDApXG5cbiAgdmFyIHJlbGVhc2VFdmVudCA9IChldmVudFR5cGUgPT09ICdtb3VzZWRvd24nID8gJ21vdXNldXAnIDogJ3RvdWNoZW5kJylcblxuICB2YXIgcmVsZWFzZSA9IGZ1bmN0aW9uKCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIocmVsZWFzZUV2ZW50LCByZWxlYXNlKVxuXG4gICAgY2xhc3NsaXN0LmFkZChyaXBwbGUsICdkb25lJylcblxuICAgIC8vIExhcmdlciB0aGFuIHRoZSBhbmltYXRpb24gZHVyYXRpb24gaW4gQ1NTXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGhvbGRlci5yZW1vdmVDaGlsZChyaXBwbGUpXG5cbiAgICAgIGlmICghaG9sZGVyLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICBjbGFzc2xpc3QucmVtb3ZlKGhvbGRlciwgJ2FjdGl2ZScpXG4gICAgICAgIGhvbGRlci5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdWktZXZlbnQnKVxuICAgICAgfVxuICAgIH0sIDQ1MClcbiAgfVxuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIocmVsZWFzZUV2ZW50LCByZWxlYXNlKVxufVxuXG4vLyDpvKDmoIfmjInkuItcbnZhciBoYW5kbGVNb3VzZURvd24gPSBmdW5jdGlvbihlKSB7XG4gIC8vIFRyaWdnZXIgb24gbGVmdCBjbGljayBvbmx5XG4gIGlmIChlLmJ1dHRvbiA9PT0gMCkge1xuICAgIHN0YXJ0UmlwcGxlKGUudHlwZSwgZSlcbiAgfVxufVxuXG4vLyDop6bmkbjkuovku7blvIDlp4tcbnZhciBoYW5kbGVUb3VjaFN0YXJ0ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgdG91Y2hzID0gZS5jaGFuZ2VkVG91Y2hlcztcbiAgaWYgKHRvdWNocykge1xuICAgIHRvdWNocy5mb3JFYWNoKGZ1bmN0aW9uICh0KSB7XG4gICAgICBzdGFydFJpcHBsZShlLnR5cGUsIHQpXG4gICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHN0YXJ0UmlwcGxlOiBzdGFydFJpcHBsZSxcbiAgaGFuZGxlTW91c2VEb3duOiBoYW5kbGVNb3VzZURvd24sXG4gIGhhbmRsZVRvdWNoU3RhcnQ6IGhhbmRsZVRvdWNoU3RhcnRcbn1cbiJdfQ==
