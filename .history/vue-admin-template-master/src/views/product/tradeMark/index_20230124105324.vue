<template>
  <div>
    <!-- 按钮组件 -->
    <el-button type="primary" icon="el-icon-plus" style="margin:10px 0px">添加</el-button>
    <!-- 
      表格组件
      data:表格组件将来需要展示的数据-----数组类型的

     -->
     <el-table style="width:100%">
      <el-table-column label="" prop="prop" width=""></el-table-column>
      <el-table-column label="" prop="prop" width=""></el-table-column>
      <el-table-column label="" prop="prop" width=""></el-table-column>
      <el-table-column label="" prop="prop" width=""></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    name:'tradeMark'
}
</script>

<style>

</style>