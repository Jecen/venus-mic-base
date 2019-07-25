<template>
  <div class='page page-404'>
    <img class='error-img' :src='info.img' alt='img'>
    <p class='error-msg'>{{info.msg}}</p>
    <Button v-if='info.btn' type='primary' @click='info.btn'>返回</Button>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  computed: {
    info() {
      const { params: { code }} = this.$route
      switch (code) {
        case '404':
          return {
            img: require('./assets/404.png'),
            msg: '抱歉，你访问的页面不存在！',
            btn: () => this.$router.go(-1),
          }
        case '403':
          return {
            img: require('./assets/403.png'),
            msg: '抱歉，你当前权限无法访问该页面！',
            btn: () => this.$router.go(-1),
          }
        case '500':
          return {
            img: require('./assets/500.png'),
            msg: '抱歉，系统错误，请联系管理员！',
            btn: () => this.$router.go(-1),
          }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.page-404{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .error-img{
    width: 342px;
    height: 321px;
    transform: translateX(24px);
  }
  .error-msg{
    font-size: 20px;
    color: #999999;
    margin: 16px 0 24px;
  }
}
</style>

