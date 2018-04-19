<template>
    <div class="g-main-content">
        <div class="article-detail-header">
            <h2 class="article-detail-title">{{articleDetail.title}}</h2>
            <div class="article-detail-info">
                <span class="article-detail-time">{{articleDetail.createDate}}</span>
                <label class="article-detail-label">{{articleDetail.classify}}</label>
            </div>
        </div>
        <div class="article-detail-body" v-html="articleDetail.content"></div>
        <div class="article-detail-footer">
            <comment></comment>
        </div>
    </div>
</template>

<script>
    import config from '../../js/config/config';
    import marked from 'marked';
    import highlight from 'highlight.js';
    import comment from './comment.vue';

    export default {
        components: {
            comment: comment,
        },
        data () {
            return {
                articleDetail: {},
            }
        },
        methods: {
            getArticleDetail: function () {
                let id = this.$route.params.id;

                this.$loading.showLoading();
                this.$http.post(config.url + '/article/getArticleDetail', {_id: id}).then(function(response){  //接口返回数据
                    this.$loading.closeLoading();
                    let data = response.data;

                    if(data.success === 'ok'){
                        data.data.createDate = new Date(data.data.createDate).format('yyyy-MM-dd hh:mm:ss');
                        data.data.content = marked(data.data.content);
                        this.articleDetail = data.data;
                    }else {
                        this.toast.toast(data.msg)
                    }

                }).catch(function (e) {
                    this.$loading.closeLoading();
                    this.toast.toast(config.errorMsg);
                });
            }
        },
        mounted: function () {
            const _self = this;

            marked.setOptions({
                renderer: new marked.Renderer(),
                gfm: true,
                tables: true,
                breaks: true,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false,
                highlight: function (code) {
                    return highlight.highlightAuto(code).value;
                }
            });

            Date.prototype.format = function(format) {
                const o = {
                    "M+": this.getMonth() + 1,
                    "d+": this.getDate(),
                    "h+": this.getHours(),
                    "m+": this.getMinutes(),
                    "s+": this.getSeconds(),
                    "q+": Math.floor((this.getMonth() + 3) / 3),
                    "S": this.getMilliseconds()
                };

                if (/(y+)/.test(format)) {
                    format = format.replace(RegExp.$1,(this.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (let k in o){
                    if (new RegExp("(" + k + ")").test(format)){
                        format = format.replace(RegExp.$1,RegExp.$1.length === 1 ? o[k] :("00" + o[k]).substr(("" + o[k]).length));
                    }
                }
                return format;
            };

            this.$nextTick(function () {
                _self.getArticleDetail();
            });
        }
    }
</script>

<style>
    @import '../../css/App/articleDetail.css';
    @import "../../css/admin/hightlight/atom-one-dark.css";
</style>