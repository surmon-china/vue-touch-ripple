<template>
  <md-card>
    <md-card-actions v-md-ink-ripple>
      <div class="md-subhead">
        <span>Example</span>
      </div>
      <md-button class="md-icon-button"
                 target="_blank"
                 href="https://github.com/surmon-china/vue-touch-ripple/tree/master/examples/01-example.vue">
        <md-icon>code</md-icon>
      </md-button>
    </md-card-actions>
    <md-card-media>
      <div class="clearfix">
        <br>
        <div v-touch-ripple>
          <h4>Buttons</h4>
        </div>
        <a @click.stop v-touch-ripple class="btn btn-default btn-block btn-lg">I'm a link</a>
        <p></p>
        <div class="btn-group btn-group-justified">
          <a @click.stop class="btn btn-primary" v-touch-ripple>I'm a button</a>
          <a @click.stop class="btn btn-danger" v-touch-ripple>I'm a button</a>
        </div>
        <p></p>
        <div class="btn-group btn-group-justified">
          <a @click.stop class="btn btn-warning" v-touch-ripple>I'm a button</a>
          <a @click.stop class="btn btn-success" v-touch-ripple>I'm a button</a>
          <a @click.stop class="btn btn-info" v-touch-ripple>I'm a button</a>
        </div>
        <br>
        <h4 v-touch-ripple>Title</h4>
        <h1 v-touch-ripple>H1</h1>
        <br>
        <h4 v-touch-ripple>Div</h4>
        <div class="alert alert-dismissible alert-warning" v-touch-ripple>
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          <h4>Warning!</h4>
          <p>Best check yo self, you're not looking too good. Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, <a @click.stop class="alert-link">vel scelerisque nisl consectetur et</a>.</p>
        </div>
        <div class="alert alert-dismissible alert-success"  v-touch-ripple>
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          <strong>Well done!</strong> You successfully read <a @click.stop class="alert-link">this important alert message</a>.
        </div>
        <div class="progress" v-touch-ripple>
          <div class="progress-bar progress-bar-danger" style="width: 80%"></div>
        </div>
        <div class="well" v-touch-ripple>Look, I'm in a well!</div>
        <ul class="list-group">
          <li class="list-group-item" v-touch-ripple>
            <span class="badge">14</span>
            Cras justo odio
          </li>
          <li class="list-group-item" v-touch-ripple>
            <span class="badge">2</span>
            Dapibus ac facilisis in
          </li>
          <li class="list-group-item" v-touch-ripple>
            <span class="badge">1</span>
            Morbi leo risus
          </li>
        </ul>
        <div class="list-group">
          <a @click.stop class="list-group-item" v-touch-ripple>
            <h4 class="list-group-item-heading">List group item heading</h4>
            <p class="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          </a>
          <a @click.stop class="list-group-item" v-touch-ripple>
            <h4 class="list-group-item-heading">List group item heading</h4>
            <p class="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          </a>
        </div>
        <br>
        <div class="row">
          <div class="col-xs-6">
            <a @click.stop class="thumbnail"  v-touch-ripple>
              <img src="http://cn.vuejs.org/images/logo.png" alt="">
            </a>
          </div>
          <div class="col-xs-6">
            <touch-ripple>
              <a @click.stop class="thumbnail">
                <img src="http://cn.vuejs.org/images/logo.png" alt="">
              </a>
            </touch-ripple>
          </div>
        </div>
      </div>
      <ul class="list">
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
        <li v-touch-ripple></li>
      </ul>
    </md-card-media>
  </md-card>
</template>

<style scoped>
</style>
