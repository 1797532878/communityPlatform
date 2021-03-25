<template>
  <div class="nk-container">
    <Header></Header>
  <!-- 内容 -->
  <div class="main">
    <div class="container pl-5 pr-5 pt-3 pb-3 mt-3 mb-3">
      <h3 class="text-center text-info border-bottom pb-3">注&nbsp;&nbsp;册</h3>
      <form class="mt-5" :model="user">
        <div class="form-group row">
          <label for="username" class="col-sm-2 col-form-label text-right">账号:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="username" v-model="user.username" placeholder="请输入您的账号!" required>
            <div class="invalid-feedback">
              该账号已存在!
            </div>
          </div>
        </div>
        <div class="form-group row mt-4">
          <label for="password" class="col-sm-2 col-form-label text-right" >密码:</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" autocomplete=‘new-password’ id="password" v-model="user.password" placeholder="请输入您的密码!" required>
            <div class="invalid-feedback">
              密码长度不能小于8位!
            </div>
          </div>
        </div>
        <div class="form-group row mt-4">
          <label for="confirm-password" class="col-sm-2 col-form-label text-right" >确认密码:</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" autocomplete=‘old-password’ v-model="user.rePassword" id="confirm-password" placeholder="请再次输入密码!" required>
            <div class="invalid-feedback">
              两次输入的密码不一致!
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label for="email" class="col-sm-2 col-form-label text-right" >邮箱:</label>
          <div class="col-sm-10">
            <input type="email" class="form-control" id="email" v-model="user.email" placeholder="请输入您的邮箱!" required>
            <div class="invalid-feedback">
              该邮箱已注册!
            </div>
          </div>
        </div>
        <div class="form-group row mt-4">
          <div class="col-sm-2"></div>
          <div class="col-sm-10 text-center">
            <el-button type="primary" @click="registers()" class="registerBtn">立即注册</el-button>
          </div>
        </div>
      </form>
    </div>
  </div>
  </div>
</template>

<script>
import Header from "../components/Header";
export default {
  components: {
    Header
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
        email: '',
        rePassword: ''
      }
    }
  },
  methods: {
    registers () {
      //预存this
      const _this = this
      console.log(_this.user.username)
      if (_this.password !== _this.rePassword) {
        this.$message({
          message: '两次密码输出不一致哦',
          type: 'warning'
        });
      }else{
        _this.$axios.post(
          'http://localhost:8081/communityPlatform/register',
          _this.user
        ).then( res => {
          console.log(res);
          console.log(_this.user)
          if (res.data.errorMsg){
            _this.$message.error(res.data.errorMsg);
          }else{
            _this.$alert(res.data.msg, '注册成功', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$router.push('/login')
              }
            });

          }

        })
      }
    },

  }
}
</script>

<style scoped>
@import "../../static/css/bootstrap.min.css";
@import "../../static/css/global.css";
@import "../../static/css/login.css";
.registerBtn{
  width: 100%;
}
</style>
