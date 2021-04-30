<template>
  <div class="nk-container">
    <!-- 头部 -->
    <Header></Header>
    <!-- 内容 -->
    <div class="main">
      <div class="container">
        <!-- 选项 -->
        <Profile></Profile>
        <!-- 我的回复 -->
        <div class="mt-4">
          <h6><b class="square"></b> 回复的帖子(<i v-text="commentCounts">379</i>)</h6>
          <ul class="list-unstyled mt-4 pl-3 pr-3">
            <li class="border-bottom pb-3 mt-4" v-for="(comment,index) in commentList">
              <div class="font-size-16 text-info">
                <a href="/discussDetail" @click="changeClickId(post.post.id)" class="text-info" v-html="comment.title">备战春招，面试刷题跟他复习，一个月全搞定！</a>
              </div>
              <div class="mt-1 font-size-14" v-text="comment.comment.content">
                顶顶顶!
              </div>
              <div class="text-right font-size-12 text-muted">
                回复于 <b>{{comment.comment.createTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</b>
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
    </div>

    <!-- 尾部 -->
  </div>
</template>

<script>
import Header from "../components/Header";
import Profile from "../components/profile";
export default {
  data () {
    return {
      page: {
        current: 1,
        limit: 10,
        path: '',
        rows: 100
      },
      commentCounts: 2,
      commentList: []
    }
  },
  components: {
    Header,
    Profile
  },
  created() {
    const _this = this
    _this.$axios.post(
      "http://localhost:8081/communityPlatform/user/reply",
      _this.page
    ).then( res=> {
      console.log(res)
      _this.page = res.data.page
      _this.commentCounts = res.data.commentCounts
      _this.commentList = res.data.commentList
    })
  },
  methods: {
    Page (current) {
      const _this = this
      _this.page.current = current
      _this.$axios.post("http://localhost:8081/communityPlatform/user/reply",
        _this.page
      ).then(res => {
        console.log(res)
        _this.page = res.data.page
        _this.commentCounts = res.data.commentCounts
        _this.commentList = res.data.commentList
      })
    },
    changeClickId (id) {
      this.$store.state.click_postId = id
      sessionStorage.setItem("click_postId",id)
    },
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
