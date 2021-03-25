<template>
  <div class="nk-container">
    <!-- 头部 -->
    <Header></Header>
    <!-- 内容 -->
    <div class="main">
      <div class="container pl-5 pr-5 pt-3 pb-3 mt-3 mb-3">
        <h3 class="text-center text-info border-bottom pb-3">登&nbsp;&nbsp;录</h3>
        <form class="mt-5" :model="Form">
          <div class="form-group row">
            <label for="username" class="col-sm-2 col-form-label text-right">账号:</label>
            <div class="col-sm-10">
<!--  is-invalid会调用下面的框 <input type="text" class="form-control is-invalid" id="username" placeholder="请输入您的账号!" required>-->
              <input type="text" class="form-control" id="username" v-model="Form.username" placeholder="请输入您的账号!" required>
              <div class="invalid-feedback">
                该账号不存在!
              </div>
            </div>
          </div>
          <div class="form-group row mt-4">
            <label for="password" class="col-sm-2 col-form-label text-right">密码:</label>
            <div class="col-sm-10">
              <input type="password" class="form-control"  autocomplete=‘new-password’ id="password" v-model="Form.password" placeholder="请输入您的密码!" required>
              <div class="invalid-feedback">
                密码长度不能小于8位!
              </div>
            </div>
          </div>
          <div class="form-group row mt-4">
            <label for="verifycode" class="col-sm-2 col-form-label text-right">验证码:</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" id="verifycode" v-model="Form.code" placeholder="请输入验证码!">
              <div class="invalid-feedback">
                验证码不正确!
              </div>
            </div>
            <div class="col-sm-4">
              <img src="http://localhost:8081/communityPlatform/kaptcha" id="kaptcha" style="width:100px;height:40px;" class="mr-2"/>
              <a href="javascript:;" @click="refresh_kaptcha()" class="font-size-12 align-bottom">刷新验证码</a>
            </div>
          </div>
          <div class="form-group row mt-4">
            <div class="col-sm-2"></div>
            <div class="col-sm-10">
              <input class="float-left" type="checkbox" id="remember-me" v-model="Form.rememberme" checked="checked">
              <label class="form-check-label float-left remember" for="remember-me" >记住我</label>
              <a href="forget.html" class="text-danger float-right">忘记密码?</a>
            </div>
          </div>
          <div class="form-group row mt-4">
            <div class="col-sm-2"></div>
            <div class="col-sm-10 text-center">
              <el-button type="primary" @click="Login()" class="loginBtn">立即登录</el-button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- 尾部 -->


  </div>
</template>

<script>
import Header from "../components/Header";
import qs from 'QS'
export default {
  components: {
    Header
  },
  data() {
    return {
      Form: {
        username: '',
        password: '',
        code: '',
        rememberme: ''
      },
    }
  },
  methods: {
    refresh_kaptcha(){
      //让浏览器以为路径变了更新验证码
      var path = "http://localhost:8081/communityPlatform/kaptcha?p=" + Math.random();
      $("#kaptcha").attr("src",path);
    },
    Login () {
      //预存this
      const _this = this
        _this.$axios.post(
          'http://localhost:8081/communityPlatform/login',
          qs.stringify(_this.Form),
        ).then( res => {
          console.log(res)
          console.log(_this.user)
          if (res.data.errorMsg){
            _this.$message.error(res.data.errorMsg)
          }else{
            sessionStorage.setItem("isLogin",true);
            _this.$router.push('/index')
          }
        })

    },

  }
}
</script>

<style scoped>
  @import "../../static/css/bootstrap.min.css";
  @import "../../static/css/global.css";
  @import "../../static/css/login.css";
  .loginBtn{
    width: 100%;
  }
</style>
