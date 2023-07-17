<template>
  <div>
    <!-- 按钮组件 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px"
      >添加</el-button
    >
    <!-- 
      表格组件
      data:表格组件将来需要展示的数据-----数组类型的
      border:是给表格添加边框
      label:显示标题
      width:每一列的宽度
     -->
    <el-table style="width: 100%">
      <el-table-column label="序号" prop="prop" width="80px"></el-table-column>
      <el-table-column
        label="品牌名称"
        prop="prop"
        width="width"
      ></el-table-column>
      <el-table-column
        label="品牌LOGO"
        prop="prop"
        width="width"
      ></el-table-column>
      <el-table-column label="操作" prop="prop" width="width"></el-table-column>
    </el-table>
    <!--
       分页器组件
       当前第几页、数据总条数、每一页展示条数、连续页码数
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       current-page:代表的是当前第几页
       total:代表
    -->
    <el-pagination
      style="margin-top: 20px; textAlign: center"
      :total="99"
      :current-page="6"
      :page-size="3"
      :pager-count="9"
      :page-sizes="[3, 5, 10]"
      layout="prev,pager,next,jumper,->,total,sizes"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
};
</script>

<style>
</style>