<template>
    <div class="g-container">
        <div class="blog-info-wrap">
            <h4 class="blog-info-title">博客信息</h4>
            <div class="blog-info-content">
                <div class="info-item">
                    <label>博主名字：</label>
                    <div class="info"><input type="text" v-model="blogInfo.name"></div>
                </div>
                <div class="info-item">
                    <label>个人签名：</label>
                    <div class="info"><input type="text" v-model="blogInfo.personalizedSignature"></div>
                </div>
                <div class="info-item">
                    <label>QQ：</label>
                    <div class="info"><input type="text" v-model="blogInfo.qq"></div>
                </div>
                <div class="info-item">
                    <label>微博：</label>
                    <div class="info"><input type="text" v-model="blogInfo.weibo"></div>
                </div>
                <div class="info-item">
                    <label>个人介绍：</label>
                    <div class="info">
                        <div class="editableDiv" contenteditable="true" v-html="blogInfo.aboutMe"></div>
                    </div>
                </div>
                <div class="info-item">
                    <button class="save-btn" @click="updateBloggerInfo">保存信息</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import config from '../../js/config/config';
    import utils from '../../js/utils';

    export default {
        name: 'bloginfo',
        data() {
            return {
                blogInfo: {
                    name: '',
                    personalizedSignature: '',
                    qq: '',
                    weibo: '',
                    aboutMe: '',
                }
            }
        },
        methods: {
            updateBloggerInfo: function () {
                let _data = {};

                _data._id = utils.getCookie('_id');

                _data.info = this.blogInfo;

                this.$loading.showLoading();
                this.$http.post(config.url + '/blogger/updateBlogger', _data).then(function (response) {
                    this.$loading.closeLoading();
                    this.toast.toast(response.data.msg);

                }).catch(function (e) {
                    this.$loading.closeLoading();
                    this.toast.toast(e);
                });
            }
        },
        mounted: function() {
            this.$nextTick(function () {
                this.$loading.showLoading();
                this.$http.post(config.url + '/blogger/getBloggerInfo').then(function (response) {
                    this.$loading.closeLoading();
                    if (response.data.success === 'ok') {
                        let _data = response.data.data;

                        this.blogInfo.name = _data.name;
                        this.blogInfo.personalizedSignature = _data.personalizedSignature;
                        this.blogInfo.qq = _data.qq;
                        this.blogInfo.weibo = _data.weibo;
                        this.blogInfo.aboutMe = _data.aboutMe;

                        utils.setCookie('_id', _data._id);

                    }else {
                        this.toast.toast(response.data.msg);
                    }
                }).catch(function (e) {
                    this.$loading.closeLoading();
                    this.toast.toast(e);
                });
            });
        }
    }
</script>

<style>
    @import '../../css/admin/bloginfo.css';
</style>