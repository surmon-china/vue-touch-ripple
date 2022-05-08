import { defineComponent, ref, nextTick, h, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'RippleCore',
  props: {
    id: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    top: {
      type: Number,
      required: true
    },
    left: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    opacity: {
      type: Number,
      required: true
    },
    transition: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    }
  },
  emits: {
    start: (id: number) => Number.isInteger(id),
    end: (id: number) => Number.isInteger(id)
  },
  setup(props, context) {
    let scaleTimer: number | null = null
    const scale = ref(0)

    onMounted(() => {
      nextTick(() => {
        scaleTimer = window.setTimeout(() => {
          scale.value = 1
        }, 0)
      })
    })

    onBeforeUnmount(() => {
      if (scaleTimer) {
        window.clearTimeout(scaleTimer)
        scaleTimer = null
      }
    })

    return () =>
      h('div', {
        class: 'ripple-core',
        'data-id': props.id,
        onTransitionstart: () => context.emit('start', props.id),
        onTransitionend: () => context.emit('end', props.id),
        style: {
          opacity: props.opacity,
          top: `${props.top}px`,
          left: `${props.left}px`,
          width: `${props.size}px`,
          height: `${props.size}px`,
          transform: `scale(${scale.value})`,
          'z-index': props.id,
          'background-color': props.color,
          'transition-property': 'transform, opacity',
          'transition-duration': `${props.duration}ms, 300ms`,
          'transition-timing-function': `${props.transition}, linear`
        }
      })
  }
})
