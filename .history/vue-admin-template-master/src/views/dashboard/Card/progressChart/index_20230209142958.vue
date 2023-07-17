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
                  // 最小值与最大值的设置
                  min:0,
                  max:100
              },
              // 设置y轴
              yAxis:{
                  // 隐藏y轴
                  show:false,
                   // 均分
                   type:'category'
              },
              // 系列
              series:[
                  {
                      // 图标形式---柱状图
                      type:"bar",
                      data:[78],
                      // 柱状图的宽度
                      barWidth:15,
                      color:'yellowgreen',
                      // 背景颜色的设置
                      showBackground:true,
                      backgroundStyle:{
                        color:'#eaebf0',
                      },
                      // 文本
                      label:{
                        show:true,
                        formatter:'|'
                      }

                  },
              ],
              // 布局调试
              grid:{
                  left:0,
                  top:0,
                  right:0,
                  bottom:0
              },
          });
      }
  }
  </script>
  
  <style>
      .barCharts{
          width:100%;
          height: 100%;
      }
  </style>