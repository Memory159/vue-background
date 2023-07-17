<template>
  <div>
    <!-- 表格 -->
    <el-table style="width: 100%" :data="records" border>
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column label="名称" prop="skuName" width="150"></el-table-column>
      <el-table-column label="描述" prop="skuDesc" width="100"></el-table-column>
      <el-table-column label="默认图片" width="210">
        <template slot-scope="{row}">
          <img :src="row.skuDefaultImg" style="width:100px;height:100px">
        </template>
      </el-table-column>
      <el-table-column label="重量" width="80" prop="weight"></el-table-column>
      <el-table-column label="价格" width="80" prop="price"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <hint-button type="success" icon="el-icon-bottom" size="mini" v-if="row.isSale == 0" @click="sale(row)" title="上架"></hint-button>
          <hint-button type="info" icon="el-icon-top" size="mini" v-else @click="cencel(row)" title="下架"></hint-button>
          <hint-button type="primary" icon="el-icon-edit" size="mini" @click="edit" title="编辑"></hint-button>
          <hint-button type="info" icon="el-icon-info" size="mini" title="查看详情"></hint-button>
          <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除"></hint-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="text-align:center"
      :total="total"
      :current-page="page"
      :page-size="limit"
      :page-sizes="[3,5,10]"
      layout="prev,pager,next,jumper,->,sizes,total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
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
    },
    // 点击分页器下数字按钮的回调
    handleCurrentChange(page){
      this.page = page;
      // 重新获取Sku的数据进行展示
      this.getSkuList();
    },
    // 修改当前页展示数据条数的回调
    handleSizeChange(limit){
      this.limit = limit;
      // 重新获取Sku的数据进行展示
      this.getSkuList();
    },
    // 商品上架按钮的回调
    async sale(row){
      let result = await this.$API.sku.reqSale(row.id);
      if(result.code == 200){
        row.isSale = 1;
        this.$message({type:"success",message:"上架成功"});
      }
    },
    // 商品下架按钮的回调
    async cencel(row){
      let result = await this.$API.sku.reqCencel(row.id);
      if(result.code == 200){
        row.isSale = 0;
        this.$message({type:"success",message:"下架成功"});
      }
    },
    // 商品编辑按钮的回调
    edit(){
      this.$message('正在开发中......');
    }
  },
};
</script>

<style>
</style>