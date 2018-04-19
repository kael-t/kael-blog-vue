import Toast from '../../component/toast.vue';

export default {
    install(Vue, options){

        let $vm = null;

        if(!$vm){
            const ToastPlugin = Vue.extend(Toast);

            $vm = new ToastPlugin();

            $vm.$mount();

            document.querySelector('body').appendChild($vm.$el);
        }

        let _toast = {
            toast: $vm.toast
        };

        if(!Vue.toast) {
            Vue.toast = _toast;
        }

        Vue.prototype.toast = _toast;
    }
}