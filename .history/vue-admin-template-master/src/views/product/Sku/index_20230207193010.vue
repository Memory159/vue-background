<template>
  <div>
    <!-- 表格 -->
    <el-table style="width: 100%" border :data="records">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column label="名称" prop="skuName"></el-table-column>
      <el-table-column label="描述" prop="skuDesc"></el-table-column>
      <el-table-column label="默认图片" width="110"></el-table-column>
      <el-table-column label="重量" width="80"></el-table-column>
      <el-table-column label="价格" width="80"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
    <!-- 
      分页
      @current-change=""
     -->
    <el-pagination
      style="text-align:center"
      :total="total"
      :current-page="page"
      :page-size="limit"
      :page-sizes="[3,5,10]"
      layout="prev,pager,next,jumper,->,sizes,total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      // 代表当前第几页
      page:1,
      // 代表当前页面有几条数据
      limit:10,
      // 存储SKU列表的数据
      records:[],
      // 存储分页器一共展示数据的条数
      total:0
    }
  },
  mounted(){
    // 获取sku列表的方法
    this.getSkuList();
  },
  methods: {
    // 获取sku列表数据的方法
    async getSkuList(){
      // 解构出发请求需要的参数
      const {page,limit} = this;
      let result =  await this.$API.sku.reqSkuList(page,limit);
      if(result.code == 200){
        this.records = result.data.records;
        this.total = result.data.total;
      }
    }
  },
};
</script>

<style>
</style>