<template>
  <div class="position-relative">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link" :class="{active:show==1}" href="javascript:;" @click="toProfile">个人信息</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{active:show==2}" href="javascript:;" @click="toMyPosts">我的帖子</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{active:show==3}" href="javascript:;" @click="toMyReply">我的回复</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: ''
    }
  },
  methods: {
    toProfile () {
      this.$router.push("/profile")
      localStorage.setItem("show",'1')
    },
    toMyPosts () {
      this.$router.push("/myPosts")
      localStorage.setItem("show",'2')
    },
    toMyReply () {
      this.$router.push("/myReply")
      localStorage.setItem("show",'3')
    }
  },
  created() {
    this.show = localStorage.getItem("show")
  },
  destroyed() {
    localStorage.setItem("show",'1')
  }
}
</script>

<style scoped>
</style>
