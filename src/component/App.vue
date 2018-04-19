<template>
    <div id="app"  class="g-container">
        <div class="left-col">
            <div class="self-introduce">
                <div class="profile-pic">
                    <img :src="headSrc" alt="">
                </div>
                <div class="self-info">
                    <h3>{{name}}</h3>
                    <h5>{{personalizedSignature}}</h5>
                </div>
                <nav class="main-nav">
                    <ul class="nav-list">
                        <li class="nav-item" v-bind:class="{'nav-item-active': $route.path==('/' || '/index')}" @click="toIndex()"><i class="iconfont icon-index"></i>首页</li>
                        <li class="nav-item" v-bind:class="{'nav-item-active': $route.path=='/picture'}" @click="toPicture()"><i class="iconfont icon-picture"></i>照片</li>
                        <li class="nav-item" v-bind:class="{'nav-item-active': $route.path=='/article' || $route.path.indexOf('/articleDetail') > -1}" @click="toArticle()"><i class="iconfont icon-article2"></i>文章</li>
                    </ul>
                </nav>
                <section class="about-me-wrap">
                    <h4><i class="iconfont icon-about-me"></i>关于我</h4>
                    <p v-html="aboutMe">
                        <!--坐标:guangzhou<br>-->
                        <!--目前还是个本科狗<br>-->
                        <!--有个很好的女朋友,希望未来能好好的<br>-->
                        <!--喜欢小猫小狗但是偏偏女朋友害怕<br>-->
                        <!--前端菜鸡一个<br>-->
                        <!--想减肥(但是停留在想的阶段)-->
                    </p>
                    <ul class="my-connection-list">
                        <li id="qq" class="my-connection-item">
                            <i class="nav-icon iconfont icon-qq"></i>
                            <span class="nav-icon-label">{{qq}}</span><br>
                        </li>
                        <li id="weibo" class="my-connection-item" @click="openWeibo()">
                            <i class="nav-icon iconfont icon-weibo"></i>
                            <span class="nav-icon-label">{{weibo}}</span>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
        <div class="main-col-wrap">
            <div class="main-col">
                <div class="g-main-container" v-bind:style="{background: backgroundColor}">
                    <transition name="fade">
                        <router-view></router-view>
                    </transition>
                </div>
            </div>
        </div>
        <!-- 悬浮按钮 -->
        <div class="float-ele float-btn" :class="{close: navBtnToggleFlag}" @click="navBtnToggle()">
            <span class="btn-line"></span>
            <span class="btn-line"></span>
            <span class="btn-line"></span>
        </div>
        <!-- 悬浮导航栏 -->
        <div class="float-ele float-menu" :class="{showing: navBtnToggleFlag}">
            <ul>
                <template v-if="loginFlag">
                    <li @click="signout()"><i class="iconfont icon-signout"></i>退出登录</li>
                </template>
                <template v-if="!loginFlag">
                    <li @click="signin()"><i class="iconfont icon-signin"></i>登录</li>
                    <li @click="signup()"><i class="iconfont icon-signup"></i>注册</li>
                </template>
            </ul>
        </div>
        <!-- 弹出层 -->
        <transition name="fade">
            <popup ref="popup" :title="popupTitle" size="xs" @submit="signin_uphandle">
                <template slot="modal-body">
                    <div class="field required">
                        <label>用户名</label>
                        <input placeholder="用户名" type="text" minlength="1" maxlength="10" v-model="username">
                    </div>
                    <div class="field required">
                        <label>密码</label>
                        <input placeholder="密码" type="password" minlength="6" maxlength="16" v-model="password">
                    </div>
                    <template v-if="popupTitle === '注册'">
                        <div class="field required">
                            <label>确认密码</label>
                            <input placeholder="确认密码" type="password" minlength="6" maxlength="16" v-model="passwordRepeat">
                        </div>
                        <div class="field required">
                            <label>性别</label>
                            <div class="selection dropdown" tabindex="0" @click="sexClick = !sexClick">
                                <i class="iconfont icon-drop dropdown-icon"></i>
                                <div class="text">{{sexText}}</div>
                                <div class="menu" :class="{hidden: !sexClick, 'menu-animation': !sexClick}" tabindex="-1">
                                    <div v-for="item in sexArr" class="menu-item" :class="{selected: item.id === curSex}" @click="handleSex(item.id)">{{item.sex}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <label>头像</label>
                            <input @change="selectHeadImg($event)" type="file" accept="image/gif, image/jpeg">
                        </div>
                        <div class="field">
                            <label>个人简介</label>
                            <textarea rows="5" v-model="selfIntroduce"></textarea>
                        </div>
                    </template>
                </template>
                <template slot-scope="props" slot="modal-footer">
                    <button class="btn btn-success" @click="handleConfirm()">{{popupTitle}}</button>
                    <button class="btn" @click="cancel()">取消</button>
                </template>
            </popup>
        </transition>
    </div>
</template>

<script>
    import popup from './popup.vue';
    import config from '../js/config/config';

    export default {
        name: 'app',
        components: {
            popup: popup,
        },
        data () {
            return {
                headSrc: "",
                name: "",
                qq: '',
                weibo: '',
                personalizedSignature: "",
//                aboutMe: '',
                aboutMe: "",

                loginFlag: false,
                headImgFile: '',
                navBtnToggleFlag: false,
                popupTitle: '',
                sexClick: false,

                curSex: 0,//当前选中的性别
                username: '',
                password: '',
                passwordRepeat: '',
                selfIntroduce: '',

                sexArr: [{
                    id: 0,
                    sex: '男',
                },{
                    id: 1,
                    sex: '女',
                },{
                    id: 2,
                    sex: '保密',
                }],
            }
        },
        computed: {
            sexText: function () {
                return this.sexArr[this.curSex].sex;
            },
            backgroundColor: function () {
                return this.$route.path.indexOf('/articleDetail') > -1 ? 'white' : '';
            }
        },
        methods: {
            // 首页路由
            toIndex: function () {
                this.$router.push('/');
            },
            // 图片页路由
            toPicture: function () {
                this.$router.push('/picture');
            },
            // 文章页路由
            toArticle: function () {
                this.$router.push('/article');
            },
            // 打开我的微博
            openWeibo: function () {
                window.open("http://weibo.com/u/2119171184?refer_flag=1001030001_&nick=Mr___TTTTTTTT&is_all=1");
            },
            // 导航按钮点击事件
            navBtnToggle: function () {
                this.navBtnToggleFlag = !this.navBtnToggleFlag;
            },
            // 登录
            signin: function () {
                this.popupTitle = '登录';
                this.navBtnToggle();
                this.$refs.popup.open();//通过$refs来调用子组件的方法, 子组件上的ref属性来区分子组件实例
            },
            // 注册
            signup: function () {
                this.popupTitle = '注册';
                this.navBtnToggle();
                this.$refs.popup.open();//通过$refs来调用子组件的方法, 子组件上的ref属性来区分子组件实例
            },
            // 退出登录
            signout: function () {
                const _self = this;
                this.navBtnToggle();
                this.$loading.showLoading();
                this.$http.post(config.url + '/user/logout').then(function(response){  //接口返回数据
                    this.$loading.closeLoading();
                    const data = response.data;

                    if(data.success === 'ok') {
                        setTimeout(function () {
                            _self.loginFlag = false;
                        },200)
                    }else {
                        this.toast.toast(data.msg)
                    }
                }).catch(function () {
                    this.toast.toast(config.errorMsg);
                    this.$loading.closeLoading();
                });
            },
            // 弹出层取消
            cancel: function () {
                this.sexClick = false;
                this.$refs.popup.close();//通过$refs来调用子组件的方法, 子组件上的ref属性来区分子组件实例
            },
            // 选择性别
            handleSex: function (sex) {
                this.curSex = sex;
            },
            // 注册或登录按钮点击事件处理
            handleConfirm: function () {
                this.$refs.popup.submit();
            },
            // submit事件回调
            signin_uphandle: function () {
                let url = config.url + '/user/';
                let formdata = new FormData();
                if(this.popupTitle === '登录'){
                    formdata.append('username', this.username);
                    formdata.append('password', this.password);
                    url += 'login';
                }else{
                    formdata.append('username', this.username);
                    formdata.append('password', this.password);
                    formdata.append('passwordRepeat', this.passwordRepeat);
                    formdata.append('sex', this.curSex);
                    formdata.append('selfIntroduce', this.selfIntroduce);
                    formdata.append('headImgFile', this.headImgFile);
                    url += 'addUser';
                }

                this.$loading.showLoading();
                this.$http.post(url, formdata).then(function(response){  //接口返回数据
                    this.$loading.closeLoading();
                    const data = response.data;

                    if(data.success === 'ok') {
                        this.loginFlag = true;
                        this.$refs.popup.close();
                    }else {
                        this.toast.toast(data.msg)
                    }
                }).catch(function (e) {
                    this.toast.toast(config.errorMsg);
                    this.$loading.closeLoading();
                });
            },
            // 选择头像
            selectHeadImg: function (event) {
                this.headImgFile = event.target.files[0];
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.$loading.showLoading();
                this.$http.post(config.url + '/blogger/getBloggerInfo').then(function(response){  //接口返回数据
                    this.$loading.closeLoading();
                    const data = response.data;

                    if(data.success === 'ok'){
                        this.name = data.data.name;
                        this.personalizedSignature = data.data.personalizedSignature;
                        this.qq = data.data.qq;
                        this.weibo = data.data.weibo;
                        this.headSrc = '/images/' + data.data.avatar;
                        this.aboutMe = data.data.aboutMe;
                    }else {
                        this.toast.toast(data.msg)
                    }

                }).catch(function (e) {
                    this.toast.toast(config.errorMsg);
                    this.$loading.closeLoading();
                });

                this.$http.post(config.url + '/api/checkLoginOrNot').then(function(response){  //接口返回数据
                    this.$loading.closeLoading();
                    const data = response.data;

                    if(data.success === 'ok'){
                        if(data.data.login) {
                            this.loginFlag = true;
                        }
                    }else {
                        this.toast.toast(data.msg);
                    }

                }).catch(function (e) {
                    this.toast.toast(config.errorMsg);
                    this.$loading.closeLoading();
                });
            });
        }
    }
</script>

<style>
    @import "../resources/iconfont/iconfont.css";
    @import "../css/App.css";
</style>