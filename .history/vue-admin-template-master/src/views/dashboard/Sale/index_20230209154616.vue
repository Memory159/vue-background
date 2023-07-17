<template>
  <el-card class="box-card" style="margin: 10px 0px">
    <div slot="header" class="clearfix">
      <!-- @tab-click="handleClick" -->
      <!-- 头部左侧内容 -->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="销售额"></el-tab-pane>
        <el-tab-pane label="访问量" name="访问量"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧内容 -->
      <div class="right">
        <span>今日</span>
        <span>本周</span>
        <span>本月</span>
        <span>本年</span>
        <!-- v-model="value1" -->
        <el-date-picker
          class="date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
        >
        </el-date-picker>
      </div>
    </div>
    <div>
        <el-row :gutter="10">
          <el-col :span="16">
            <!-- 容器 -->
            <div class="charts" ref="charts"></div>
          </el-col>
          <el-col :span="8">34</el-col>
        </el-row>
    </div>
  </el-card>
</template>

<script>
// 引入echarts
import echarts from 'echarts';
export default {
  name: "",
  data() {
    return {
        activeName:"销售额",
    }
  },
};
</script>

<style scoped>
.clearfix {
    position: relative;
  display: flex;
  justify-content: space-between;
}
.tab{
    width:100%
}
.right{
    position: absolute;
    right:0px;
}
.date{
    width:200px;
    margin:0px 20px;
}
.right span{
    margin: 0 10px;
}
.charts{
    width: 100%;
    height: 300px;
}
</style>