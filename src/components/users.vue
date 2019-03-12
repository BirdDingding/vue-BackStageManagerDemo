<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="myBreadcrum">
      <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            v-model="sendData.query"
            @keyup.native.enter="search"
          >
            <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <el-button type="success" @click="dialogFormVisible=true">添加用户</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="statusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="current">
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
            @click="handleDel(current.row)"
          ></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="40"
    ></el-pagination>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form
        :model="addUser"
        :rules="rules"
        label-position="right"
        label-width="80px"
        class="my-form"
        ref="addUser"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUser.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model.number="addUser.mobile" autocomplete="off" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addUser')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    //   验证邮箱格式
    var checkEmail = (rule, value, callback) => {
      setTimeout(() => {
        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱"));
        }
      }, 800);
    };
    // 验证手机号码格式
    var checkMobile = (rule, value, callback) => {
      setTimeout(() => {
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数值"));
        } else {
          if (reg.test(value)) {
            callback();
          } else {
            callback(new Error("请输入正确的手机号码"));
          }
        }
      }, 800);
    };

    return {
      sendData: {
        query: "",
        pagenum: "1",
        pagesize: "10"
      },
      tableData: [],
      addUser: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      dialogFormVisible: false,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入正确的密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ],
        email: [{ validator: checkEmail, trigger: "blur" }],
        mobile: [{ validator: checkMobile, trigger: "blur" }]
      }
    };
  },
  methods: {
    //   搜索信息
    async search() {
      let res = await this.$http.get("users", {
        // headers: {
        //   Authorization: window.sessionStorage.getItem("token")
        // },
        params: this.sendData
      });
      this.tableData = res.data.data.users;
    },
    // 更改用户的状态信息
    async statusChange(item) {
      // console.log(item);
      let res = await this.$http.put(`users/${item.id}/state/${item.mg_state}`);
    },
    // 删除用户信息
    handleDel(item) {
      // 使用message box
      this.$confirm("真的要狠心丢弃宝宝乜", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let result = await this.$http.delete(`users/${item.id}`);
          //    删除成功，重新刷新当前页
          //   console.log(res);

          if (result.data.meta.status == 200) {
            this.search();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "开心开心极了"
          });
        });
    },
    // 表单验证 整体
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await this.$http.post("users", this.addUser);
          //   请求成功，手气添加用户窗口，并刷新页面
          if (res.data.meta.status == 201) {
            this.search();
            this.dialogFormVisible = false;
          }
        } else {
          this.$message.warning("请正确填写数据");
          return false;
        }
      });
    }
  },
  //  获取数据
  created() {
    this.search();
  }
};
</script>
<style>
.el-breadcrumb.myBreadcrum {
  height: 45px;
  line-height: 45px;
  background-color: #d3dce6;
  padding-left: 10px;
}
.my-form {
  height: auto;
  padding: 0;
}
</style>
