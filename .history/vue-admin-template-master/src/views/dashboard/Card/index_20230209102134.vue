<template>
    <div>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-card>
                <Detail title="总销售额" count="￥126560">
                  <template slot="charts">
                      <span>周同比&nbsp;&nbsp;56.67%&nbsp;&nbsp;<svg t="1675907750999" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1480" width="10" height="10"><path d="M164.1472 731.0336h695.808c40.1408 0 60.3136-48.5376 31.8464-77.0048L543.8464 306.176c-17.6128-17.6128-46.1824-17.6128-63.7952 0L132.1984 654.0288c-28.3648 28.4672-8.2944 77.0048 31.9488 77.0048z" p-id="1481" fill="#d81e06"></path></svg></span>
                      &nbsp;&nbsp;
                      <span>日同比&nbsp;&nbsp;19.16%&nbsp;&nbsp;<svg t="1675907927673" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1907" width="10" height="10"><path d="M859.8528 292.9664H164.1472c-40.1408 0-60.3136 48.5376-31.8464 77.0048L480.1536 717.824c17.6128 17.6128 46.1824 17.6128 63.7952 0l347.8528-347.8528c28.3648-28.4672 8.2944-77.0048-31.9488-77.0048z" p-id="1908" fill="#1afa29"></path></svg></span>
                  </template>
                  <template slot="footer">
                    <span>日销售额￥ 12423</span>
                  </template>
                </Detail>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
                <Detail title="访问量" count="88460">
                  <template slot="footer">
                    <span>日访问量￥ 1234</span>
                  </template>
                </Detail>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
                <Detail title="支付笔数" count="88460">
                  <template slot="footer">
                    <span>日销售额￥ 12423</span>
                  </template>
                </Detail>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
                <Detail title="运营活动效果" count="78%">
                  <template slot="footer">
                      <span>周同比&nbsp;&nbsp;56.67%&nbsp;&nbsp;<svg t="1675907750999" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1480" width="10" height="10"><path d="M164.1472 731.0336h695.808c40.1408 0 60.3136-48.5376 31.8464-77.0048L543.8464 306.176c-17.6128-17.6128-46.1824-17.6128-63.7952 0L132.1984 654.0288c-28.3648 28.4672-8.2944 77.0048 31.9488 77.0048z" p-id="1481" fill="#d81e06"></path></svg></span>
                      &nbsp;&nbsp;
                      <span>日同比&nbsp;&nbsp;19.16%&nbsp;&nbsp;<svg t="1675907927673" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1907" width="10" height="10"><path d="M859.8528 292.9664H164.1472c-40.1408 0-60.3136 48.5376-31.8464 77.0048L480.1536 717.824c17.6128 17.6128 46.1824 17.6128 63.7952 0l347.8528-347.8528c28.3648-28.4672 8.2944-77.0048-31.9488-77.0048z" p-id="1908" fill="#1afa29"></path></svg></span>
                  </template>
                </Detail>
            </el-card>
          </el-col>
        </el-row>
    </div>
</template>

<script>
import Detail from './Detail';
export default {
    name:'',
    components:{
        Detail
    }
}
</script>

<style>

</style>