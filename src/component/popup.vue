<template>
    <div class="mask-transition mask" :class="{'pop-hidden':hidden}">
        <div class="modal-wrap">
            <div class="modal-transition modal" :class="[{'modal-hidden':hidden},sizeClass]">
                <div class="modal-header">
                    <h4 class="modal-title">{{title}}</h4>
                    <div class="modal-close" @click="close()">&times;</div>
                </div>
                <div class="modal-body">
                    <slot name="modal-body"></slot>
                </div>
                <div class="modal-footer">
                    <slot name="modal-footer">
                        <button class="btn btn-primary">确定</button>
                        <button class="btn" @click="close()">取消</button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'popup',
        props: {
            size:{
                type: String,
                default: 'm',
            },
            title: {
                type: String,
                required: true,
            }
        },
        data () {
            return {
                hidden: true,
            }
        },
        watch: {

        },
        computed: {
            sizeClass: function () {
                return this.size + '-modal';
            },
        },
        methods: {
            // 打开弹出层
            open: function () {
                this.hidden = false;
            },
            // 关闭弹出层,将promise断定为reject状态
            close: function () {
                this.hidden = true;
            },
            // 确定按钮,将promise断定为完成态
            submit: function () {
                this.$emit('submit');
            },
        },
    }
</script>

<style>
    @import "../css/popup.css";
</style>