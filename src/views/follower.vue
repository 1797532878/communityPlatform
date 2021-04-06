<template>
  <div class="nk-container">
    <!-- 头部 -->
    <Header></Header>

    <!-- 内容 -->
    <div class="main">
      <div class="container">
        <div class="position-relative">
          <!-- 选项 -->
          <ul class="nav nav-tabs mb-3">
            <li class="nav-item">
              <a class="nav-link position-relative" href="/followee"><i class="text-info" v-text="user.username">Nowcoder</i> 关注的人</a>
            </li>
            <li class="nav-item">
              <a class="nav-link position-relative active" href="/follower">关注 <i class="text-info" v-text="user.username">Nowcoder</i> 的人</a>
            </li>
          </ul>
          <a href="/profile" class="text-muted position-absolute rt-0">返回个人主页&gt;</a>
        </div>

        <!-- 粉丝列表 -->
        <ul class="list-unstyled">
          <li class="media pb-3 pt-3 mb-3 border-bottom position-relative"  v-for="(follower,index) in followers">
            <a href="/profile" @click="toProfile(follower.user.id)">
              <img :src="follower.user.headerUrl" class="mr-4 rounded-circle user-header" alt="用户头像" >
            </a>
            <div class="media-body">
              <h6 class="mt-0 mb-3">
                <span class="text-success" v-text="follower.user.username">落基山脉下的闲人</span>
                <span class="float-right text-muted font-size-12">关注于 <i>{{ follower.followTime | dateformat('YYYY-MM-DD : HH:mm:ss ') }}</i></span>
              </h6>
              <div>
                <input type="hidden" :value = "follower.user.id"></input>
                <button type="button" class="btn btn-sm float-right follow-btn" :class="follower.hasFollowed ? 'btn-secondary' : 'btn-info'"
                        v-text="follower.hasFollowed ? '已关注' : '关注TA' " v-show="loginUserId != 0 && follower.user.id != loginUserId ">关注TA</button>
                <input type="hidden" :value = "loginUserId"></input>
              </div>
            </div>
          </li>
        </ul>
        <!-- 分页 -->
        <el-pagination class="pagination"
                       background
                       layout="prev, pager, next"
                       :total="page.rows"
                       :current-page="page.current"
                       :page-size="page.limit"
                       @current-change="Page"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 尾部 -->
  </div>
</template>

<script>
import Header from "../components/Header";
export default {
  data () {
    return {
      page: {
        current: 1,
        limit: 10,
        path: '',
        rows: 100
      },
      user: {},
      followers: [],
      loginUserId: localStorage.getItem("userId"),
    }
  },
  components: {
    Header
  },
  created() {
    sessionStorage.setItem("userIdOfFollowee",sessionStorage.getItem('userIdOfFollower'))
    const _this = this
    _this.$axios.post(
      'http://localhost:8081/communityPlatform/followers/' + sessionStorage.getItem("userIdOfFollower"),
      _this.page
    ).then(res => {
      console.log(res)
      _this.user = res.data.user
      _this.followers = res.data.followers
      _this.hasFollowed = res.data.hasFollowed
      _this.page = res.data.page
    })
  },
  methods: {
    Page (current) {
      const _this = this
      _this.page.current = current
      _this.$axios.post(
        'http://localhost:8081/communityPlatform/followers/' + sessionStorage.getItem("userIdOfFollower"),
        _this.page
      ).then(res => {
        console.log(res)
        _this.user = res.data.user
        _this.followers = res.data.followers
        _this.hasFollowed = res.data.hasFollowed
        _this.page = res.data.page
      })
    },
    toProfile (profileUserId) {
      sessionStorage.setItem("profileUserId",profileUserId)
    }
  }
}
</script>

<style scoped>
.pagination{
  display: block;
  margin: 0 auto;
  text-align: center;
}
</style>
