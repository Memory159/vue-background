<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="SPU名称">{{ spu.spuName }}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" type="number" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input placeholder="规格描述" type="textarea" rows="4" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form label-width="80px" :inline="true">
          <el-form-item :label="attr.attrName" v-for="attr in attrInfoList" :key="attr.id">
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="attrValue in attr.attrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form label-width="80px" :inline="true">
          <el-form-item :label="saleAttr.saleAttrName" v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
              <el-option :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`" v-for="saleAttrValue in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table style="width: 100%" border :data="spuImageList" @selection-change="handleSelection">
          <el-table-column width="80" type="selection"></el-table-column>
          <el-table-column label="图片">
            <template slot-scope="{row}">
              <img :src="row.imgUrl" style="width:100px;height:100px">
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row}">
                <el-button type="primary" v-if="row.isDefault == 0" @click="changeDeafult(row)">设置默认</el-button>
                <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      // 存储图片的信息
      spuImageList: [],
      // 存储销售属性的信息
      spuSaleAttrList: [],
      // 存储平台属性的信息
      attrInfoList: [],
      // 收集sku数据的字段
      skuInfo: {
        // 第一类收集的数据:父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 第二类收集的数据:需要通过数据双向绑定v-model收集
        skuName: "",
        price:'',
        weight: "",
        skuDesc: "",
        // 第三类收集的数据:需要自己书写代码
        // 默认的图片
        skuDefaultImg: "",
        // 收集图片的数据
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        // 平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // },
        ],
        // 销售属性
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],
      },
      // 存储spu的信息
      spu:{},
      // 收集图片的数据字段:但是需要注意，收集的数据目前缺少isDefault字段，将来提交给服务器数据的时候，需要整理参数
      imageList:[],
    };
  },
  methods: {
    // 获取sku数据
    async getData(category1Id, category2Id, spu) {
      // 收集父组件给予的数据
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.spuId = spu.id;
      this.skuInfo.tmId = spu.tmId; 
      this.spu = spu;
      // 获取图片的数据
      let result = await this.$API.sku.reqSpuImageList(spu.id);
      if (result.code == 200) {
        let list = result.data;
        list.forEach(item => {
          item.isDefault = 0;          
        });
        this.spuImageList = list;
      }
      // 获取销售属性的数据
      let result1 = await this.$API.sku.reqSpuSaleAttrList(spu.id);
      if (result1.code == 200) {
        this.spuSaleAttrList = result1.data;
      }
      // 获取平台属性的数据
      let result2 = await this.$API.sku.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (result2.code == 200) {
        this.attrInfoList = result2.data;
      }
    },
    // table表格复选框按钮事件的回调
    handleSelection(params){
      // 获取到用户选中图片的信息数据，但是需要注意，当前收集的数据当中，缺少isDefault字段
      this.imageList = params;
    },
    // 设置默认按钮的回调（排他操作）
    changeDeafult(row){
      // 将图片列表的数据的isDefault字段变为0
      this.spuImageList.forEach(item=>{
        item.isDefault = 0;
      });
      // 将点击的那个数据的isDefault字段变为1
      row.isDefault = 1;
      // 收集默认图片的地址
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    // 取消按钮的回调
    cancel(){
      // 自定义事件
    }
  },
};
</script>

<style>
</style>