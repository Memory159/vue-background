<template>
    <div class="barCharts" ref="charts"></div>
  </template>
  
  <script>
  // 引入echarts
  import * as echarts from 'echarts';
  export default {
      name:'',
      mounted(){
          // 初始化echarts实例
          let barCharts = echarts.init(this.$refs.charts);
          // 配置数据
          barCharts.setOption({
              // 设置x轴
              xAxis:{
                  // 隐藏x轴
                  show:false,
                  // 均分
                  type:'category'
              },
              // 设置y轴
              yAxis:{
                  // 隐藏y轴
                  show:false,
              },
              // 系列
              series:[
                  {
                      // 图标形式---柱状图
                      type:"bar",
                      data:[9,50,7,24,12,30,6,23,8,33,25,14],
                      color:'cyan'
                  },
              ],
              // 布局调试
              grid:{
                  left:0,
                  top:0,
                  right:0,
                  bottom:0
              },
              tooltip:{}
          });
      }
  }
  </script>
  
  <style>
      .barCharts{
          width:300px;
          height: 100%;
      }
  </style>