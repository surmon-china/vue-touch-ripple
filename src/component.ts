import { defineComponent, ref, reactive, computed, onBeforeUnmount, h, TransitionGroup } from 'vue'
import { useGlobalConfig, DEFAULT_CONFIG } from './config'
import { props, events, EventKey, Props } from './interface'
import RippleItem from './ripple'

export default defineComponent({
  name: 'Ripple',
  props: { ...props },
  emits: { ...events },
  setup(props, context) {
    const defaultConfig = {
      ...DEFAULT_CONFIG,
      ...useGlobalConfig()
    }

    const config = computed<Required<Props>>(() => ({
      color: props.color ?? defaultConfig.color,
      opacity: props.opacity ?? defaultConfig.opacity,
      duration: props.duration ?? defaultConfig.duration,
      transition: props.transition ?? defaultConfig.transition,
      keepLastRipple: props.keepLastRipple ?? defaultConfig.keepLastRipple
    }))

    const element = ref<HTMLElement>()
    const ripples = reactive<
      Array<{
        id: number
        size: number
        left: number
        top: number
      }>
    >([])
    const clearRipples = () => {
      ripples.length = 0
    }

    let lastRippleID = 0
    const state = reactive({
      active: true,
      cleanWhenMouseUp: false
    })

    const getRippleSize = (positionX: number, positionY: number) => {
      const width = element.value!.clientWidth
      const height = element.value!.clientHeight

      // Get the angle farthest from the center of the circle
      const square = (x: number) => Math.pow(x, 2)
      const coordinates = [
        [0, 0],
        [width, 0],
        [0, height],
        [width, height]
      ].map((coordinate) => {
        return Math.sqrt(square(coordinate[0] - positionX) + square(coordinate[1] - positionY))
      })

      // The radius of a circle is the longest side
      const maxCoordinate = Math.max.apply({}, coordinates)
      const size = maxCoordinate * 2
      const left = positionX - size / 2
      const top = positionY - size / 2

      return { left, top, size: Math.ceil(size) }
    }

    const handleMouseDown = (event: MouseEvent) => {
      // left click only
      if (event.button === 0) {
        state.active = true
        // click position
        const { top: innerY, left: innerX } = element.value!.getBoundingClientRect()
        const { clientX: layerX, clientY: layerY } = event
        const positionX = layerX - innerX
        const positionY = layerY - innerY
        const { size, left, top } = getRippleSize(positionX, positionY)
        ripples.push({
          id: (lastRippleID += 1),
          size,
          left,
          top
        })
        context.emit(EventKey.Touch, event)
      }
    }

    const handleMouseUp = (event: MouseEvent) => {
      // left click only
      if (event.button === 0) {
        state.active = false
        if (state.cleanWhenMouseUp) {
          clearRipples()
        }
        context.emit(EventKey.Click, event)
      }
    }

    const handleRippleEnd = (id: number) => {
      const targetIndex = ripples.findIndex((ripple) => ripple.id === id)
      if (targetIndex < 0) {
        return false
      }
      // mouse download active & last ripple
      if (config.value.keepLastRipple) {
        if (state.active && targetIndex === ripples.length - 1) {
          state.cleanWhenMouseUp = true
          return false
        }
      }
      // remove ripple
      state.cleanWhenMouseUp = false
      ripples.splice(targetIndex, 1)
    }

    onBeforeUnmount(() => {
      clearRipples()
    })

    return () => {
      return h(
        'div',
        {
          class: 'v-touch-ripple',
          ref: element,
          onMousedown: handleMouseDown,
          onMouseup: handleMouseUp
        },
        [
          context.slots.default?.() || null,
          h(
            TransitionGroup,
            {
              tag: 'div',
              name: 'ripple',
              class: 'ripples',
              onBeforeEnter: (element: any) => {
                context.emit(EventKey.Start, Number(element.dataset.id))
              },
              onAfterLeave: (element: any) => {
                context.emit(EventKey.End, Number(element.dataset.id))
              }
            },
            () =>
              ripples.map((ripple) =>
                h(RippleItem, {
                  ...ripple,
                  key: ripple.id,
                  color: config.value.color,
                  opacity: config.value.opacity,
                  duration: config.value.duration,
                  transition: config.value.transition,
                  onEnd: handleRippleEnd
                })
              )
          )
        ]
      )
    }
  }
})
