import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#009688',
    secondary: '#00bcd4',
    accent: '#004D40',
    error: '#ff5722',
    warning: '#ff9800',
    info: '#2196f3',
    success: '#4caf50'
  }
})
