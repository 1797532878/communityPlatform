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
                <a class="nav-link position-relative" v-show="isLogin" href="/letter">消息<span class="badge badge-danger">12</span></a>
              </li>
              <li class="nav-item ml-3 btn-group-vertical">
                <a class="nav-link" v-show="!isLogin" href="/register">注册</a>
              </li>
              <li class="nav-item ml-3 btn-group-vertical">
                <a class="nav-link" v-show="!isLogin" href="/login">登录</a>
              </li>
              <li class="nav-item ml-3 btn-group-vertical dropdown" v-show="isLogin">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img :src="user.headerUrl" class="rounded-circle" style="width:30px;"/>
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item text-center" href="/profile" @click="toProfile">个人主页</a>
                  <a class="dropdown-item text-center" href="/setting">账号设置</a>
                  <a class="dropdown-item text-center" @click="logout()" href="#">退出登录</a>
                  <div class="dropdown-divider"></div>
                  <span class="dropdown-item text-center text-secondary">{{ user.username }}</span>
                </div>
              </li>
            </ul>
            <!-- 搜索 -->
            <form class="form-inline my-2 my-lg-0" action="search.html">
              <input class="form-control mr-sm-2" type="search" aria-label="Search" />
              <button class="btn btn-outline-light my-2 my-sm-0" type="submit">搜索</button>
            </form>
          </div>
        </nav>
      </div>
    </header>
</template>


<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      isLogin: false,
      user: {}
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
      }else {
        _this.isLogin = false
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
    }
  }
}
</script>


<style>
@import "../../static/css/bootstrap.min.css";
@import "../../static/css/global.css";
@import "../../static/css/login.css";
</style>
