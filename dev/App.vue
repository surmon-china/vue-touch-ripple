<script setup lang="ts">
  import { reactive } from 'vue'
  import { TouchRipple } from '../src'

  const consoleLog = console.log
  const state = reactive({
    color: 'white',
    opacity: 0.4,
    transition: 'ease-out',
    duration: 400,
    keepLastRipple: true
  })
</script>

<template>
  <div class="example">
    <div class="toolbar">
      <p>
        <label for="color">color:</label>
        <select name="color" id="color" v-model="state.color">
          <option
            :value="option"
            :key="option"
            v-for="option in ['white', 'black', 'yellow', 'lawngreen', 'blue']"
          >
            {{ option }}
          </option>
        </select>
      </p>
      <p>
        <label for="opacity">opacity:</label>
        <input type="range" id="opacity" min="0.1" max="0.9" step="0.1" v-model.number="state.opacity" />
      </p>
      <p>
        <label for="transition">transition:</label>
        <select name="transition" id="transition" v-model="state.transition">
          <option
            :value="option"
            :key="option"
            v-for="option in [
              'linear',
              'ease-in',
              'ease-out',
              'steps(8, end)',
              'cubic-bezier(.29, 1.01, 1, -0.68)',
              'cubic-bezier(1, -0.24, 0, 1.92)'
            ]"
          >
            {{ option }}
          </option>
        </select>
      </p>
      <p>
        <label for="duration">duration:</label>
        <input type="range" id="duration" min="100" max="2000" step="100" v-model.number="state.duration" />
      </p>
      <p>
        <label for="keepLastRipple">keep last ripple:</label>
        <input
          id="keepLastRipple"
          type="checkbox"
          v-model="state.keepLastRipple"
          :true-value="true"
          :false-value="false"
        />
      </p>
    </div>
    <touch-ripple
      class="t-r"
      :color="state.color"
      :opacity="state.opacity"
      :transition="state.transition"
      :duration="state.duration"
      :keep-last-ripple="state.keepLastRipple"
      @touch="consoleLog('touch', $event)"
      @click="consoleLog('click', $event)"
      @start="consoleLog('start', $event)"
      @end="consoleLog('end', $event)"
    >
      <div class="target">
        <pre>{{ JSON.stringify(state, null, 2) }}</pre>
      </div>
    </touch-ripple>
  </div>
</template>

<style lang="scss">
  body {
    margin: 0;
  }

  .example {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .toolbar {
      margin-bottom: 1rem;

      select:invalid {
        color: gray;
      }
    }

    .t-r {
      width: 20rem;
      height: 20rem;
      background-color: #fc2e5a;
      clip-path: polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%);

      .target {
        width: 100%;
        height: 100%;
        background: none;
        border: none;
        color: white;
        font-size: 1.1em;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
      }
    }
  }
</style>
