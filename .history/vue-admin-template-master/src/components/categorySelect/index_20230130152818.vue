<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cFrom">
      <el-form-item label="一级分类">
        <el-select placeholder="请选择" v-model="cFrom.category1Id" @change="handler1">
          <el-option :label="c1.name" :value="c1.id" v-for="(c1) in list1" :key="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择" v-model="cFrom.category2Id" @change="handler2">
          <el-option :label="c2.name" :value="c2.id" v-for="(c2) in list2" :key="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" v-model="cFrom.category3Id">
          <el-option :label="c3.name" :value="c3.id" v-for="(c3) in list3" :key="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  data() {
    return {
        // 一级分类的数据
        list1:[],
        list2:[],
        list3:[],
        // 收集响应的一级二级三级分类的id
        cFrom:{
            category1Id:'',
            category2Id:'',
            category3Id:'',
        }
    }
  },
  // 组件挂载完毕，向服务器发送请求，获取响应的一级分类的数据
  mounted() {
    // 获取一级分类的数据的方法
    this.getCategory1List();
  },
  methods: {
    // 获取一级分类数据的方法
    async getCategory1List(){
        // 获取一级分类的请求：不需要携带参数
        let result = await this.$API.attr.reqCategory1List();
        if(result.code == 200){
            this.list1 = result.data;
        }
    },
    // 一级分类的select事件回调（当一级分类的option发生变化的时候获取相应二级分类的数据）
    async handler1(){
        // 解构出一级分类的id
        const {category1Id} = this.cFrom;
        let result = await this.$API.attr.reqCategory2List(category1Id);
        if(result.code == 200){
            this.list2 = result.data;
        }
    },
     // 二级分类的select事件回调（当二级分类的option发生变化的时候获取相应三级分类的数据）
     async handler2(){
        // 解构出二级分类的id
        const {category2Id} = this.cFrom;
        let result = await this.$API.attr.reqCategory3List(category2Id);
        if(result.code == 200){
            this.list3 = result.data;
        }
    }
  },
};
</script>

<style>
</style>