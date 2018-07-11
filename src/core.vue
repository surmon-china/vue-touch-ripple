<template>
  <div class="ripple-core" :style="computeCoreStyle"></div>
</template>

<script>
  export default {
    name: 'touch-ripple-core',
    props: ['id', 'color', 'opacity', 'speed', 'styles', 'transition'],
    data() {
      return {
        timers: {
          transform: null,
          rippling: null
        },
        baseSpeed: 0.5,
        coreStyle: {
          transform: 'scale(0)'
        }
      }
    },
    ready() {
      this.startRipple()
    },
    mounted() {
      this.startRipple()
    },
    beforeDestroy() {
      if (this.timers.transform) {
        clearTimeout(this.timers.transform)
        this.timers.transform = null
      }
      if (this.timers.rippling) {
        clearTimeout(this.timers.rippling)
        this.timers.rippling = null
      }
    },
    computed: {
      computeSpeed() {
        return this.baseSpeed / this.speed
      },
      computeCoreStyle() {
        return {
          'z-index': this.id,
          opacity: this.opacity,
          top: `${this.styles.top}px`,
          left: `${this.styles.left}px`,
          width: `${this.styles.size}px`,
          height: `${this.styles.size}px`,
          transform: this.coreStyle.transform,
          'background-color': this.color,
          'transition-duration': `${this.computeSpeed}s, 0.4s`,
          'transition-timing-function': `${this.transition}, ease-out`
        }
      }
    },
    methods: {
      startRipple() {
        this.$nextTick(() => {

          // 开始涟漪
          this.timers.transform = setTimeout(() => {
            this.coreStyle.transform = 'scale(1)'
          }, 0)

          // 结束涟漪
          this.timers.rippling = setTimeout(() => {
            this.$emit('end', this.id)
          }, this.computeSpeed * 1000)
        })
      }
    }
  }
</script>
