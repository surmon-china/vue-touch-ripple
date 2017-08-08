<template>
  <div style="position:relative">
    <slot></slot>
    <div class="touch-ripple"></div>
  </div>
</template>

<script>
  const touchripple = require('./touchripple')
  export default {
    name: 'touch-ripple',
    ready() {
      this.initialize()
    },
    mounted() {
      this.initialize()
    },
    beforeDestroy() {
      if (this.$el) {
        this.$el.removeEventListener('mousedown', touchripple.handleMouseDown)
        // this.$el.removeEventListener('touchstart', touchripple.handleTouchStart)
      }
    },
    methods: {
      initialize() {
        if (this.$el) {
          // console.log(this, this.$el.ontouchstart)
          this.$el.addEventListener('mousedown', touchripple.handleMouseDown)
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
  }
</script>
