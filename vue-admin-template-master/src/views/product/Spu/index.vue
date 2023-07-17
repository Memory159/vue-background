<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene!=0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <!-- 这里有三部分进行切换 -->
      <div v-show="scene==0">
        <!-- 展示SPU列表的结构 -->
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加SPU</el-button>
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
            <template slot-scope="{row}">
              <hint-button type="success" icon="el-icon-plus" size="mini" title="添加sku" @click="addSku(row)"></hint-button>
              <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改spu" @click="updateSpu(row)"></hint-button>
              <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前spu的sku列表" @click="handler(row)"></hint-button>
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
                <hint-button slot="reference" type="danger" icon="el-icon-delete" size="mini" title="删除spu"></hint-button>
              </el-popconfirm>
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
      <SpuForm v-show="scene==1" @changeScene="changeScene" ref="spu"></SpuForm>
      <SkuForm v-show="scene==2" @changeScenes="changeScenes" ref="sku"></SkuForm>
    </el-card>
    <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible">
      <!-- table展示sku列表 -->
      <el-table :data="skuList" style="width:100%" border v-loading="loading">
        <el-table-column prop="skuName" label="名称" width="100"></el-table-column>
        <el-table-column prop="price" label="价格" width="200"></el-table-column>
        <el-table-column prop="weight" label="重量"></el-table-column>
        <el-table-column label="默认图片">
          <template slot-scope="{row}">
            <img :src="row.skuDefaultImg" style="width:100px;height:100px">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from './SpuForm';
import SkuForm from './SkuForm';
import { done } from 'nprogress';
export default {
  name: "Spu",
  data() {
    return {
      // 三级分类的id
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 分页器当前第几页
      page:1,
      // 每一页展示多少条数据
      limit:3,
      // spu列表的数据
      records:[],
      // 分页器一共需要展示数据的条数
      total:0,
      // 用于控制底部三部分显示与隐藏的字段
      // 0代表展示SPU列表数据  1代表添加SPU|修改SPU  2代表添加SKU
      scene:0,
      // 控制Dialog对话框显示与隐藏
      dialogTableVisible:false,
      // 收集spu
      spu:{},
      // 存储SKU列表的数据
      skuList:[],
      // loading加载
      loading: true,
    };
  },
  components:{
    SpuForm,
    SkuForm,
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
    async getSpuList(a) {
      const {page,limit,category3Id} = this;
      // 需要携带三个参数：page；第几页  limit:每一页需要展示多少条数据  category3Id:三级分类id
      let result =  await this.$API.spu.reqSpuList(a?a:page,limit,category3Id);
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
    handleSizeChange(limit){
      this.limit = limit; 
      // 重新获取Spu的数据进行展示
      this.getSpuList();
    },
    // 添加Spu按钮的回调
    addSpu(){
      // 切换为场景1
      this.scene = 1;
      // 通知子组件spuFrom发请求----两个
      // 并且在点击添加按钮的时候将三级分类的id传给子组件
      this.$refs.spu.addSpuDate(this.category3Id);
    },
    // 修改某一个Spu按钮的回调
    updateSpu(row){
      this.scene = 1;
      // 通过给子组件打ref，然后用$refs来调用子组件SpuFrom的方法
      this.$refs.spu.initSpuData(row);
    },
    // 自定义事件回调：SpuForm
    changeScene({scene,flag}){
      // flag这个形参是为了区分保存按钮是添加还是修改
      this.scene = scene;
      // 子组件通知父组件切换场景，需要再次获取SPU列表的数据进行展示
      // 如果是修改的保存，会停留在当前页
      // 如果是添加的保存，会跳转到第一页
      if(flag == '修改'){
        this.getSpuList();
      }else{
        this.page = 1;
        this.getSpuList();
      }
    },
    // 删除按钮的回调
    async deleteSpu(row){
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      // 显示删除成功的提示信息
      if(result.code==200){
        this.$message({type:'success',message:'删除成功'});
        // 获取最新的SPU列表数据进行展示
        this.getSpuList(this.records.length>1?this.page:this.page-1);
      }
    },
    // 添加sku按钮的回调
    addSku(row){
      // 切换场景为2
      this.scene = 2;
      // 父组件调用子组件的方法，让子组件发请求----三个请求
      this.$refs.sku.getData(this.category1Id,this.category2Id,row);
    },
    // skuForm通知父组件修改场景
    changeScenes(scene){
      // 让父组件切换场景为0
      this.scene = scene;
     
    },
    // 查看SKU按钮的回调
    async handler(spu){
      this.loading = true;
      // 设置对话框为显示状态
      this.dialogTableVisible = true;
      // 保存spu的信息
      this.spu = spu;
      // 发请求，获取sku列表的数据进行展示
      let result = await this.$API.spu.reqSkuList(spu.id);
        if(result.code == 200){
          this.loading = false;
          this.skuList = result.data;
        }
    },
  },
};
</script>

<style>
</style>