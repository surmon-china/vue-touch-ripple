import { ExtractPropTypes } from 'vue'

export type Props = ExtractPropTypes<typeof props>
export const props = {
  color: String,
  opacity: Number,
  duration: Number,
  transition: String,
  keepLastRipple: {
    type: Boolean,
    // HACK: for Vue prop Boolean type default value
    default: undefined
  }
}

export enum EventKey {
  Touch = 'touch',
  Click = 'click',
  Start = 'start',
  End = 'end'
}

export const events = {
  [EventKey.Touch]: (event: MouseEvent) => true,
  [EventKey.Click]: (event: MouseEvent) => true,
  [EventKey.Start]: (id: number) => true,
  [EventKey.End]: (id: number) => true
}

export type Events = typeof events
