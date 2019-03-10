<template>
  <el-container class="index-container">
    <el-header class="index-header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="../assets/logo.png" alt>
          </div>
        </el-col>
        <el-col class="header-center" :span="16">
          <div class="grid-content bg-purple-light">电商后台管理系统</div>
        </el-col>
        <el-col :span="4" class="header-right">
          <div class="grid-content bg-purple">
            <el-button type="success" @click="outLogin">退出</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="index-aside" width="200px">Aside</el-aside>
      <el-main class="index-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 判断是都登录    使用沟子函数，beforecreate
  beforeCreate() {
    // 登陆情况通过 token 值来判定
    if (window.sessionStorage.getItem("token")) {
      // 此处主要做 token 值得判断，判断 token值是否准确
    } else {
      this.$message.warning("兄嘚，你是不是登录下咧");
      // 回到登录界面
      this.$router.push("/login");
    }
  },
  methods: {
    outLogin() {
      this.$confirm("还有精彩内容没有呈现呢，真的要离开吗", "友情提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // type: "success",
          // message: "删除成功!"
          // 确定退出，则删除 token，并返回到 login 页面
          window.sessionStorage.removeItem("token");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "精彩即将呈现，不要走开哟"
          });
        });
    }
  }
};
</script>

<style>
.index-container {
  height: 100%;
}
.index-header {
  height: 60px;
  background-color: #b3c0d1;
  line-height: 60px;
}
.header-center {
  text-align: center;
  font-size: 30px;
  color: white;
  font-weight: 700;
}
.header-right {
  text-align: right;
}
/* .index-aside {
} */
.index-main {
  background-color: #e9eef3;
}
</style>
