<template>
  <div class="nk-container">
    <!-- 头部 -->
    <Header></Header>
    <!-- 内容 -->
    <div class="main">
      <div class="container">
        <div class="position-relative">
          <!-- 筛选条件 -->
          <ul class="nav nav-tabs mb-3">
            <li class="nav-item">
              <a class="nav-link" :class="orderMode == 0 ? 'active' : '' " href="javascript:;" @click="orderByNew">最新</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="orderMode == 1 ? 'active' : ''" href="javascript:;" @click="orderByHot">最热</a>
            </li>
          </ul>
          <button type="button" class="btn btn-primary btn-sm position-absolute rt-0" data-toggle="modal" v-show="isLogin" data-target="#publishModal">我要发布</button>
        </div>
        <!-- 弹出框 -->
        <div class="modal fade" id="publishModal" tabindex="-1" role="dialog" aria-labelledby="publishModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="publishModalLabel">新帖发布</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form :model="pub">
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">标题：</label>
                    <input type="text" v-model="pub.title" class="form-control" id="recipient-name">
                  </div>
                  <div class="form-group">
                    <label for="message-text" class="col-form-label">正文：</label>
                    <textarea class="form-control" v-model="pub.content" id="message-text" rows="15"></textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="submit" id="publishBtn">发布</button>
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
                发布完毕!
              </div>
            </div>
          </div>
        </div>

        <!-- 帖子列表 -->
        <ul class="list-unstyled">
          <li class="media pb-3 pt-3 mb-3 border-bottom" v-for="(post,index) in posts">
            <a href="/profile" @click="toProfile(post.user.id)">
              <img :src="post.user.headerUrl" class="mr-4 rounded-circle" alt="用户头像" style="width:50px;height:50px;">
            </a>
            <div class="media-body">
              <h6 class="mt-0 mb-3" >
                <a href="/discussDetail" @click="changeClickId(post.post.id)" v-html="post.post.title" >备战春招，面试刷题跟他复习，一个月全搞定！</a>
                <span class="badge badge-secondary bg-primary" v-show="post.post.type === 1">置顶</span>
                <span class="badge badge-secondary bg-danger" v-show="post.post.status === 1">精华</span>
              </h6>
              <div class="text-muted font-size-12">
                <u class="mr-3" v-text="post.user.username">寒江雪</u> 发布于
                <b>{{post.post.createTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</b>
                <ul class="d-inline float-right">
                  <li class="d-inline ml-2">赞 {{ post.likeCount }}</li>
                  <li class="d-inline ml-2">|</li>
                  <li class="d-inline ml-2">回帖 {{ post.post.commentCount }}</li>
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
import moment from 'moment'
import qs from 'QS'
export default {
  components: {
    Header
  },
  data () {
    return {
      posts: [],
      page: {
        current: 1,
        limit: 10,
        path: '',
        rows: 100
      },
      isLogin: sessionStorage.getItem("isLogin"),
      orderMode: 0,
      pub : {
        title: '',
        content: ''
      },
      profileUserId: 0
    }
  },
  created() {
    const _this = this
    _this.$axios.get("http://localhost:8081/communityPlatform/index",
    ).then(res => {
      console.log(res)
      _this.posts = res.data
      _this.page = res.data[0].page
      _this.orderMode = res.data[0].orderMode
    })
  },
  methods: {
    Page (current) {
      const _this = this
      const page = _this.page
      page.current = current
      const orderMode = _this.orderMode
      _this.$axios.post("http://localhost:8081/communityPlatform/index",
      qs.stringify({
        page,orderMode,current
      })
      ).then(res => {
        console.log(res)
        this.page.current = res.data[0].page.current
        this.page.rows = res.data[0].page.rows
        this.posts = res.data
        this.orderMode = res.data[0].orderMode
      })
    },
    submit () {
      const _this = this
      _this.$axios.post(
        "http://localhost:8081/communityPlatform/discuss/add",
        qs.stringify(_this.pub)
      ).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          window.location.reload()
        }
      })
    },
    changeClickId (id) {
      this.$store.state.click_postId = id
      sessionStorage.setItem("click_postId",id)
    },
    toProfile(profileUserId) {
      sessionStorage.setItem("profileUserId",profileUserId)
    },
    orderByNew () {
      this.orderMode = 0;
      const _this = this
      _this.$axios.get("http://localhost:8081/communityPlatform/index",
      ).then(res => {
        console.log(res)
        _this.posts = res.data
        _this.page = res.data[0].page
        _this.orderMode = res.data[0].orderMode
      })
    },
    orderByHot () {
      this.orderMode = 1;
      const _this = this
      const page = _this.page
      const orderMode = _this.orderMode
      _this.$axios.post("http://localhost:8081/communityPlatform/index",
        qs.stringify({
          page,orderMode
        })
      ).then(res => {
        console.log(res)
        this.page.current = res.data[0].page.current
        this.page.rows = res.data[0].page.rows
        this.posts = res.data
        this.orderMode = res.data[0].orderMode
      })
    }
  }
}
</script>

<style scoped>
@import "../../static/css/bootstrap.min.css";
@import "../../static/css/global.css";
  .pagination{
    display: block;
    margin: 0 auto;
    text-align: center;
  }
</style>
