import Vue from "vue"; //会去node_modules\vue\package.json
import App from '../component/App.vue';
import router from '../router/router';
import VueResource from 'vue-resource';
import loading from './plugins/loading';
import toast from './plugins/toast';

Vue.use(toast);
Vue.use(loading, {});
Vue.use(VueResource);

require("!style-loader!css-loader!../css/App/common.css");//require css文件的时候都要加上loader前缀!style-loader!css-loader!.
require("!style-loader!css-loader!./../css/rem.css");

new Vue({
    el:"#app",
    router,
    render: h => h(App),
});