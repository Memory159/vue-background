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
      getCategoryId(){
        
      }
    },
}
</script>

<style>

</style>