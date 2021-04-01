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
                <form :model = "sendForm">
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">发给：</label>
                    <input type="text" class="form-control" id="recipient-name" :value="targetUser.username">
                  </div>
                  <div class="form-group">
                    <label for="message-text" class="col-form-label">内容：</label>
                    <textarea class="form-control" v-model="sendForm.content" id="message-text" rows="10"></textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="button" @click="sendMessage" class="btn btn-primary" id="sendBtn">发送</button>
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
              <div class="modal-body" id="hintBody" v-text="msg">
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
                <button type="button"  @click="dleMessage(letter.letter.conversationId,letter.letter.content)" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
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
import qs from "QS";
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
      letters: [],
      sendForm: {
        toName: '',
        content: ''
      },
      msg: '发送成功！'
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
    },
    sendMessage () {
      const _this = this
      _this.sendForm.toName = _this.targetUser.username
      _this.$axios.post(
        "http://localhost:8081/communityPlatform/letter/send",
        qs.stringify(_this.sendForm)
      ).then(res => {
        if (res.data.code === 1) {
          _this.msg = res.data.msg
        }else if (res.data.code === 0) {
          _this.msg = '发送成功！'
        }else if (res.data.code === 2) {
          _this.msg = res.data.msg
        }
      })
    },
    dleMessage (conversationId,content) {
      const _this = this
      let dle = {
        conversationId,
        content
      }
      _this.$axios.post(
        "http://localhost:8081/communityPlatform/letter/delete",
        qs.stringify(dle)
      ).then(res => {
        if (res.data.code === 0) {
          // 考虑用监视
          window.location.reload()
        }
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
