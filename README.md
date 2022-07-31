# vue-touch-ripple

[![vue](https://img.shields.io/badge/MADE%20WITH-VUE-42a97a?style=for-the-badge&labelColor=35495d)](https://vuejs.org)
&nbsp;
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/vue-touch-ripple.svg?style=for-the-badge)](https://github.com/surmon-china/vue-touch-ripple/stargazers)
&nbsp;
[![npm](https://img.shields.io/npm/v/vue-touch-ripple?color=c7343a&label=npm&style=for-the-badge)](https://www.npmjs.com/package/vue-touch-ripple)
&nbsp;
[![Test Codecov](https://img.shields.io/codecov/c/github/surmon-china/vue-touch-ripple?style=for-the-badge)](https://codecov.io/gh/surmon-china/vue-touch-ripple)
&nbsp;
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=for-the-badge)](/LICENSE)

Make any element easily have a Material Design-style [click "ink ripple" effect](https://material-components.github.io/material-components-web-catalog/#/component/ripple).

- [Examples](https://github.surmon.me/vue-touch-ripple)
- [Legacy version](https://github.com/surmon-china/vue-touch-ripple/tree/v3.0.0) (Vue2)

---

### Usage

#### Install

```bash
yarn add vue-touch-ripple
```

```bash
npm install vue-touch-ripple --save
```

#### Local component

```vue
<template>
  <touch-ripple
    color="#fff"
    :opacity="0.4"
    transition="ease-out"
    :duration="400"
    :keep-last-ripple="true"
    @touch="log('touch', $event)"
    @click="log('click', $event)"
    @start="log('ripple-start', $event)"
    @end="log('ripple-end', $event)"
  >
    <!-- your content element -->
    <div class="content">Target content</div>
  </touch-ripple>
</template>

<script>
  import { defineComponent } from 'vue'
  import { TouchRipple } from 'vue-touch-ripple'
  import 'vue-touch-ripple/style.css'

  export default defineComponent({
    components: {
      TouchRipple
    },
    methods: {
      log: console.log
    }
  })
</script>
```

#### Global component

```javascript
import { createApp } from 'vue'
import VueTouchRipple from 'vue-touch-ripple'
import 'vue-touch-ripple/style.css'

const app = createApp()

app.use(VueTouchRipple, {
  // optional default global options
  color: 'red',
  opacity: 0.5,
  duration: 280,
  transition: 'ease',
  keepLastRipple: false
})
```

### Component Props

| prop           | description                                                                                                            | type      | default    |
| :------------- | :--------------------------------------------------------------------------------------------------------------------- | :-------- | :--------- |
| color          | Specify the background color of the ripple layer, supporting any legal color value such as RGBA.                       | `String`  | `#fff`     |
| opacity        | Transparency of ripple layers, supporting numbers from `0` ~ `1`.                                                      | `Number`  | `0.3`      |
| duration       | Duration of single ripple motion, time in milliseconds.                                                                | `Number`  | `380`      |
| transition     | Ripple motion animation curve with Bezier curve value support.                                                         | `String`  | `ease-out` |
| keepLastRipple | whether to keep the last ripple (if `true`, the last ripple will always be present until the mouse button is released) | `Boolean` | `true`     |

### Component Events

| event | description                                             | params                |
| :---- | :------------------------------------------------------ | :-------------------- |
| touch | When the component is pressed by the left mouse button. | `(event: MouseEvent)` |
| click | When the component is lifted by the left mouse button.  | `(event: MouseEvent)` |
| start | When the animated animation of each ripple starts.      | `(id: number)`        |
| end   | When the animated motion of each ripple ends.           | `(id: number)`        |

BTW: if you expect to bind more flexible events on the component, [in Vue3 you can just bind the events directly, instead of using the `@xxx.native` modifier in Vue2](https://v3-migration.vuejs.org/breaking-changes/v-on-native-modifier-removed.html).

### Changelog

Detailed changes for each release are documented in the [release notes](/CHANGELOG.md).

### License

Licensed under the [MIT](/LICENSE) License.
