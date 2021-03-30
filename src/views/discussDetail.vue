<template>
  <div class="nk-container">
    <!-- 头部 -->
    <Header></Header>

    <!-- 内容 -->
    <div class="main">
      <!-- 帖子详情 -->
      <div class="container">
        <!-- 标题 -->
        <h6 class="mb-4">
          <img src="http://static.nowcoder.com/images/img/icons/ico-discuss.png"/>
          <span>{{post.content}}</span>
          <div class="float-right">
            <button type="button" class="btn btn-danger btn-sm">置顶</button>
            <button type="button" class="btn btn-danger btn-sm">加精</button>
            <button type="button" class="btn btn-danger btn-sm">删除</button>
          </div>
        </h6>
        <!-- 作者 -->
        <div class="media pb-3 border-bottom">
          <a href="profile.html">
            <img :src="user.headerUrl" class="align-self-start mr-4 rounded-circle user-header" alt="用户头像" >
          </a>
          <div class="media-body">
            <div class="mt-0 text-warning">{{user.username}}</div>
            <div class="text-muted mt-3">
              发布于 <b>{{post.createTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</b>
              <ul class="d-inline float-right">
                <li class="d-inline ml-2"><a href="#" class="text-primary">赞 11</a></li>
                <li class="d-inline ml-2">|</li>
                <li class="d-inline ml-2"><a href="#replyform" class="text-primary">回帖 {{post.commentCount}}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 正文 -->
        <div class="mt-4 mb-3 content">
              {{post.content}}
        </div>
      </div>
      <!-- 回帖 -->
      <div class="container mt-3">
        <!-- 回帖数量 -->
        <div class="row">
          <div class="col-8">
            <h6><b class="square"></b> <i>{{ post.commentCount }}</i>条回帖</h6>
          </div>
          <div class="col-4 text-right">
            <a href="#replyform" class="btn btn-primary btn-sm">&nbsp;&nbsp;回&nbsp;&nbsp;帖&nbsp;&nbsp;</a>
          </div>
        </div>
        <!-- 回帖列表 -->
        <ul class="list-unstyled mt-4">
          <!-- 第1条回帖 -->
          <li class="media pb-3 pt-3 mb-3 border-bottom" v-for="(comment,index) in comments">
            <a href="profile.html">
              <img :src="comment.user.headerUrl" class="align-self-start mr-4 rounded-circle user-header" alt="用户头像" >
            </a>
            <div class="media-body">
              <div class="mt-0">
                <span class="font-size-12 text-success">{{comment.user.username}}</span>
                <span class="badge badge-secondary float-right floor">{{index + 1 + (page.current-1) * page.limit}}#</span>
              </div>
              <div class="mt-2">
                {{ comment.comment.content }}
              </div>
              <div class="mt-4 text-muted font-size-12">
                <span>发布于 <b>{{comment.comment.createTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</b></span>
                <ul class="d-inline float-right">
                  <li class="d-inline ml-2"><a href="#" class="text-primary">赞(1)</a></li>
                  <li class="d-inline ml-2">|</li>
                  <li class="d-inline ml-2"><a :href="'#hui' + index" data-toggle="collapse" class="text-primary">回复({{ comment.replyCount }})</a></li>
                </ul>
              </div>
              <!-- 回复列表 -->
              <div :id="'hui' + index" :class="comment.replyCount > 0 ? '':'collapse'">
              <ul :class="'list-unstyled mt-4 bg-gray p-3 font-size-12 text-muted'">
                <!-- 回复 -->
                <li class="pb-3 pt-3 mb-3 border-bottom" v-for="(reply,index) in comment.replies">
                  <div>
                    <span v-if="reply.targetUser == null">
                      <b class="text-info">{{ reply.user.username }}</b>:&nbsp;&nbsp;
                    </span>
                    <span v-else>
                      <i class="text-info">{{reply.targetUser.username}}</i>回复
                      <b class="text-info">{{ reply.user.username }}</b>:&nbsp;&nbsp;
                    </span>
                    <span>{{ reply.reply.content }}</span>
                  </div>
                  <div class="mt-3">
                    <span>{{reply.reply.createTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
                    <ul class="d-inline float-right">
                      <li class="d-inline ml-2"><a href="#" class="text-primary">赞(1)</a></li>
                      <li class="d-inline ml-2">|</li>
                      <li class="d-inline ml-2"><a :href="'#huifu' + index" data-toggle="collapse" class="text-primary">回复</a></li>
                    </ul>
                    <div :id="'huifu' + index" class="mt-4 collapse">
                    <form>
                      <div>
                        <input type="text" v-model="replyPostForm.content" class="input-size" :placeholder="'回复' + reply.user.username"/>
                      </div>
                      <div class="text-right mt-2">
                        <button type="button" @click="replyPost(comment.comment.id,reply.user.id,2)" class="btn btn-primary btn-sm" >&nbsp;&nbsp;回&nbsp;&nbsp;复&nbsp;&nbsp;</button>
                      </div>
                    </form>
                    </div>
                  </div>
                </li>
                <!-- 回复输入框 -->
                <li class="pb-3 pt-3">
                  <form>
                    <div>
                      <input type="text" v-model="replyPostForm.content" class="input-size" placeholder="请输入你的观点"/>
                    </div>
                    <div class="text-right mt-2">
                      <button type="button" @click="replyPost(comment.comment.id,0,2)" class="btn btn-primary btn-sm" >&nbsp;&nbsp;回&nbsp;&nbsp;复&nbsp;&nbsp;</button>
                    </div>
                  </form>
                </li>
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
      <!-- 回帖输入 -->
      <div class="container mt-3" :model="replyPostForm" :rules="rules">
        <form class="replyform">
          <p class="mt-3">
            <el-input
              type="textarea"
              :autosize = "{minRows: 3}"
              placeholder="请在这里畅所欲言吧"
              v-model="replyPostForm.content">
            </el-input>
          </p>
          <p class="text-right">
            <button type="button" @click="replyPost(post.id,0,1)" class="btn btn-primary btn-sm">&nbsp;&nbsp;回&nbsp;&nbsp;帖&nbsp;&nbsp;</button>
          </p>
        </form>
      </div>
    </div>

    <!-- 尾部 -->
  </div>
</template>

<script>
import Header from "../components/Header"
import qs from 'QS'
export default {
  components: {
    Header
  },
  data () {
    return {
      post: {},
      user: {},
      comments: [],
      replyPostForm: {
        content: '',
        entityType: 0,
        entityId: 0,
        targetId: 0,
        userId: 0,
      },
      rules: {
        content: [
          { min: 1, max: 1000, message: '长度在 1 到 1000 个字符', trigger: 'blur' }
        ]
      },
      page: {
        current: 1,
        limit: 10,
        path: '',
        rows: 100
      },
    }
  },
  created() {
    const _this = this
    var id = _this.$store.state.click_postId === 0 ? sessionStorage.getItem("click_postId") : _this.$store.state.click_postId
    _this.$axios.post(
      "http://localhost:8081/communityPlatform/discuss/detail/" + id,
      _this.page
    ).then(res => {
      console.log(res)
      _this.post = res.data.post
      _this.user = res.data.user
      _this.comments = res.data.comment
      _this.page = res.data.page
      console.log(_this.comments)
    })
  },
  methods: {
    Page (current) {
      const _this = this
      _this.page.current = current
      var id = _this.$store.state.click_postId === 0 ? sessionStorage.getItem("click_postId") : _this.$store.state.click_postId

      _this.$axios.post(
        "http://localhost:8081/communityPlatform/discuss/detail/" + id,
        _this.page
      ).then(res => {
        _this.post = res.data.post
        _this.user = res.data.user
        _this.comments = res.data.comment
        _this.page = res.data.page
      })
    },
    replyPost (id,targetId,type) {
      const _this = this
      this.replyPostForm.userId = _this.user.id
      //注意这里的id类型
      this.replyPostForm.entityId = id
      this.replyPostForm.entityType = type
      console.log(targetId)
      this.replyPostForm.targetId = targetId === 0 ? 0 : targetId
      console.log(this.replyPostForm)
      _this.$axios.post(
      "http://localhost:8081/communityPlatform/comment/add/" + _this.post.id,
      qs.stringify(_this.replyPostForm)
      ).then( res => {
      console.log(res)
      if (res.data.code === 400) {
        _this.$message.error(res.data.msg)
      }
      if (res.data.code === 200) {
        _this.$router.replace({
          path: '/blankPage',
          name: 'blankPage'
        })
        sessionStorage.setItem("click_postId",res.data.discussPostId)
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
