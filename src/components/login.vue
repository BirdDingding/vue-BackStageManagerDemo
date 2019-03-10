<template>
  <div class="login">
    <el-form
      :model="formData"
      status-icon
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm"
      label-position="top"
      :rules="formrules"
    >
      <h3>用户登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model.trim="formData.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="submitForm('ruleForm2')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        username: "",
        password: ""
      },
      formrules: {
        //  用户名及密码的检测  element-ui
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 14 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        //   alert("submit!");
            this.$http.post('login',this.formData).then(res => {
                if (res.data.meta.status === 400) {
                    this.$message.error(res.data.meta.msg)
                } else {
                    this.$message.success(res.data.meta.msg)
                    // 使用sessionStorage存储 token
                    window.sessionStorage.setItem('token',res.data.data.token)
                    // 编程式跳转
                    this.$router.push('/')
                }
            })
        } else {
          this.$message("请输入正确的账号和密码");
          return false;
        }
      });
    }
  }
};
</script>
<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
body > div:first-of-type {
  height: 100%;
}
.login {
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.el-form {
  width: 580px;
  height: 440px;
  box-sizing: border-box;
  padding: 40px;
  border-radius: 10px;
  background-color: white;
}
.login-btn {
  width: 100%;
}
</style>