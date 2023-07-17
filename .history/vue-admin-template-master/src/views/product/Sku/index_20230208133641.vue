<template>
  <div>
    <!-- 表格 -->
    <el-table style="width: 100%" :data="records" border>
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column label="名称" prop="skuName" width="150"></el-table-column>
      <el-table-column label="描述" prop="skuDesc" width="200"></el-table-column>
      <el-table-column label="默认图片" width="180">
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
          <hint-button type="info" icon="el-icon-info" size="mini" title="查看详情" @click="getSkuInfo(row)"></hint-button>
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
    <!-- 抽屉效果 -->
    <el-drawer :visible.sync="show" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{skuInfo.skuName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{skuInfo.skuDesc}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{skuInfo.price}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag type="success" v-for="attr in skuInfo.skuAttrValueList" :key="attr.id" style="margin-right:10px">{{attr.attrId}}-{{attr.valueId}}</el-tag>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="350px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" style="height:374px">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
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
      total:0,
      // 展示SKU列表
      skuInfo:{},
      // 抽屉的显示与隐藏
      show:false,
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
    },
    // 获取SKU详情回调
    async getSkuInfo(sku){
      // 展示抽屉
      this.show = true;
      // 获取SKU数据
      let result = await this.$API.sku.reqSkuById(sku.id);
      if(result.code == 200){
        this.skuInfo = result.data;
      }
    }
  },
};
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

  .el-carousel__button{
    width: 10px;
    height: 10px;
    background: red;
    border-radius: 50%;
  }
</style>

<style scoped>
  .el-row .el-col-5{
    font-size: 18px;
    text-align: right;
  }
  .el-col{
    margin:10px 10px;
  }
</style>