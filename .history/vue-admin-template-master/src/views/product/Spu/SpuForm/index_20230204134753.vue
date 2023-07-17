<template>
  <div>
    <el-form label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="tm in tradeMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="SPU描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!-- 
          上传图片：
          action:图片上传的地址
          list-type:文件列表的类型
          on-preview:图片预览的时候会触发
          on-remove:当删除图片的时候会触发
          file-list:照片墙需要展示的数据【数组:数组里面的元素务必要有name,url属性】
          on-preview:图片预览功能
          on-remove:图片被删除的时候会被触发
         -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectSaleAttr.length}个未选择`" v-model="attrId">
          <el-option :label="unselect.name" :value="unselect.id" v-for="unselect in unSelectSaleAttr" :key="unselect.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrId">添加销售属性</el-button>
        <!-- 展示的是当前SPU属于自己的销售属性 -->
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column
            label="序号"
            width="80"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="属性名" prop="saleAttrName"></el-table-column>
          <el-table-column label="属性值名称列表">
            <template slot-scope="{ row }">
              <!-- @close="handleClose(tag)" -->
              <el-tag :key="tag.id" v-for="tag in row.spuSaleAttrValueList" closable :disable-transitions="false">{{ tag.saleAttrValueName }}</el-tag>
              <!-- @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" -->
              <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" ref="saveTagInput" size="small"></el-input>
              <!-- @click="showInput" -->
              <el-button v-else class="button-new-tag" size="small">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row}">
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('changeScene', 0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      // spu属性初始化的时候是一个空的对象
      // 存储SPU信息属性
      spu: {
        // 三级分类的id
        category3Id: 0,
        // 描述
        description: "",
        // SPU名称
        spuName: "string",
        // 品牌的id
        tmId: 0,
        // 收集SPU图片的信息
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ],
        // 平台属性与属性值收集
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      },
      // 存储品牌信息
      tradeMarkList: [],
      // 存储SPU图片的数据
      spuImageList: [],
      // 销售属性的数据
      saleAttrList: [],
      // 收集未选择的销售属性的id
      attrId:'',
    };
  },
  methods: {
    // 照片墙删除某一个图片的时候会触发
    handleRemove(file, fileList) {
      // file参数:代表的是删除的那张图片
      // fileList:代表的是照片墙删除某一张图片以后，剩余的其他的图片
      
    },
    // 照片墙图片预览的回调
    handlePictureCardPreview(file) {
      // 将图片地址赋值给这个属性
      this.dialogImageUrl = file.url;
      // 将对话框显示
      this.dialogVisible = true;
    },
    // 初始化SpuForm数据
    async initSpuData(spu) {
      // 获取SPU信息的数据
      let spuResult = await this.$API.spu.reqSpu(spu.id);
      if (spuResult.code == 200) {
        this.spu = spuResult.data;
      }
      // 获取品牌的信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      // 获取spu图片的数据
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (spuImageResult.code == 200) {
        let listArr = spuImageResult.data;
        // 由于照片墙显示图片的数据需要数组，数组里面的元素需要有name与url字段
        // 所以需要把服务器返回的数据进行修改
        listArr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        // 吧整理好的数据赋值给spuImageList
        this.spuImageList = listArr;
      }
      // 获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
  },
  computed:{
    // 计算出还未选择的销售属性
    unSelectSaleAttr(){
      // 整个凭条的销售属性一个三个：尺寸、颜色、版本 ----saleAttrList
      // 当前SPU拥有的属于自己的销售属性SPU.spuSaleAttrList ----颜色
      // 数组的过滤方法，可以从已有的数组当中过滤出用户需要的元素，并返回一个新的数据
      let result = this.saleAttrList.filter(item=>{
        // every数组的方法，会返回一个布尔值【真、假】
        return this.spu.spuSaleAttrList.every(item1=>{
            return item.name != item1.saleAttrName;
        });
      });
      return result;
    }
  }
};
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>