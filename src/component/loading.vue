<template>
    <div v-show="isShow" class="loading-mask">
        <div class="loading" :class="wrap">
            <div :class="className" v-html="htmlTemplate[className]"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isShow: false,
                className: '',
                htmlTemplate: {
                    'clock-loading': '',
                    'cardiogram-loading': '<span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><div></div>'
                }
            }
        },
        computed: {
            wrap: function () {
                return this.className + '-wrap';
            }
        },
        methods: {
            showLoading: function () {
                this.isShow = true;
            },
            closeLoading: function () {
                this.isShow = false;
            }
        }
    }
</script>

<style>
    @import "../css/loading.css";
</style>