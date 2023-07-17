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
      getCategoryId({categoryId,level}){
        // 区分三级分类的id，并进行存储
        if(level == 1){
          this.category1Id = categoryId;  
        }else if(level == 2){
          this.category2Id = categoryId;
        }else{
          this.category3Id = categoryId;
          // 当获取到三级id的时候，就可以向服务器发请求获取数据进行展示了
          this.getSpuList();
        }
      },
      // 获取Spu的数据
      // 当用户确定三级分类的数据时，可以向服务器发送请求获取Spu的数据进行展示
      getSpuList(){

      }
    },
}
</script>

<style>

</style>