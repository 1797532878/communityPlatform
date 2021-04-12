<template>
  <div class="nk-container">
    <!-- 头部 -->
    <Header></Header>

    <!-- 内容 -->
    <div class="main">
      <div class="container">
        <h6><b class="square"></b> 相关帖子</h6>
        <!-- 帖子列表 -->
        <ul class="list-unstyled mt-4">
          <li class="media pb-3 pt-3 mb-3 border-bottom" v-for="(post,index) in discussPosts">
            <img :src="post.author.headerUrl" class="mr-4 rounded-circle" alt="用户头像"  style="width:50px;height:50px;">
            <div class="media-body">
              <h6 class="mt-0 mb-3">
                <a href="/discussDetail"  @click="changeClickId(post.post.id)" v-html="post.highlightTitle">备战<em>春招</em>，面试刷题跟他复习，一个月全搞定！</a>
              </h6>
              <div class="mb-3" v-html="post.highlightContent">
                金三银四的金三已经到了，你还沉浸在过年的喜悦中吗？ 如果是，那我要让你清醒一下了：目前大部分公司已经开启了内推，正式网申也将在3月份陆续开始，金三银四，<em>春招</em>的求职黄金时期已经来啦！！！ 再不准备，作为19应届生的你可能就找不到工作了。。。作为20届实习生的你可能就找不到实习了。。。 现阶段时间紧，任务重，能做到短时间内快速提升的也就只有算法了， 那么算法要怎么复习？重点在哪里？常见笔试面试算法题型和解题思路以及最优代码是怎样的？ 跟左程云老师学算法，不仅能解决以上所有问题，还能在短时间内得到最大程度的提升！！！
              </div>
              <div class="text-muted font-size-12">
                <u class="mr-3" v-text="post.author.username">寒江雪</u> 发布于 <b>{{post.post.createTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</b>
                <ul class="d-inline float-right">
                  <li class="d-inline ml-2">赞 <i v-text="post.likeCount">11</i></li>
                  <li class="d-inline ml-2">|</li>
                  <li class="d-inline ml-2">回复 <i v-text="post.post.commentCount">7</i></li>
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
import Header from "../components/Header"
import qs from "QS"
export default {
  components: {
    Header
  },
  data () {
    return {
      page: {
        current: 1,
        limit: 10,
        path: '',
        rows: 100
      },
      discussPosts: [],
      keyword: '',
      current: 0,
    }
  },
  methods: {
    Page (current) {
      const _this = this
      _this.page.current = current
      const page = _this.page
      const keyword = sessionStorage.getItem('keyword')
      _this.$axios.post(
        "http://localhost:8081/communityPlatform/search",
        qs.stringify({
          keyword,
          current,
          page,
        })
      ).then(res => {
        console.log(res)
        _this.discussPosts = res.data.discussPosts
        _this.page = res.data.page
      })
    },
    changeClickId (id) {
      sessionStorage.setItem("click_postId",id)
    },
  },
  created() {
    const _this = this
    const keyword = sessionStorage.getItem('keyword')
    const page = _this.page
    _this.$axios.post(
      "http://localhost:8081/communityPlatform/search",
      qs.stringify({
        keyword,
        page
      })
    ).then(res => {
      console.log(res)
      _this.discussPosts = res.data.discussPosts
      _this.page = res.data.page
    })
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
