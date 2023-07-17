<template>
    <div>
        <el-row :gutter="10">
          <el-col :span="6">
            <Detail></Detail>
          </el-col>
          <el-col :span="6">
            <Detail></Detail>
          </el-col>
          <el-col :span="6"></el-col>
          <el-col :span="6"></el-col>
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