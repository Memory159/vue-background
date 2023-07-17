<template>
  <div>
      <!-- 表格 -->
      <el-table style="width:100%" border>
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column label="名称"></el-table-column>
        <el-table-column label="描述"></el-table-column>
        <el-table-column label="默认图片" width="110"></el-table-column>
        <el-table-column label="重量" width="80"></el-table-column>
        <el-table-column label="价格" width="80"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination :total="" :current-page="" :page-size="" @current-change="" layout=""></el-pagination>
  </div>
</template>

<script>
export default {
    name:'Sku'
}
</script>

<style>

</style>