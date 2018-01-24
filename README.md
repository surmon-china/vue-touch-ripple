[![GitHub stars](https://img.shields.io/github/stars/surmon-china/vue-touch-ripple.svg?style=flat-square)](https://github.com/surmon-china/vue-touch-ripple/stargazers)
[![Build Status](https://travis-ci.org/surmon-china/vue-touch-ripple.svg?branch=master)](https://travis-ci.org/surmon-china/vue-touch-ripple)
[![GitHub issues](https://img.shields.io/github/issues/surmon-china/vue-touch-ripple.svg?style=flat-square)](https://github.com/surmon-china/vue-touch-ripple/issues)
[![GitHub forks](https://img.shields.io/github/forks/surmon-china/vue-touch-ripple.svg?style=flat-square)](https://github.com/surmon-china/vue-touch-ripple/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/surmon-china/vue-touch-ripple)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/surmon-china/vue-touch-ripple)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/surmon-china/vue-touch-ripple.svg?style=flat-square)](https://twitter.com/intent/tweet?url=https://github.com/surmon-china/vue-touch-ripple)

[![NPM](https://nodei.co/npm/vue-touch-ripple.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-touch-ripple/)
[![NPM](https://nodei.co/npm-dl/vue-touch-ripple.png?months=9&height=3)](https://nodei.co/npm/vue-touch-ripple/)


# Vue-Touch-Ripple
Touch ripple component for Vue.


# Example

[Demo Page](https://surmon-china.github.io/vue-touch-ripple/)

[CDN Example](https://jsfiddle.net/bL983fjt/)


# Install

#### CDN

``` html
<script type="text/javascript" src="path/to/vue.min.js"></script>
<script type="text/javascript" src="path/to/dist/vue-touch-ripple.js"></script>
<link rel="stylesheet" href="path/to/dist/vue-touch-ripple.css"/>
<script type="text/javascript">
  Vue.use(window.VueTouchRipple, /* { default global options } */)
</script>
```

#### NPM

``` bash
npm install vue-touch-ripple --save
```

### Mount

#### mount with global

``` javascript
import Vue from 'vue'
import VueTouchRipple from 'vue-touch-ripple'

// import styles
import 'vue-touch-ripple/dist/vue-touch-ripple.css'

// mount with global
Vue.use(VueTouchRipple, /* {
  // default global options
  color: '#fff',
  opacity: 0.3,
  speed: 1,
  transition: 'ease'
} */)
```

#### mount with component

```javascript
import { touchRipple } from 'vue-touch-ripple'

// import styles
import 'vue-touch-ripple/dist/vue-touch-ripple.css'

export default {
  components: {
    touchRipple
  }
}
```


### Component

```vue
<template>
  <touch-ripple :speed="1" :opacity="0.3" color="#fff" transition="ease">
     <!-- your element... -->
     <h1>it's a h1 title</h1>
     <div>it's a div block</div>
  </touch-ripple>
</template>
```


# Options

| prop       | type     |default |
| :--------  | :----- | :---- |
| speed      | `Number` | `1`    |
| color      | `String` | `#fff` |
| opacity    | `Number` | `0.3`  |
| transition | `String` | `ease-out` |


# Author
[Surmon](https://surmon.me)


