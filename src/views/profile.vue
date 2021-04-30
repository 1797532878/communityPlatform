<template>
  <div class="nk-container">
    <!-- 头部 -->
    <Header></Header>
    <!-- 内容 -->
    <div class="main">
      <div class="container">
        <!-- 选项 -->
        <Profile></Profile>
        <!-- 个人信息 -->
        <div class="media mt-5">
          <img :src="user.headerUrl" class="align-self-start mr-4 rounded-circle" alt="用户头像" style="width:50px;">
          <div class="media-body">
            <h5 class="mt-0 text-warning">
              <span v-text="user.username">nowcoder</span>
              <input type="hidden" :value = "user.id"></input>
              <button type="button" class="btn btn-sm float-right mr-5 follow-btn" :class="follow ? 'btn-secondary' : 'btn-info'"
              v-text="follow ? '已关注' : '关注TA'" v-show="loginUserId != 0 && user.id != loginUserId">关注TA</button>
              <input type="hidden" :value = "loginUserId"></input>
            </h5>
            <div class="text-muted mt-3">
              <span>注册于 <i class="text-muted">{{user.createTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</i></span>
            </div>
            <div class="text-muted mt-3 mb-5">
              <span>关注了 <a class="text-primary" href="/followee" @click="toFollowee"><b v-text="followeeCount">5</b></a> 人</span>
              <span class="ml-4">粉丝 <a class="text-primary" href="/follower" @click="toFollower"><b v-text="followerCount">123</b></a> 人</span>
              <span class="ml-4">获得了 <i class="text-danger"><i v-text="likeCount">87</i></i> 个赞</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 尾部 -->
  </div>
</template>

<script>
import Header from "../components/Header";
import Profile from "../components/profile"
export default {
  data () {
    return {
      user: {},
      likeCount: 0,
      loginUserId: localStorage.getItem("userId"),
      followeeCount: 0,
      followerCount: 0,
      follow: true
    }
  },
  components: {
    Header,
    Profile
  },
  created() {
      const _this = this
      _this.$axios.post('http://localhost:8081/communityPlatform/user/profile/' + sessionStorage.getItem("profileUserId")
      ).then( res => {
        if (res.data.code === 0) {
          console.log('profile:')
          console.log(res.data)
          _this.user = res.data.user
          _this.follow = res.data.hasFollowed
          _this.likeCount = res.data.likeCount
          _this.followeeCount = res.data.followeeCount
          _this.followerCount = res.data.followerCount
          console.log(_this.follow)
        }
      })
  },
  methods: {
    toFollowee () {
      sessionStorage.setItem("userIdOfFollowee",this.user.id)
    },
    toFollower () {
      sessionStorage.setItem("userIdOfFollower",this.user.id)
    }
  }
}
</script>

<style scoped>

</style>
