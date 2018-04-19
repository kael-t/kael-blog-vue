import Loading from '../../component/loading.vue';

export default {
    // options.container为loading的容器的选择器
    install(Vue, options){

        let $vm = null;

        if(!$vm) {
            const LoadingPlugin = Vue.extend(Loading);// 创建"子类"方便挂载

            $vm = new LoadingPlugin();

            $vm.$mount();//手动创建一个未挂载实例

            document.querySelector(options.container ? options.container : 'body').appendChild($vm.$el);// 判断有无传入选择器,有则挂载到选择器上,否则挂在到body
        }

        $vm.className = options.className ?  options.className : 'clock-loading';// 有传使用的loading的类名就用该loading,否则用clock-loading

        let loading = {
            showLoading: $vm.showLoading,
            closeLoading: $vm.closeLoading,
        };

        if (!Vue.$loading) {
            Vue.$loading = loading;
        }

        Vue.prototype.$loading = loading;
    }
}