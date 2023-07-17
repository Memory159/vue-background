<template>
  <el-card>
    <div slot="header">
      <div class="search-header">
        <span>线上热门搜索</span>
        <i class="el-icon-more"></i>
      </div>
    </div>
    <div>
        <el-row :gutter="10">
          <el-col :span="6"></el-col>
        </el-row>
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