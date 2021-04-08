<template>
  <div class="nk-container">
    <!-- 头部 -->
    <Header></Header>

    <!-- 内容 -->
    <div class="main">
      <div class="container">
        <div class="row">
          <div class="col-8">
            <h6><b class="square"></b> 系统通知</h6>
          </div>
          <div class="col-4 text-right">
            <button type="button" class="btn btn-info btn-sm" onclick="location.href='/notice';">返回</button>
          </div>
        </div>

        <!-- 通知列表 -->
        <ul class="list-unstyled mt-4">
          <li class="media pb-3 pt-3 mb-2" v-for="(notice,index) in notices">
            <img :src="notice.fromUser.headerUrl" class="mr-4 rounded-circle user-header" alt="系统图标">
            <div class="toast show d-lg-block" role="alert" aria-live="assertive" aria-atomic="true">
              <div class="toast-header">
                <strong class="mr-auto" v-text="notice.fromUser.username">落基山脉下的闲人</strong>
                <small>{{notice.notice.createTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</small>
<!--                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">-->
<!--                  <span aria-hidden="true">&times;</span>-->
<!--                </button>-->
              </div>
              <div class="toast-body">
                <span v-show="notice.notice.conversationId == 'comment'">用户
                  <i v-text="notice.user.username">nowcoder</i>
                  评论了你的<b v-text="notice.entityType === 1 ? '帖子':'回复' ">帖子</b>,
                  <a class="text-primary" href="/discussDetail" @click="changeClickId(notice.postId)">点击查看</a> !
                </span>
                <span v-show="notice.notice.conversationId == 'like'">用户
                  <i v-text="notice.user.username">nowcoder</i>
                  点赞了你的<b v-text="notice.entityType === 1 ? '帖子':'回复' ">帖子</b>,
                  <a class="text-primary" href="/discussDetail" @click="changeClickId(notice.postId)">点击查看</a> !
                </span>
                <span v-show="notice.notice.conversationId == 'follow'">用户
                  <i v-text="notice.user.username">nowcoder</i>
                  关注了你,
                  <a class="text-primary" href="/profile" @click="toProfile(notice.user.id)">点击查看</a> ！
                </span>
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
      notices: [],
    }
  },
  components: {
    Header
  },
  created() {
    const _this = this
    _this.$axios.post(
      "http://localhost:8081/communityPlatform/notice/detail/" + sessionStorage.getItem("topic"),
      _this.page
    ).then(res => {
        console.log(res)
      _this.notices = res.data.notices
      _this.page = res.data.page
    })
  },
  methods: {
    Page (current) {
      const _this = this
      this.page.current = current
      _this.$axios.post("http://localhost:8081/communityPlatform/notice/detail/" + sessionStorage.getItem("topic"),
        this.page
      ).then(res => {
        console.log(res)
        _this.notices = res.data.notices
        _this.page = res.data.page
      })
    },
    changeClickId (id) {
      sessionStorage.setItem("click_postId",id)
    },
    toProfile(profileUserId) {
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
