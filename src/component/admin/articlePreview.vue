<template>
    <div class="article-preview-wrap">
        <transition name="scale" mode="out-in">
            <!-- 这里用v-if是因为v-if会使组件重新渲染,重新播放过渡动画, 体验比较好 -->
            <div class="article-wrap" v-if="!articleInfoIsEmpty">
                <div class="article-content-title">{{articleInfo.title}}</div>
                <div class="article-content" v-html="articleInfo.content"></div>
                <div class="article-tool">
                    <div class="article-tool-btn" @click="toogleSlide" :class="{'article-tool-btn-active':showToolbar}"><i class="iconfont icon-tool"></i></div>
                    <transition name="slide-in">
                        <template v-if="showToolbar">
                            <ul class="article-tool-list">
                                <li class="article-tool-item" @click="deleteArticle(articleInfo._id)"><i class="iconfont icon-delete"></i>删除</li>
                                <li class="article-tool-item" @click="editArticle(articleInfo._id)"><i class="iconfont icon-edit"></i>编辑</li>
                            </ul>
                        </template>
                    </transition>

                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import config from '../../js/config/config';
    import marked from 'marked';
    import highlight from 'highlight.js';

    export default {
        data () {
            return {
                articleInfo: {},
                showToolbar: false,
            }
        },
        computed:{
            articleInfoIsEmpty: function () {
                if( JSON.stringify(this.articleInfo) === '{}' ){
                    return true;
                }else {
                    return false;
                }
            }
        },
        methods: {
            fetchData: function () {
                let id = this.$route.params.id;
                this.articleInfo = {};

                this.$loading.showLoading();
                this.$http.post(config.url + '/article/getArticleDetail', {_id: id}).then(function (response) {
                    this.$loading.closeLoading();
                    if (response.data.success === 'ok'){
                        let _data = response.data.data;
                        _data.content = marked(_data.content);
                        this.articleInfo = _data;
                    }else {
                        this.toast.toast(response.data.msg)
                    }
                }).catch(function (e) {
                    this.$loading.closeLoading();
                    this.toast.toast(config.errorMsg)
                });
            },
            toogleSlide: function () {
                this.showToolbar = !this.showToolbar;
            },
            // 删除文章
            deleteArticle: function (id) {
                if(confirm('是否确定删除该文章?')) {
                    this.$loading.showLoading();
                    this.$http.post(config.url + '/article/deleteArticleById', {_id: id}).then(response => {
                        this.$loading.closeLoading();
                        this.toast.toast('删除成功');
                        this.$emit('saveArticle');
                        this.$router.push('/article');
                    },
                    response => {
                        this.toast.toast('删除失败');
                    })
                }
            },
            // 编辑文章
            editArticle: function (id) {
                this.$router.push({path: '/article/articleEdit', query: {id: id}})
            }
        },
        watch: {
            '$route': 'fetchData'
        },
        created () {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.fetchData()
        },
        mounted: function () {
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
        }
    }
</script>

<style>
    @import "../../css/admin/articlePreview.css";
    @import "../../css/admin/hightlight/atom-one-dark.css";
</style>