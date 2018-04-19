<template>
    <div class="comment-wrap">
        <div class="comment-info">
            <img src="../../resources/images/2.jpg"/>
        </div>
        <div class="comment-main">
            <textarea rows="4" class="comment-textarea"></textarea>
        </div>
        <div class="comment-footer">
            <button class="comment-btn">发表评论</button>
        </div>
        <div class="comment-reply">
            <h4 class="comment-reply-header">评论区</h4>
            <div class="comment-reply-main">
                <div class="single-comment-wrap">
                    <div class="comment-info">
                        <img src="../../resources/images/2.jpg"/>
                    </div>
                    <div class="single-comment-content-wrap">
                        <p class="single-comment-content"><span class="commentator">tangjiahao</span>:&nbsp;这才是内容</p>
                    </div>
                </div>

                <div class="single-comment-wrap">
                    <div class="comment-info">
                        <img src="../../resources/images/2.jpg"/>
                    </div>
                    <div class="single-comment-content-wrap">
                        <p class="single-comment-content"><span class="commentator">tangjiahao</span>:&nbsp;这才是内容</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'comment',
        data () {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style>
    @import '../../css/App/comment.css';
</style>