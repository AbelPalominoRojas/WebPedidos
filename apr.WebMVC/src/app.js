import './scss/app.scss';

var rooturl = window.location.origin;
window.rooturl = rooturl;

import Vue from 'vue';
window.Vue = Vue;

window.Popper = require('popper.js');
window.$ = window.jQuery = require('jquery');
require('bootstrap');

window.axios = require('axios');

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('categoria-component', require('./components/categoria/CategoriaComponent.vue').default);
Vue.component('producto-component', require('./components/producto/ProductoComponent.vue').default);
Vue.component('pedido-list-component', require('./components/pedido/PedidoListComponent.vue').default);
Vue.component('pedido-form-component', require('./components/pedido/PedidoFormComponent.vue').default);

new Vue({
    el: '#app'
});