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
        <el-col :span="8">
            <h3>门店销售额排名</h3>
            <ul>
                <li>
                    <span class="rindex">1</span>
                    <span>肯德基</span>
                    <span class="rvalue">323,234</span>
                </li>
                <li>
                    <span class="rindex">2</span>
                    <span>麦当劳</span>
                    <span class="rvalue">299,132</span>
                </li>
                <li>
                    <span class="rindex">3</span>
                    <span>肯德基</span>
                    <span class="rvalue">283,998</span>
                </li>
                <li>
                    <span>4</span>
                    <span>海底捞</span>
                    <span class="rvalue">266,223</span>
                </li>
                <li>
                    <span>5</span>
                    <span>西贝莜面村</span>
                    <span class="rvalue">223,445</span>
                </li>
                <li>
                    <span>6</span>
                    <span>汉堡王</span>
                    <span class="rvalue">219,663</span>
                </li>
                <li>
                    <span>7</span>
                    <span>真功夫</span>
                    <span class="rvalue">200,997</span>
                </li>
            </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
// 引入echarts
import * as echarts from "echarts";
export default {
  name: "",
  data() {
    return {
      activeName: "销售额",
    };
  },
  mounted() {
    // 初始化echarts实例
    let mycharts = echarts.init(this.$refs.charts);
    // 配置数据
    mycharts.setOption({
      title:{
        text:"销售额趋势"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月","八月", "九月", "十月", "十一月", "十二月"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220,110,66,129,156,89],
        },
      ],
    });
  },
};
</script>

<style scoped>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0px;
}
.date {
  width: 200px;
  margin: 0px 20px;
}
.right span {
  margin: 0 10px;
}
.charts {
  width: 100%;
  height: 300px;
}
ul{
    list-style:none;
    width:100%;
    height:300px;
    padding: 0px;
}
ul li{
    height:8%;
}
.rindex{
    float:left;
    width:20px;
    height:20px;
    border-radius:50%;
    background:black;
    color:white;
    text-align: center;
    margin-right: 20px;
}
.rvalue{
    float:right;
}
ul li span{
    margin:10px 30px 0 0;
}
</style>