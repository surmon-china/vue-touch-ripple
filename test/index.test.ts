import { TransitionGroup } from 'vue'
import { test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { DEFAULT_CONFIG } from '../src/config'
import VueTouchRipple, { TouchRipple, install } from '../src/index'

// https://test-utils.vuejs.org/api
test('export type', async () => {
  expect(TouchRipple).toBeDefined()
  expect(install).toBeTypeOf('function')
  expect(VueTouchRipple).toBeDefined()
  expect(VueTouchRipple.install).toBeTypeOf('function')
  expect(VueTouchRipple.TouchRipple).toBeDefined()
  expect(VueTouchRipple.TouchRipple).toEqual(TouchRipple)
  expect(VueTouchRipple.install).toEqual(install)
})

test('mount component', async () => {
  const wrapper = mount(TouchRipple, { slots: { default: 'Hello' } })
  const tgWrapper = wrapper.getComponent(TransitionGroup)
  expect(wrapper.text()).toBe('Hello')
  expect(tgWrapper.element.children.length).toBe(0)

  await wrapper.trigger('mousedown')
  expect(wrapper.emitted()).toHaveProperty('touch')
  expect(tgWrapper.element.children.length).toBe(1)
  await wrapper.trigger('mousedown')
  expect(tgWrapper.element.children.length).toBe(2)

  const [firstChild, secondChild] = tgWrapper.findAllComponents({ name: 'RippleItem' })
  expect(firstChild.props().id).toBe(1)
  expect(firstChild.props().color).toBe(DEFAULT_CONFIG.color)
  expect(firstChild.props().opacity).toBe(DEFAULT_CONFIG.opacity)
  expect(firstChild.props().duration).toBe(DEFAULT_CONFIG.duration)
  expect(firstChild.props().transition).toBe(DEFAULT_CONFIG.transition)

  await wrapper.trigger('mouseup')
  expect(wrapper.emitted()).toHaveProperty('click')
})
