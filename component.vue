<template>
  <div style="position:relative">
    <slot></slot>
    <div class="touch-ripple"></div>
  </div>
</template>

<script>
  var touchripple = require('./touchripple')
  export default {
    name: 'touch-ripple',
    ready: function() {
      this.initialize()
    },
    beforeDestory: function() {
      if (this.$el) {
        this.$el.removeEventListener('mousedown', touchripple.handleMouseDown)
        this.$el.removeEventListener('touchstart', touchripple.handleTouchStart)
      }
    },
    methods: {
      initialize: function() {
        if (this.$el) {
          this.$el.addEventListener('mousedown', touchripple.handleMouseDown)
          this.$el.addEventListener('touchstart', touchripple.handleTouchStart)
        }
      }
    }
  }
</script>

<style>
  .touch-ripple {
    display: block;
    overflow: hidden;
    border-radius: inherit;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    /*Forces webkit to properly contain content within border-radius*/
    -webkit-mask-image: -webkit-radial-gradient(circle, white, black);
  }

  .touch-ripple .ripple {
    position: absolute;
    width: 0;
    height: 0;
    pointer-events: none;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    border-radius: 50%;
    background-color: currentColor;
    background-clip: padding-box;
    opacity: 0.2;
    -webkit-transform: scale(0);
        -ms-transform: scale(0);
            transform: scale(0);
    transition: opacity 0.4s ease-out, -webkit-transform 0.4s ease-out;
    transition: transform 0.4s ease-out, opacity 0.4s ease-out;
    transition: transform 0.4s ease-out, opacity 0.4s ease-out, -webkit-transform 0.4s ease-out;
  }

  .touch-ripple .ripple.held {
    opacity: 0.4;
    -webkit-transform: scale(1);
        -ms-transform: scale(1);
            transform: scale(1);
  }

  .touch-ripple .ripple.done {
    opacity: 0!important;
  }
</style>
