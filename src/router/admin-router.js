/************* 路由组件模块化 ************/
import Vue from 'vue';
import VueRouter from 'vue-router';
import bloginfo from '../component/admin/bloginfo.vue';
import article from '../component/admin/article.vue';
import articlePreview from '../component/admin/articlePreview.vue';
import articleEdit from '../component/admin/articleEdit.vue';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'bloginfo',
            component:bloginfo
        },
        {
            path: '/bloginfo',
            name: 'bloginfo',
            component:bloginfo
        },
        {
            path: '/article',
            name: 'article',
            component:article,
            children: [
                {
                    path: 'articlePreview/:id',
                    name: 'articlePreview',
                    component: articlePreview
                },
                {
                    path: 'articleEdit',
                    name: 'articleEdit',
                    component: articleEdit
                },
            ]
        }
    ]
})
