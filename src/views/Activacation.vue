<template>
  <div class="nk-container">
    <Header></Header>
    <!-- 内容 -->
    <div class="main">
      <div class="container mt-5">
        <div class="jumbotron">
          <p class="lead">您的账号已经激活成功,可以正常使用了!</p>
          <hr class="my-4">
          <p>
            您可以点此 <a id="target" href="/login" class="text-primary">链接</a>, 跳转!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
export default {
  components: {
    Header
  }
}
</script>

<style scoped>

</style>
