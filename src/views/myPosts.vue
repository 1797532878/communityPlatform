<template>
  <div class="nk-container">
    <!-- 头部 -->
    <Header></Header>

    <!-- 内容 -->
    <div class="main">
      <div class="container">
        <!-- 选项 -->
        <Profile></Profile>
        <!-- 我的帖子 -->
        <div class="mt-4">
          <h6><b class="square"></b> 发布的帖子(<i v-text="postsCount">93</i>)</h6>
          <ul class="list-unstyled mt-4 pl-3 pr-3">
            <li class="border-bottom pb-3 mt-4" v-for="(post,index) in postsList">
              <div class="font-size-16 text-info">
                <a href="/discussDetail" @click="changeClickId(post.post.id)" class="text-info" v-html="post.post.title">备战春招，面试刷题跟他复习，一个月全搞定！</a>
              </div>
              <div class="mt-1 font-size-14" v-text="post.post.content">
                金三银四的金三已经到了，你还沉浸在过年的喜悦中吗？
                如果是，那我要让你清醒一下了：目前大部分公司已经开启了内推，正式网申也将在3月份陆续开始，金三银四，春招的求职黄金时期已经来啦！！！
                再不准备，作为19应届生的你可能就找不到工作了。。。作为20届实习生的你可能就找不到实习了。。。
                现阶段时间紧，任务重，能做到短时间内快速提升的也就只有算法了，
                那么算法要怎么复习？重点在哪里？常见笔试面试算法题型和解题思路以及最优代码是怎样的？
                跟左程云老师学算法，不仅能解决以上所有问题，还能在短时间内得到最大程度的提升！！！
              </div>
              <div class="text-right font-size-12 text-muted">
                赞 <i class="mr-3" v-text="post.likeCount">11</i> 发布于 <b>{{post.post.createTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</b>
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
  </div>
</template>

<script>
import Header from "../components/Header";
import Profile from "../components/profile"
export default {
  data () {
    return {
      page: {
        current: 1,
        limit: 10,
        path: '',
        rows: 100
      },
      postsCount: 0,
      postsList:[]
    }
  },
  components: {
    Header,
    Profile
  },
  created() {
    const _this = this
    _this.$axios.post(
      "http://localhost:8081/communityPlatform/user/post",
      _this.page
    ).then( res=> {
      console.log(res)
      _this.page = res.data.page
      _this.postsList = res.data.postsList
      _this.postsCount = res.data.postsCount
    })
  },
  methods: {
    Page (current) {
      const _this = this
      _this.page.current = current
      _this.$axios.post("http://localhost:8081/communityPlatform/user/post",
        _this.page
      ).then(res => {
        console.log(res)
        _this.page = res.data.page
        _this.postsList = res.data.postsList
        _this.postsCount = res.data.postsCount
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
