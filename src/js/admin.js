import Vue from "vue"; //会去node_modules\vue\package.json
import router from '../router/admin-router';
import VueResource from 'vue-resource';
import admin from '../component/admin.vue';
import loading from './plugins/loading';
import toast from './plugins/toast';

Vue.use(toast);
Vue.use(VueResource);
Vue.use(loading,{});

require("!style-loader!css-loader!./../css/rem.css");

new Vue({
    el:"#admin",
    router,
    render: h => h(admin),
});