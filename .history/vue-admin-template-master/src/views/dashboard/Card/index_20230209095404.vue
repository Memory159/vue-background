<template>
    <div>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-card>
                <Detail title="总销售额" count="￥126560">
                  <template slot="charts">
                      <span>周同比56.67</span>
                  </template>
                </Detail>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
                <Detail title="访问量" count="88460"></Detail>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
                <Detail title="支付笔数" count="88460"></Detail>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
                <Detail title="运营活动效果" count="78%"></Detail>
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