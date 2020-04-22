<template>
    <div class="login_wraper">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 登陆表单区域 -->
                <el-form ref="loginformRef" :model="loginform" :rules="rules" label-width="0px" class="login_form"><!-- :model绑定状态,:rules绑定规则,需要在el-form-item中加prop -->
                    <!-- 用户名 -->
                    <el-form-item label="" prop="username">
                        <el-input v-model="loginform.username">
                            <i slot="prefix" class="iconfont icon-user"></i>
                        </el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item label="" prop="password">
                        <el-input v-model="loginform.password" show-password>
                            <i slot="prefix" class="iconfont icon-3702mima"></i>
                        </el-input>
                    </el-form-item>
                    <!-- 按钮区 -->
                    <el-form-item label="" class="btns">
                        <el-button type="primary" @click="handleLogin()">登录</el-button>
                        <el-button type="info" @click="handleReset()">重置</el-button>
                    </el-form-item>
                </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      loginform: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginformRef.validate((valid, object) => {
        console.log(valid, object)
        if (!valid) return true
        this.$http.post('login', this.loginform).then(res => {
          const result = res.data
          console.log(result)
          if (result.meta.status !== 200) this.$message.error('登陆失败,' + result.meta.msg)
          else {
            this.$message.success('登陆成功')
            // 1. 将登陆成功后的token保存到客户端的 sessionStorage 中
            //    1.1 项目中除了登录以外的API接口，必须在登录后才能访问
            //    1.2 token 只应在当前网站打开期间生效，所以将其保存在sessionStorage中
            window.sessionStorage.setItem('token', result.data.token)
            // 2. 通过编程式导航跳转到后台主页，路由地址是/home
            this.$router.push('/home') // $router是 全局路由实例 对象
          }
        })
      })
    },
    handleReset () {
      console.log(this.$refs)
      this.$refs.loginformRef.resetFields()
    }
  }
}
</script>

<style scoped>
.login_wraper{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
}
.avatar_box img{
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: #eee;
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
.btns{
    display: flex;
    justify-content: flex-end;
}
i{
    margin-left: 5px;
}
</style>
