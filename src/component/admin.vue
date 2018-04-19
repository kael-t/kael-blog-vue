<template>
    <div class="g-container">
        <nav class="g-left-nav">
            <div class="blog-logo">
                <i class="iconfont icon-dota"></i>
            </div>
            <ul class="nav-item-list">
                <li class="nav-item" :class="{'nav-item-active': $route.path == ('/' || '/bloginfo')}" @click="toBloginfo">
                    <i class="iconfont icon-blog"></i>
                </li>
                <li class="nav-item" :class="{'nav-item-active': $route.path.indexOf('/article') > -1}" @click="toArticle">
                    <i class="iconfont icon-article"></i>
                </li>
            </ul>
        </nav>
        <section class="g-main-content">
            <transition name="fade-left" mode="out-in">
                <router-view></router-view>
            </transition>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'admin',
        data () {
            return {

            }
        },
        computed: {

        },
        methods: {
            // 博客信息路由
            toBloginfo: function () {
                this.$router.push('/');
            },
            // 文章路由
            toArticle: function () {
                this.$router.push('/article');
            }
        }
    }
</script>

<style>
    @import "../css/admin/admin-common.css";
    @import "../css/admin/admin.css";
    @import "../resources/iconfont/iconfont.css";
</style>