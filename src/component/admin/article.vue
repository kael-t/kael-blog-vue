<template>
    <div class="g-container article-container">
        <div class="article-list-wrap">
            <div class="article-list-wrap-header">
                <i class="iconfont icon-article2"></i>
                <span>文章列表</span>
                <i class="iconfont icon-add" @click="toArticleEdit"></i>
            </div>
            <ul class="article-list">
                <li class="article-item" v-for="item in articleList">
                    <h3 class="article-title" @click="toArticlePreview(item._id)">{{item.title}}</h3>
                    <p class="article-update-time">{{new Date(item.createDate).format('yyyy-MM-dd hh:mm:ss')}}</p>
                    <i class="iconfont icon-draw" v-show="item.status === 'publish'"></i>
                </li>
            </ul>
        </div>
        <div class="article-detail">
            <transition name="scale" mode="out-in">
                <router-view @saveArticle="refreshArticleList"></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import config from '../../js/config/config';

    export default{
        data () {
            return {
                articleList: [],
            }
        },
        methods: {
            fetchData: function(){

            },
            // 文章预览路由
            toArticlePreview: function (id) {
                this.$router.push('/article/articlePreview/' + id);
            },
            // 文章编辑路由
            toArticleEdit: function () {
                this.$router.push('/article/articleEdit');
            },
            // 刷新文章列表
            refreshArticleList: function () {
                this.$loading.showLoading();
                this.$http.post(config.url + '/article/getArticleList').then(response => {
                    this.$loading.closeLoading();
                    if (response.data.success === 'ok') {
                        this.articleList = response.data.data;
                    }else {
                        this.toast.toast(response.data.msg);
                    }
                }, response => {
                    this.$loading.closeLoading();
                    console.log(response);
                });
            }
        },
        watch: {
            '$route': 'fetchData',// 监听路由变化
        },
        created: function(){
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.$loading.showLoading();
            this.$http.post(config.url + '/article/getArticleList').then(response => {
                this.$loading.closeLoading();
                if (response.data.success === 'ok') {
                    this.articleList = response.data.data;
                }else {
                    this.toast.toast(response.data.msg);
                }
            }, response => {
                this.$loading.closeLoading();
                console.log(response);
            });
        },
        mounted: function(){
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
                        format = format.replace(RegExp.$1,RegExp.$1.length == 1 ? o[k] :("00" + o[k]).substr(("" + o[k]).length));
                    }
                }
                return format;
            }
        },
    }
</script>

<style>
    @import '../../resources/iconfont/iconfont.css';
    @import '../../css/admin/article.css';
</style>