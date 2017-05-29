import Vue from 'vue'
import App from './App.vue'
import App2 from './App2.vue'


if(document.getElementById('app') === null){
  new Vue({
    el: '#app2',
    render: h => h(App2)
  });
}else{
  new Vue({
    el: '#app',
    render: h => h(App)
  });
}


