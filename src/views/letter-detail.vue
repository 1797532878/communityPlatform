<template>
  <div class="nk-container">
    <!-- 头部 -->
    <Header></Header>

    <!-- 内容 -->
    <div class="main">
      <div class="container">
        <div class="row">
          <div class="col-8">
            <h6><b class="square"></b> 来自 <i class="text-success" v-text="targetUser.username">落基山脉下的闲人</i> 的私信</h6>
          </div>
          <div class="col-4 text-right">
            <button type="button" class="btn btn-secondary btn-sm" onclick="location.href='/letter';">返回</button>
            <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#sendModal">给TA私信</button>
          </div>
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
                    <input type="text" class="form-control" id="recipient-name" value="落基山脉下的闲人">
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
        <ul class="list-unstyled mt-4">
          <li class="media pb-3 pt-3 mb-2" v-for="(letter,index) in letters">
            <a href="profile.html">
              <img :src="letter.fromUser.headerUrl" class="mr-4 rounded-circle user-header" alt="用户头像" >
            </a>
            <div class="toast show d-lg-block" role="alert" aria-live="assertive" aria-atomic="true">
              <div class="toast-header">
                <strong class="mr-auto" v-text="letter.fromUser.username">落基山脉下的闲人</strong>
                <small>{{letter.letter.createTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</small>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="toast-body" v-text="letter.letter.content">
                君不见, 黄河之水天上来, 奔流到海不复回!
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
      targetUser: {},
      letters: []
    }
  },
  components: {
    Header
  },
  created() {
    const _this = this
    _this.$axios.post(
      "http://localhost:8081/communityPlatform/letter/detail/" + sessionStorage.getItem("conversationId"),
      _this.page
    ).then( res => {
      console.log(res)
      _this.targetUser = res.data.targetUser
      _this.letters = res.data.letters
      _this.page = res.data.page
    })
  },
  methods: {
    Page (current) {
      const _this = this
      _this.page.current =current
      _this.$axios.post(
        "http://localhost:8081/communityPlatform/letter/detail/" + sessionStorage.getItem("conversationId"),
        _this.page
      ).then( res => {
        console.log(res)
        _this.targetUser = res.data.targetUser
        _this.letters = res.data.letters
        _this.page = res.data.page
      })
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
