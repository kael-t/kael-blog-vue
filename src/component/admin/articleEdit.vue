<template>
    <div class="g-container article-edit-wrap">
        <div class="article-title-wrap">
            <input class="article-title" type="text" placeholder="请输入文章标题" v-model="articleTitle">
        </div>
        <div class="article-toolbar">

            <div class="btn-group">
                <button v-if="this.$route.query.id" class="btn btn-error" @click="deleteArticle"><i class="iconfont icon-delete"></i>删除</button>
                <button class="btn" @click="saveDraft"><i class="iconfont icon-save-draft"></i>保存草稿</button>
                <button class="btn btn-info" @click="publishArticle"><i class="iconfont icon-publish"></i>发布文章</button>
            </div>
        </div>
        <textarea id="editor"></textarea>
    </div>
</template>

<script>
    import SimpleMDE from 'simplemde';
    import marked from 'marked';
    import highlight from 'highlight.js';
    import config from '../../js/config/config';

    export default {
        data () {
            return {
                articleTitle: '',
                content: '',
            }
        },
        methods: {
            // 删除文章
            deleteArticle: function () {
                if(confirm('是否确定删除该文章?')){
                    this.$loading.showLoading();
                    this.$http.post(config.url + '/article/deleteArticleById', {_id : this.$route.query.id}).then(response => {
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
            // 保存文章, status: 'draft':草稿, 'publish':发布
            saveArticle: function (status) {
                let _self = this;

                if (this.$route.query.id) {// url有id参数,即为编辑
                    let _data = {
                        _id: _self.$route.query.id,
                        title: _self.articleTitle,
                        content: _self.content,
                        createDate: new Date().format('yyyy-MM-dd hh:mm:ss'),
                        status: status,
//                        classify: '',
                    };

                    this.$loading.showLoading();
                    this.$http.post(config.url + '/article/updateArticle', _data).then(response => {
                        this.$loading.closeLoading();
                        this.toast.toast(response.data.msg);
                        // 如果文章信息保存成功就给父组件派发一个事件通知它刷新文章列表
                        _self.$emit('saveArticle');
                    }, response => {
                        this.$loading.closeLoading();
                        this.toast.toast(config.errorMsg);
                    });
                }else {// 没有id参数,新建
                    let _data = {
                        title: _self.articleTitle,
                        content: _self.content,
                        createDate: new Date().format('yyyy-MM-dd hh:mm:ss'),
                        status: status,
//                        classify: '',
                    };

                    this.$loading.showLoading();
                    this.$http.post(config.url + '/article/saveArticle', _data).then(response => {
                        this.$loading.closeLoading();
                        this.toast.toast(response.data.msg);
                        // 如果文章信息保存成功就给父组件派发一个事件通知它刷新文章列表
                        _self.$emit('saveArticle');
                    }, response => {
                        this.$loading.closeLoading();
                        this.toast.toast(config.errorMsg);
                    });
                }
            },
            // 保存草稿
            saveDraft: function () {
                this.saveArticle('draft');
            },
            // 发布文章
            publishArticle: function () {
                this.saveArticle('publish');
            }
        },
        mounted: function(){
            Date.prototype.format = function(format) {
                const o = {
                    "M+": this.getMonth() + 1, //month
                    "d+": this.getDate(), //day
                    "h+": this.getHours(), //hour
                    "m+": this.getMinutes(), //minute
                    "s+": this.getSeconds(), //second
                    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
                    "S": this.getMilliseconds() //millisecond
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
            };
            const _self = this;
            const smde = new SimpleMDE({
                /**
                 * api文档 https://github.com/sparksuite/simplemde-markdown-editor
                 */
                element: document.getElementById('editor'),
                autofocus: true,
                autosave: true,
                indentWithTabs: false,
                placeholder: '请在这输入正文',
                showIcons: ["code", "table"],
                previewRender: function(plainText) {
                    /**
                     * api文档 https://www.cnblogs.com/djtao/p/6224399.html
                     */
                    return marked(plainText,{
                        renderer: new marked.Renderer(),
                        gfm: true,
                        pedantic: false,
                        sanitize: false,
                        tables: true,
                        breaks: true,
                        smartLists: true,
                        smartypants: true,
                        highlight: function (code) {
                            return highlight.highlightAuto(code).value;
                        }
                    });
                },
            });
            smde.codemirror.on("change", function(){
                let value = smde.value();
                _self.content = value;
            });

            if(this.$route.query.id){
                this.$http.post(config.url + '/article/getArticleDetail', {_id: this.$route.query.id}).then(response => {
                    if(response.data.success === 'ok') {
                        this.articleTitle = response.data.data.title;
                        smde.value(response.data.data.content);
                    }else {
                        this.toast.toast(response.data.msg);
                    }
                },
                response => console.log(response))
            }
        }
    }
</script>

<style>
    @import '../../css/admin/articleEdit.css';
    @import '../../css/admin/simplemde/simplemde.min.css';
    @import '../../css/admin/hightlight/atom-one-light.css';
</style>