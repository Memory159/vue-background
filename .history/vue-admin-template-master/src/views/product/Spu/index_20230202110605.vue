<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!show"></CategorySelect>
    </el-card>
    <el-card>
        <el-button type="primary" icon="el-icon-plus">添加SPU</el-button>
        <el-table border>
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column label="spu名称"></el-table-column>
          <el-table-column label="spu描述"></el-table-column>
          <el-table-column label="操作">
            <el-button type="success" icon="el-icon-plus" size="mini"></el-button>
            <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="info" icon="el-icon-info" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </el-table-column>
        </el-table>
    </el-card>
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
        // 禁用与启用三级分类
        show:true,
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