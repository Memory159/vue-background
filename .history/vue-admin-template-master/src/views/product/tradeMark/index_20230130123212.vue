<template>
  <div>
    <!-- 按钮组件 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="showDialog"
      >添加</el-button
    >
    <!-- 
      表格组件
      data:表格组件将来需要展示的数据-----数组类型的
      border:是给表格添加边框
      label:显示标题
      width:每一列的宽度
      align:标题的对齐方式
      prop:对应列内容的字段名
      注意一：elementUI当中的table组件，展示的数据是一列一列进行展示的
     -->
    <el-table style="width: 100%" :data="list">
      <el-table-column
        label="序号"
        type="index"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        label="品牌名称"
        prop="tmName"
        width="width"
      ></el-table-column>
      <el-table-column label="品牌LOGO" prop="logoUrl" width="width">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" style="width: 100px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="prop" width="width">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--
       分页器组件
       当前第几页、数据总条数、每一页展示条数、连续页码数
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       current-page:代表的是当前第几页
       total:代表分页器一共需要展示多少条数据
       page-size：代表的是每一页需要展示多少条数据
       page-sizes:代表可以设置每一页展示多少条数据
       layout:可以实现分页器布局
       pager-count:按钮的数量  如果 9 连续页码是 7
    -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :total="total"
      :current-page="page"
      :page-size="limit"
      :pager-count="7"
      :page-sizes="[3, 5, 10]"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="prev,pager,next,jumper,->,total,sizes"
    ></el-pagination>
    <!-- 
      对话框
      visible.sync：控制对话框显示与隐藏用的 true|false
      Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。
     -->
    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <!-- form 表单  model属性：把表单的数据收集到哪个对象的身上，将来表单验证，也需要这个属性-->
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- 
            upload照片上传  
            这里收集数据不能使用v-model，因为不是表单元素
            action：设置图片上传的地址
            :on-success:可以检测到图片上传成功，当图片上传成功，会执行一次
            :before-upload:可以在图片上传成功之前，会执行一次
          -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传 jpg/png 文件,且不超过 500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="unopenTradeMark">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      // 代表的分页器第几页
      page: 1,
      // 代表页数展示数据的条数
      limit: 3,
      // 总共数据的条数
      total: 0,
      // 列表展示的数据
      list: [],
      // 对话框显示与隐藏控制的属性
      dialogFormVisible: false,
      // 收集品牌信息:对象身上的属性不能瞎写，需要看文档
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change",
          },
        ],
        logoUrl: [{ required: true, message: "请选择logo图片" }],
      },
    };
  },
  // 组件挂载完毕发请求
  mounted() {
    // 获取列表数据方法
    this.getPageList();
  },
  methods: {
    // 获取品牌列表的数据
    async getPageList() {
      // 解构出参数
      const { page, limit } = this;
      // 获取品牌列表的接口
      // 当你向服务器发请求的时候，这个函数需要带参数，因此需要在data中初始化两个字段
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    // 当前分页的页数发生变化的时候触发
    handleCurrentChange(pager) {
      // 修改参数
      this.page = pager;
      this.getPageList();
    },
    // 当分页器某一页需要展示数据条数发生变化的时候会触发
    handleSizeChange(limit) {
      // 重新整理参数
      this.limit = limit;
      this.getPageList();
    },
    // 点击添加品牌的按钮
    showDialog() {
      // 显示对话框
      this.dialogFormVisible = true;
      // 清除数据
      this.tmForm = { tmName: "", logoUrl: "" };
    },
    // 点击修改品牌的按钮
    updateTradeMark(row) {
      // 显示对话框
      this.dialogFormVisible = true;
      // row：当前用户选中这个品牌的信息
      // 将已有的品牌信息赋值给tmForm进行展示
      this.tmForm = { ...row };
    },
    // 上传图片成功
    handleAvatarSuccess(res, file) {
      // res:上传成功之后返回前端数据
      // file:上传成功之后服务器返回前端数据
      // 收集品牌图片数据，因为将来需要带给服务器
      this.tmForm.logoUrl = res.data;
    },
    // 图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 添加按钮（添加品牌|修改品牌）
    addOrUpdateTradeMark() {
      // 当全部验证字段通过，再去书写业务逻辑
      this.$refs.ruleForm.validate(async (success) => {
        // 如果全部字段符合条件
        if (success) {
          this.dialogFormVisible = false;
          // 发请求（添加品牌|修改品牌）
          let result = await this.$API.trademark.reqAddOrUpdateTradeMark(
            this.tmForm
          );
          if (result.code == 200) {
            // 弹出信息:添加品牌成功|修改品牌成功
            this.$message({
              type: "success",
              message: this.tmForm.id ? "修改品牌成功" : "添加品牌成功",
            });
            // 添加或修改品牌成功以后，需要再次获取品牌列表进行展示
            // 如果添加品牌，停留在第一页，修改品牌应该停留在当前页面
            this.getPageList(this.tmForm.id ? this.page : 1);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 点击添加品牌按钮里面的取消按钮
    unopenTradeMark() {
      this.dialogFormVisible = false;
      // 清除表单验证
      this.$refs.ruleForm.clearValidate();
    },
    // 删除品牌的操作
    deleteTradeMark(row) {
      // 弹框
      this.$confirm(`确定要删除${row.tmName}吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        // 用户点击确定按钮时会触发
        .then(async () => {
          // 向服务器发请求
          let result = await this.$API.trademark.reqDeleteTradeMark(row.id);
          // 如果删除成功
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
          // 再次发请求，获取品牌列表数据
          // this.getPageList(5);
          // handleCurrentChange(1);
        })
        // 用户点击取消按钮时会触发
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>