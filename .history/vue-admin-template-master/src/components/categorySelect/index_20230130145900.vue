<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select placeholder="请选择" value="">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择" value="">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" value="">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  data() {
    return {
        list1:[],
        list2:[],
        list3:[],
    }
  },
  // 组件挂载完毕，向服务器发送请求，获取响应的一级分类的数据
  mounted() {
    // 获取一级分类的数据的方法
    this.getCategory1List();
  },
  methods: {
    // 获取一级分类数据的方法
    async getCategory1List(){
        let result = await this.$API.attr.reqCategory1List();
        if(result.code == 200){
            this.list1 = result.data;
        }
    }
  },
};
</script>

<style>
</style>