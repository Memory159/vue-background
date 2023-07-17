<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect>
    </el-card>
    <el-card></el-card>
  </div>
</template>

<script>
export default {
    name:'Spu',
    methods: {
      // 三集联动自定义事件的回调
      getCategoryId({getCategoryId,level}){
        if(level = 1){

        }
      }
    },
}
</script>

<style>

</style>