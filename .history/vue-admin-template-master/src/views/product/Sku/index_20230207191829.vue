<template>
  <div>
    <!-- 表格 -->
    <el-table style="width: 100%" border>
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column label="名称"></el-table-column>
      <el-table-column label="描述"></el-table-column>
      <el-table-column label="默认图片" width="110"></el-table-column>
      <el-table-column label="重量" width="80"></el-table-column>
      <el-table-column label="价格" width="80"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
    <!-- 
      分页
      @current-change=""
     -->
    <el-pagination
      style="text-align:center"
      :total="20"
      :current-page="1"
      :page-size="10"
      :page-sizes="[3,5,10]"
      layout="prev,pager,next,jumper,->,sizes,total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      
      page:'',
      limit:'',
    }
  },
  mounted(){
    // 获取sku列表的方法
    this.getSkuList();
  },
  methods: {
    // 获取sku列表数据的方法
    getSkuLIst(){
      const {page,limit} = this;
      this.$API.sku.reqSkuList(page,limit);
    }
  },
};
</script>

<style>
</style>