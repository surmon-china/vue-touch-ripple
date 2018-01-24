<template>
  <div class="v-touch-ripple" 
       @mousedown="mousedown" 
       @mouseup="mouseup"
       ref="inner">
    <slot></slot>
    <div class="touch-ripple" v-show="showRipple">
        <transition-group tag="div" 
                          class="ripple-inner" 
                          name="ripple" 
                          @enter="rippleEnter"
                          @after-leave="rippleLeave">
          <ripple-core :key="ripple.id"
                       :id="ripple.id"
                       :color="color || options.color"
                       :speed="speed || options.speed"
                       :opacity="opacity || options.opacity"
                       :transition="transition || options.transition"
                       :styles="ripple.styles"
                       @end="handleRippleEnd"
                       v-for="ripple in ripples"></ripple-core>
        </transition-group>
    </div>
  </div>
</template>

<script>
  import RippleCore from './core.vue'
  export default {
    name: 'touch-ripple',
    props: {
      color: String,
      opacity: Number,
      speed: Number,
      transition: String,
      globalOptions: {
        type: Object,
        default: () => ({})
      },
    },
    components: {
      RippleCore
    },
    computed: {
      showRipple() {
        return this.rippleCount > 0
      },
      options() {
        return Object.assign({
          color: '#fff',
          opacity: 0.3,
          speed: 1,
          transition: 'ease-out'
        }, this.globalOptions)
      }
    },
    data() {
      return {
        id: 0,
        ripples: [],
        rippleCount: 0,
        mouseuped: true,
        keepLastRipple: false
      }
    },
    beforeDestroy() {
      this.clearRipples()
    },
    methods: {
      // 鼠标抬起
      mouseup(event) {
        this.mouseuped = true
        if (this.keepLastRipple) {
          this.clearRipples()
        }
      },
      // 鼠标按下
      mousedown(event) {

        // 整理基本属性
        this.mouseuped = false

        // 计算点击位置、宿主容器尺寸
        const { top: innerY, left: innerX } = this.$refs.inner.getBoundingClientRect()
        const { clientX: layerX, clientY: layerY } = event
        const positionX = layerX - innerX
        const positionY = layerY - innerY
        const { size, left, top } = this.getRippleSize(positionX, positionY)

        // 添加动画进队列
        this.ripples.push({
          id: this.id += 1,
          styles: { size, left, top }
        })
      },
      // 处理动画队列
      handleRippleEnd(id) {
        const targetIndex = this.ripples.findIndex(ripple => ripple.id === id)
        if (targetIndex > -1) {

          // 如果鼠标未抬起，且是最后一个动画，则这个动画的删除权应该交给鼠标抬起事件
          if (!this.mouseuped && (targetIndex === this.ripples.length - 1)) {
            this.keepLastRipple = true

          // 否则，直接删除
          } else {
            this.ripples.splice(targetIndex, 1)
          }
        }
      },
      // 获取容器尺寸
      getRippleSize(positionX, positionY) {
        const width = this.$refs.inner.clientWidth
        const height = this.$refs.inner.clientHeight

        // 得到点击位置距离最远的点，计算出这两点之间的距离
        const square = x => x * x
        const coordinates = [[0, 0], [width, 0], [0, height], [width, height]].map(coordinate => {
          return Math.sqrt(square(coordinate[0] - positionX) + square(coordinate[1] - positionY))
        })

        // 最长边即为半径
        const maxCoordinate = Math.max.apply({}, coordinates)

        const size = maxCoordinate * 2
        const left = positionX - size / 2
        const top = positionY - size / 2

        return { size, left, top }
      },
      // 清空动画队列
      clearRipples() {
        this.ripples = []
      },
      // 真实动画队列结束
      rippleEnter() {
        this.rippleCount += 1
      },
      rippleLeave() {
        this.rippleCount -= 1
      }
    }
  }
</script>

<style lang="scss">
  .v-touch-ripple {
    position: relative;
    display: inline-block;

    > .touch-ripple {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;

      > .ripple-inner {
        position: relative;
        overflow: hidden;
        display: block;
        width: 100%;
        height: 100%;

        > .ripple-core {
          display: block;
          position: absolute;
          border-radius: 50%;
          transition-property: transform, opacity;

          &.ripple-leave-to {
            opacity: 0!important;
          }
        }
      }
    }
  }
</style>
