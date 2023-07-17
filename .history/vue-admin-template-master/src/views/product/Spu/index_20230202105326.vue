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
    data() {
      return {
        // 三级分类的id
        category1Id:'',
        category2Id:'',
        category3Id:'',
      }
    },
    methods: {
      // 三集联动自定义事件的回调
      getCategoryId({CategoryId,level}){
        if(level == 1){
          this.category1Id =  
        }
      }
    },
}
</script>

<style>

</style>