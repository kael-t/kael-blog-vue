<template>
    <transition name="toast">
        <div class="toast-wrap" v-show="isShow">
            <div class="toast-msg">{{msg}}</div>
        </div>
    </transition>
</template>

<script>
    export default {
        data() {
            return {
                msg: '',
                isShow: false,
            }
        },
        methods:{
            toast: function (msg) {
                const _self = this;

                this.msg = msg;
                this.isShow = true;
                setTimeout(() => this.isShow = false,2500)
            }
        }
    }
</script>

<style>
    @import "../css/toast.css";
</style>