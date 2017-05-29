import Vue from 'vue'
import App from './App.vue'
import App2 from './App2.vue'

new Vue({
  el: '#app',
  render: h => h(App)
});

new Vue({
  el: '#app2',
  render: h => h(App2)
});
