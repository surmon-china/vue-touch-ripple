<template>
  <md-card>
    <md-card-media>
      <div class="clearfix">
        <div class="examples">
          <div class="example">
            <touch-ripple class="love">
              <div class="heart">
                <span class="text">Surmon</span>
              </div>
            </touch-ripple>
          </div>
          <div class="example">
            <touch-ripple class="button-box" :speed="2">
              <button class="button b-1">不躲开</button>
            </touch-ripple>
            <div class="button-group">
              <touch-ripple class="button-group-box" color="#3c763d" :speed="0.7">
                <button class="button b-2">明月直入</button>
              </touch-ripple>
              <touch-ripple class="button-group-box" :speed="1.5">
                <button class="button b-3">无心可猜</button>
              </touch-ripple>
            </div>
            <div class="button-group">
              <touch-ripple class="button-group-box" color="#666" :speed="0.5">
                <button class="button b-4">是谁来自山川湖海</button>
              </touch-ripple>
              <touch-ripple class="button-group-box" color="#efefef">
                <button class="button b-5">却囿于昼夜</button>
              </touch-ripple>
              <touch-ripple class="button-group-box" :speed="1.1">
                <button class="button b-6">厨房与爱</button>
              </touch-ripple>
            </div>
          </div>
          <div class="example">
            <touch-ripple class="thumbnail-box thumbnail">
              <a @click.stop>
                <img src="http://cn.vuejs.org/images/logo.png" alt="">
              </a>
            </touch-ripple>
            <touch-ripple class="thumbnail-box thumbnail" 
                          :speed="0.3" 
                          :opacity="0.2" 
                          color="#36485e">
              <a @click.stop>
                <img src="http://cn.vuejs.org/images/logo.png" 
                              alt="">
              </a>
            </touch-ripple>
          </div>
          <div class="example">
            <touch-ripple class="h1-box" 
                          :speed="2" 
                          :opacity="0.3" 
                          color="#999" 
                          transition="ease-in-out">
              <h1 class="h1">没有任何夜晚能使我沉睡，没有任何黎明能使我醒来</h1>
            </touch-ripple>
          </div>
          <div class="example">
            <touch-ripple class="div-box" 
                          :speed="2" 
                          :opacity="0.3" 
                          color="#999" 
                          transition="cubic-bezier(0.18, 0.89, 0.32, 1.28)">
              <div class="box box-1">我要把心葬在这里，不立墓碑，也不留祭文</div>
            </touch-ripple>
            <touch-ripple class="div-box" 
                          :speed="2" 
                          :opacity="0.3" 
                          color="#999" 
                          transition="cubic-bezier(0.6, -0.28, 0.74, 0.05)">
              <div class="box box-2">兮何年，一人一马过关</div>
            </touch-ripple>
          </div>
          <div class="example">
            <touch-ripple class="text-box" 
                          :speed="2" 
                          :opacity="0.3" 
                          color="#999"
                          transition="cubic-bezier(0.89, 0.24, 0, 0.94)">
              <div class="text-box box-3">让鸟飞走，放了笼子</div>
            </touch-ripple>
            <touch-ripple class="text-box" 
                          :speed="0.7" 
                          :opacity="0.5" 
                          color="#eee"
                          transition="cubic-bezier(1,-0.24, 0, 1.92)">
              <div class="box box-4">我们告别了两年，告别的结果，总是相见</div>
            </touch-ripple>
          </div>
        </div>
      </div>
    </md-card-media>
  </md-card>
</template>

<style lang="scss" scoped>

  .examples {
    display: flex;
    justify-content: center;
    align-items: center;

    > .example {
      display: flex;
      justify-content: space-around;

      > * {
        cursor: pointer;
      }
    }
  }

  .love {
    margin: 10px 0;

    > .heart{
      position: relative;
      width: 420px;
      height: 360px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;

      > .text {
        color: white;
        z-index: 999999;
        font-size: 30px;
        margin-bottom: 60px;
        margin-left: 20px;
      }

      &:before,
      &:after {
        position: absolute;
        content: "";
        left: 220px;
        top: 10px;
        width: 220px;
        height: 340px;
        background: #fc2e5a;
        border-radius: 200px 200px 0 0;
        transform: rotate(-45deg);
        transform-origin: 0 100%;
      }

      &:after {
        left: 0;
        transform: rotate(45deg);
        transform-origin :100% 100%;
      }
    }
  }

  .button {
    width: 160px;
    height: 50px;
    border-radius: 5px;
    color: white;

    &:hover {
      filter: brightness(.8);
    }

    &.b-1 {
      background-color: blue;
    }

    &.b-2 {
      background-color: orange;
    }

    &.b-3 {
      background-color: red;
    }

    &.b-4 {
      background-color: pink;
    }

    &.b-5 {
      background-color: #3c763d;
    }

    &.b-6 {
      background-color: #36485e;
    }
  }

  .button-group {

    > .button-group-box {
      float: left;
      overflow: hidden;

      .button {
        border-radius: 0;
      }

      &:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;

        > .button {
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }
      }

      &:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;

        > .button {
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      }
    }
  }

  .h1-box {
    width: 100%;
    text-align: center;
  }

  .thumbnail {
    background-color: #efefef;
  }

  .box,
  .text-box {
    width: 500px;
    height: 300px;
    line-height: 300px;
    text-align: center;
    background: #36485e;
    color: white;

    &.box-2 {
      background: #3c763d;
    }

    &.box-3 {
      background: #3c763d;
    }
  }
</style>
