<template>
  <div>
    <!-- 按钮组件 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px"
      >添加</el-button
    >
    <!-- 
      表格组件
      data:表格组件将来需要展示的数据-----数组类型的
      border:是给表格添加边框
      label:显示标题
      width:每一列的宽度
      align:标题的对齐方式
      prop:对应列内容的字段名
      注意一：elementUI当中的table组件，展示的数据是一列一列进行展示的
     -->
    <el-table style="width: 100%" :data="list">
      <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
      <el-table-column label="品牌名称" prop="tmName" width="width"></el-table-column>
      <el-table-column label="品牌LOGO" prop="logoUrl" width="width">
          <template slot-scope="{row}">
              <img :src="row.logoUrl" style="width:100px;height:80px">
          </template>
      </el-table-column>
      <el-table-column label="操作" prop="prop" width="width">
          <template slot-scope="{row}">
                <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
          </template>
      </el-table-column>
    </el-table>
    <!--
       分页器组件
       当前第几页、数据总条数、每一页展示条数、连续页码数
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       current-page:代表的是当前第几页
       total:代表分页器一共需要展示多少条数据
       page-size：代表的是每一页需要展示多少条数据
       page-sizes:代表可以设置每一页展示多少条数据
       layout:可以实现分页器布局
       pager-count:按钮的数量  如果 9 连续页码是 7
    -->
    <el-pagination
      style="margin-top: 20px; textAlign: center"
      :total="99"
      :current-page="6"
      :page-size="3"
      :pager-count="9"
      :page-sizes="[3, 5, 10]"
      layout="prev,pager,next,jumper,->,total,sizes"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      // 代表的分页器第几页
      page:1,
      // 代表页数展示数据的条数
      limit:3,
      // 总共数据的条数
      total:0,
      // 列表展示的数据
      list:[],
    }
  },
  // 组件挂载完毕发请求
  mounted() {
    // 获取列表数据方法
    this.getPageList();
  },
  methods: {
    // 获取品牌列表的数据
    async getPageList(){
      // 解构出参数
      const {page,limit} = this;
      // 获取品牌列表的接口
      // 当你向服务器发请求的时候，这个函数需要带参数，因此需要在data中初始化两个字段
      let result = await this.$API.trademark.reqTradeMarkList(page,limit);
      if(result.code == 200){
          this.total = result.data.total;
          this.list = result.data.records;
      } 
    }
  },
};
</script>

<style>
</style>