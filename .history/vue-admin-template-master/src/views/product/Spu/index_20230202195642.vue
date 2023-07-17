<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="!show"
      ></CategorySelect>
    </el-card>
    <el-card>
      <!-- 这里将来有三部分进行切换 -->
      <div>
        <!-- 展示SPU列表的结构 -->
        <el-button type="primary" icon="el-icon-plus">添加SPU</el-button>
        <el-table style="width:100%" border :data="records">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column label="spu名称" prop="spuName"></el-table-column>
          <el-table-column label="spu描述" prop="description"></el-table-column>
          <el-table-column label="操作">
            <template>
              <hint-button
              type="success"
              icon="el-icon-plus"
              size="mini"
              title="添加sku"
            ></hint-button>
            <hint-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
              title="修改spu"
            ></hint-button>
            <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前spu的sku列表"></hint-button>
            <hint-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              title="删除spu"
            ></hint-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          style="text-align:center"
          :current-page="page"
          :page-sizes="[3,5,10]"
          :page-size="limit"
          layout="prev,pager,next,jumper,->,sizes,total"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Spu",
  data() {
    return {
      // 三级分类的id
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 禁用与启用三级分类
      show: true,
      // 分页器当前第几页
      page:1,
      // 每一页展示多少条数据
      limit:3,
      // spu列表的数据
      records:[],
      // 分页器一共需要展示数据的条数
      total:0,
    };
  },
  methods: {
    // 三集联动自定义事件的回调
    getCategoryId({ categoryId, level }) {
      // 区分三级分类的id，并进行存储
      if (level == 1) {
        this.category1Id = categoryId;
      } else if (level == 2) {
        this.category2Id = categoryId;
      } else {
        this.category3Id = categoryId;
        // 当获取到三级id的时候，就可以向服务器发请求获取数据进行展示了
        this.getSpuList();
      }
    },
    // 获取Spu的数据
    // 当用户确定三级分类的数据时，可以向服务器发送请求获取Spu的数据进行展示
    async getSpuList() {
      const {page,limit,category3Id} = this;
      // 需要携带三个参数：page；第几页  limit:每一页需要展示多少条数据  category3Id:三级分类id
      let result =  await this.$API.spu.reqSpuList(page,limit,category3Id);
      if(result.code == 200){
          this.records = result.data.records;
          this.total = result.data.total;
      }
    },
    // 点击分页器第几页按钮的回调
    handleCurrentChange(page){
      this.page = page;
      // 重新获取Spu的数据进行展示
      this.getSpuList();
    },
    // 当分页器的某一页展示数据条数发生变化的回调
    handleSizeChange(){
      this.limit = 
    }
  },
};
</script>

<style>
</style>