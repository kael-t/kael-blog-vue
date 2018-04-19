<template>
    <div class="g-main-content">
        <div class="g-section-title-wrap">
            <div class="g-section-title">
                <div class="title-underline"></div>
                <div class="title">文章</div>
            </div>
        </div>
        <div class="g-section-content">
            <div class="article-preview-wrap" v-for="item in articleList">
                <h3 class="article-preview-title-wrap">
                    <label class="article-preview-label">{{item.classify}}</label>
                    <span class="article-preview-title" @click="toArticleDetail(item._id)">{{item.title}}</span>
                </h3>
                <div class="article-preview-content-wrap">
                    <!--<p class="article-preview-content" v-html="item.content"></p>-->
                    <p class="article-preview-content" v-compiledMarkdown>{{item.content}}</p>
                    <p class="article-preview-content-footer">{{new Date(item.createDate).toLocaleDateString()}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import config from '../../js/config/config';
    import marked from 'marked';
    import highlight from 'highlight.js';

    export default {
        data () {
            return {
                articleList: [],
            }
        },
        methods: {
            // 文章详情路由
            toArticleDetail: function (id) {
                this.$router.push('/articleDetail/' + id);
            }
        },
        computed: {

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

            let _data = {
                status: 'publish'
            };

            this.$loading.showLoading();
            this.$http.post(config.url + '/article/getArticleListByStatus', _data).then(function (response) {
                this.$loading.closeLoading();
                if (response.data.success === 'ok') {
                    let temp = response.data.data;
                    for (let i = 0;i < temp.length;i++) {
                        temp[i].content = marked(temp[i].content);
                    }
                    this.articleList = temp;
                }else {
                    this.toast.toast(response.data.msg);
                }

            }).catch(function (e) {
                this.$loading.closeLoading();
                this.toast.toast(config.errorMsg);
            });
        },
        directives: {
            compiledMarkdown: {
                bind: function(el){
                    el.innerHTML = marked(el.innerText);
                    el.innerHTML = el.innerHTML.replace(/[^\u4e00-\u9fa5]/gi,'');

                    if(el.querySelector('pre')){
                        el.querySelector('pre').style.display = "none";
                    }
                    if(el.querySelector('blockquote')){
                        el.querySelector('blockquote').style.display = "none";
                    }
                }
            }
        },
    }
</script>

<style>
    @import "../../css/App/article.css";
    @import "../../css/admin/hightlight/atom-one-dark.css";
</style>