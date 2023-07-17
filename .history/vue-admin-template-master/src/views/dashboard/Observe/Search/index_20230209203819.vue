<template>
  <el-card>
    <div slot="header">
      <div class="search-header">
        <span>线上热门搜索</span>
        <i class="el-icon-more"></i>
      </div>
    </div>
  </el-card>
</template>

<script>
import lineCharts from './lineCharts';
export default {
  name: "",
  components:{
    lineCharts,
  }
};
</script>

<style>
.search-header{
    display: flex;
    justify-content: space-between;
}
</style>