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
              <a class="nav-link position-relative " href="javascript:;" @click="toLetter">朋友私信<span class="badge badge-danger" v-show="letterUnreadCount !== 0">{{letterUnreadCount}}</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link position-relative active" href="javascript:;" @click="toNotice">系统通知<span class="badge badge-danger" v-show="noticeUnreadCount !== 0" v-text="noticeUnreadCount">27</span></a>
            </li>
          </ul>
        </div>
        <!--   通知列表   -->
        <ul class="list-unstyled">
          <li class="media pb-3 pt-3 mb-3 border-bottom position-relative" v-show="commentNotice != null">
            <span class="badge badge-danger" v-show="commentNotice.unread !== 0" v-text="commentNotice.unread">3</span>
            <img src="http://static.nowcoder.com/images/head/reply.png" class="mr-4 user-header" alt="通知图标">
            <div class="media-body">
              <h6 class="mt-0 mb-3">
                <span>评论</span>
                <span class="float-right text-muted font-size-12">{{commentMessage.createTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
              </h6>
              <div>
                <a href="/noticeDetail" @click="topic(commentMessage.conversationId)">用户 <i v-text="commentUser.username">nowcoder</i> 评论了你的
                  <b v-text="commentNotice.entityType===1 ? '帖子' : '回复' ">帖子</b> ...</a>
                <ul class="d-inline font-size-12 float-right">
                  <li class="d-inline ml-2"><span class="text-primary">共 <i v-text="commentNotice.count == null ? 0 : commentNotice.count">3</i> 条会话</span></li>
                </ul>
              </div>
            </div>
          </li>
          <li class="media pb-3 pt-3 mb-3 border-bottom position-relative" v-show="likeNotice != null">
            <span class="badge badge-danger" v-show="likeNotice.unread !== 0" v-text="likeNotice.unread">3</span>
            <img src="http://static.nowcoder.com/images/head/like.png" class="mr-4 user-header" alt="通知图标">
            <div class="media-body">
              <h6 class="mt-0 mb-3">
                <span>赞</span>
                <span class="float-right text-muted font-size-12">{{likeMessage.createTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
              </h6>
              <div>
                <a href="/noticeDetail" @click="topic(likeMessage.conversationId)">用户 <i v-text="likeUser.username">nowcoder</i> 点赞了你的
                  <b v-text="likeNotice.entityType === 1 ? '帖子' : '回复' ">帖子</b> ...</a>
                <ul class="d-inline font-size-12 float-right">
                  <li class="d-inline ml-2"><span class="text-primary">共 <i v-text="likeNotice.count == null ? 0 : likeNotice.count">3</i> 条会话</span></li>
                </ul>
              </div>
            </div>
          </li>
          <li class="media pb-3 pt-3 mb-3 border-bottom position-relative" v-show="followNotice != null">
            <span class="badge badge-danger" v-show="followNotice.unread !== 0" v-text="followNotice.unread">3</span>
            <img src="http://static.nowcoder.com/images/head/follow.png" class="mr-4 user-header" alt="通知图标">
            <div class="media-body">
              <h6 class="mt-0 mb-3">
                <span>关注</span>
                <span class="float-right text-muted font-size-12">{{followMessage.createTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
              </h6>
              <div>
                <a href="/noticeDetail" @click="topic(followMessage.conversationId)">用户 <i v-text="followUser.username">nowcoder</i> 关注了你 ...</a>
                <ul class="d-inline font-size-12 float-right">
                  <li class="d-inline ml-2"><span class="text-primary">共 <i v-text="followNotice.count == null ? 0 : followNotice.count">3</i> 条会话</span></li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 尾部 -->
  </div>
</template>

<script>
import qs from 'QS'
import Header from "../components/Header";
export default {
  components: {
    Header
  },
  data () {
    return {
      userId: 0,
      commentNotice: {},
      likeNotice: {},
      letterUnreadCount: 0,
      noticeUnreadCount: 0,
      followNotice: {},
      commentMessage: {},
      likeMessage:{},
      followMessage:{},
      commentUser: {},
      likeUser:{},
      followUser:{}
    }
  },
  created() {
    const _this = this
    _this.userId = localStorage.getItem("userId")
    _this.$axios.post(
      "http://localhost:8081/communityPlatform/notice/list",
    ).then(res=>{
      console.log(res)
      if (res.data.commentNotice != null){
        _this.commentNotice = res.data.commentNotice
        _this.commentMessage = res.data.commentNotice.message
        _this.commentUser = res.data.commentNotice.user
      }
      if (res.data.likeNotice != null) {
        _this.likeNotice = res.data.likeNotice
        _this.likeMessage = res.data.likeNotice.message
        _this.likeUser = res.data.likeNotice.user
      }
      if (res.data.followNotice != null) {
        _this.followNotice = res.data.followNotice
        _this.followMessage = res.data.followNotice.message
        _this.followUser = res.data.followNotice.user
      }
      _this.letterUnreadCount = res.data.letterUnreadCount
      _this.noticeUnreadCount = res.data.noticeUnreadCount
    })
  },
  methods: {
    topic (topic) {
      sessionStorage.setItem("topic",topic)
    },
    toLetter() {
      this.$router.push("/letter")
    },
    toNotice () {
      this.$router.push("/notice")
    }
  }
}
</script>

<style scoped>

</style>
