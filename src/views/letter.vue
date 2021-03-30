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
              <a class="nav-link position-relative active" href="/letter">朋友私信<span class="badge badge-danger">{{letterUnreadTotalCount}}</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link position-relative" href="notice.html">系统通知<span class="badge badge-danger">27</span></a>
            </li>
          </ul>
          <button type="button" class="btn btn-primary btn-sm position-absolute rt-0" data-toggle="modal" data-target="#sendModal">发私信</button>
        </div>
        <!-- 弹出框 -->
        <div class="modal fade" id="sendModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">发私信</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">发给：</label>
                    <input type="text" class="form-control" id="recipient-name">
                  </div>
                  <div class="form-group">
                    <label for="message-text" class="col-form-label">内容：</label>
                    <textarea class="form-control" id="message-text" rows="10"></textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" id="sendBtn">发送</button>
              </div>
            </div>
          </div>
        </div>
        <!-- 提示框 -->
        <div class="modal fade" id="hintModal" tabindex="-1" role="dialog" aria-labelledby="hintModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="hintModalLabel">提示</h5>
              </div>
              <div class="modal-body" id="hintBody">
                发送完毕!
              </div>
            </div>
          </div>
        </div>

        <!-- 私信列表 -->
        <ul class="list-unstyled">
          <li class="media pb-3 pt-3 mb-3 border-bottom position-relative" v-for="(conversation,index) in conversations">
            <span class="badge badge-danger" v-text="conversation.unreadCount" v-show="conversation.unreadCount !== 0">3</span>
            <a href="profile.html">
              <img :src="conversation.targetUser.headerUrl" class="mr-4 rounded-circle user-header" alt="用户头像" >
            </a>
            <div class="media-body">
              <h6 class="mt-0 mb-3">
                <span class="text-success" v-text="conversation.targetUser.username">落基山脉下的闲人</span>
                <span class="float-right text-muted font-size-12">{{conversation.conversation.createTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
              </h6>
              <div>
                <a href="/letterDetail" @click="toDetail(conversation.conversation.conversationId)"
                   v-text="conversation.conversation.content">米粉车, 你来吧!</a>
                <ul class="d-inline font-size-12 float-right">
                  <li class="d-inline ml-2"><a href="#" class="text-primary">共{{conversation.letterCount}}条会话</a></li>
                </ul>
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
                       @current-change="Page">
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
      letterUnreadTotalCount: 0,
      conversations: []
    }
  },
  components: {
    Header
  },
  created() {
    const _this = this
    _this.$axios.post(
      "http://localhost:8081/communityPlatform/letter/list",
      _this.page
    ).then( res => {
      console.log(res)
      if (res.data.code === 400) {
        _this.$message.error(res.data.msg)
        _this.$router.push("/login")
      }
      _this.letterUnreadTotalCount = res.data.letterUnreadTotalCount
      _this.conversations = res.data.conversations
      _this.page = res.data.page
    })
  },
  methods: {
    Page (current) {
      const _this = this
      _this.page.current = current
      console.log(current)
      _this.$axios.post(
        "http://localhost:8081/communityPlatform/letter/list",
        _this.page
      ).then(res => {
        console.log(res)
        if (res.data.code === 400) {
          _this.$message.error(res.data.msg)
          _this.$router.push("/login")
        }
        _this.letterUnreadTotalCount = res.data.letterUnreadTotalCount
        _this.conversations = res.data.conversations
        _this.page = res.data.page
      })
    },
    toDetail (conversationId) {
      sessionStorage.setItem("conversationId",conversationId)
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
