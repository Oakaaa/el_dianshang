<template>
    <div>
        <el-button type="info" @click="handleLogout()">退出登录</el-button>
    </div>
</template>

<script>
export default {
  methods: {
    handleLogout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>
