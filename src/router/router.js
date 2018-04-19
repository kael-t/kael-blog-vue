/************* 路由组件模块化 ************/
import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '../component/App/index.vue';
import picture from '../component/App/picture.vue';
import article from '../component/App/article.vue';
import articleDetail from '../component/App/articleDetail.vue';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'index',
            component:index
        },
        {
            path: '/index',
            name: 'index',
            component:index
        },
        {
            path: '/picture',
            name: 'picture',
            component:picture
        },
        {
            path: '/article',
            name: 'article',
            component: article
        },
        {
            path: '/articleDetail/:id',
            name: 'articleDetail',
            component: articleDetail
        }
    ]
})
