<template>
    <!-- 头部 -->
    <header class="bg-dark sticky-top" >
      <div class="container">
        <!-- 导航 -->
        <nav class="navbar navbar-expand-lg navbar-dark">
          <!-- logo -->
          <a class="navbar-brand" href="#"></a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <!-- 功能 -->
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item ml-3 btn-group-vertical">
                <a class="nav-link" href="/index">首页</a>
              </li>
              <li class="nav-item ml-3 btn-group-vertical">
                <a class="nav-link" href="javascript:;" @click="toShop">商品</a>
              </li>
              <li class="nav-item ml-3 btn-group-vertical">
                <a class="nav-link position-relative" v-show="isLogin" href="javascript:;" @click="toLetter">消息<span class="badge badge-danger"
                 v-show="unreadCount != 0" v-text="unreadCount">12</span></a>
              </li>
              <li class="nav-item ml-3 btn-group-vertical dropdown" v-show="isLogin">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img :src="user.headerUrl" class="rounded-circle" style="width:30px;"/>
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item text-center" href="javascript:;" @click="toProfile">个人主页</a>
                  <a class="dropdown-item text-center" href="javascript:;" @click="toSetting">账号设置</a>
                  <a class="dropdown-item text-center" @click="logout()" href="javascript:;">退出登录</a>
                  <div class="dropdown-divider"></div>
                  <span class="dropdown-item text-center text-secondary">{{ user.username }}</span>
                </div>
              </li>
              <li class="nav-item ml-3  btn-group-vertical">
                <a class="nav-link" v-show="!isLogin" href="javascript:;" @click="toRegister">注册</a>
              </li>
              <li class="nav-item ml-3 btn-group-vertical">
                <a class="nav-link" v-show="!isLogin" href="javascript:;" @click="toLogin">登录</a>
              </li>
            </ul>
            <!-- 搜索 -->
            <form class="form-inline my-2 my-lg-0" :model="search" :rules = "rules">
              <input class="form-control mr-sm-2" v-model="search.keyword" aria-label="Search" />
              <button class="btn btn-outline-light my-2 my-sm-0"  @click="submit('search')" type="button">搜索</button>
            </form>
            <li class="nav-item ml-3 btn-group-vertical">
              <carPanel></carPanel>
            </li>
          </div>
        </nav>
      </div>
    </header>
</template>


<script>
import carPanel from './car-panel'
import qs from "QS";
export default {
  components: {
    carPanel
  },
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      isLogin: false,
      user: {},
      unreadCount: 0,
      search: {
        keyword: '',
      },
      rules: {
        keyword: [
          { required: true, message: '请输入原始密码', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    const _this = this
    _this.$axios.get(
      "http://localhost:8081/communityPlatform/confirmLogin"
    ).then( res => {
      //console.log(res)
      if (res.data.code === 200) {
        _this.isLogin = true
        _this.user = res.data.user
        //console.log(_this.user)
        _this.$store.state.userId = _this.user.userId
        localStorage.setItem("userId",res.data.user.id)
        sessionStorage.setItem("loginUser",res.data.user)
        sessionStorage.setItem("isLogin",true)
        _this.unreadCount = res.data.unreadCount
      }else {
        _this.isLogin = false
        sessionStorage.setItem("isLogin",false)
      }
    })
  },
  methods: {
      logout () {
        const _this = this
        _this.$axios.get('http://localhost:8081/communityPlatform/logout'
        ).then( res => {
            if (res.data.code === 200){
              sessionStorage.clear()
              localStorage.setItem("userId",0)
              _this.$router.push("/login")
            }else {
              _this.$message.error("退出失败");
            }
        })
      },
    toProfile () {
        sessionStorage.setItem("profileUserId",this.user.id)
      this.$router.push("/profile")
    },
    submit () {
      sessionStorage.setItem("keyword",this.search.keyword)
      if (this.$route.name === 'search') {
        this.$router.replace({
          path: '/blankPage',
          name: 'blankPage'
        })
        this.$store.state.blankPageTo = '/search'
      }else {
        this.$router.push("/search")
      }
    },
    toShop () {
        this.$router.push("/shop")
    },
    toLetter () {
        this.$router.push("/letter")
    },
    toSetting () {
        this.$router.push("/setting")
    },
    toRegister () {
        this.$router.push("/register")
    },
    toLogin () {
        this.$router.push("/login")
    }
  }
}
</script>


<style>
@import "../../static/css/bootstrap.min.css";
@import "../../static/css/global.css";
@import "../../static/css/login.css";
.header {
  height: 200px;
}
</style>
