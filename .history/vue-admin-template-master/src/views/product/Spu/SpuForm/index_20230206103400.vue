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
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`${unSelectSaleAttr.length}` > 0 ? `还有${unSelectSaleAttr.length}个未选择` : '没有销售属性了><' " v-model="attrIdAndAttrName">
          <el-option :label="unselect.name" :value="`${unselect.id}:${unselect.name}`" v-for="unselect in unSelectSaleAttr" :key="unselect.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addSaleAttr">添加销售属性</el-button>
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
            <template slot-scope="{ row,$index }">
              <el-tag :key="tag.id" v-for="(tag,index) in row.spuSaleAttrValueList" closable :disable-transitions="false" @close="row.spuSaleAttrValueList.splice(index,1)">{{ tag.saleAttrValueName }}</el-tag>
              <!-- @keyup.enter.native="handleInputConfirm"-->
              <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" :ref="$index" size="small" @blur="handleInputConfirm(row)"></el-input>
              <!-- @click="showInput" -->
              <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row,$index)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index,1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdataSpu">保存</el-button>
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
        spuName: "",
        // 品牌的id
        tmId: '',
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
      attrIdAndAttrName:'',
    };
  },
  methods: {
    // 照片墙删除某一个图片的时候会触发
    handleRemove(file, fileList) {
      // file参数:代表的是删除的那张图片
      // fileList:代表的是照片墙删除某一张图片以后，剩余的其他的图片
      // 对于已有的图片【照片墙中显示的图片，有name,url字段的】，因为图片墙显示数据务必要有这两个属性
      // 对于服务器而言，不需要name、url字段，将来对于有的图片的数据在提交给服务器的时候，需要处理的
      this.spuImageList = fileList;
    },
    // 照片墙图片预览的回调
    handlePictureCardPreview(file) {
      // 将图片地址赋值给这个属性
      this.dialogImageUrl = file.url;
      // 将对话框显示
      this.dialogVisible = true;
    },
    // 照片墙上传成功的回调
    handleSuccess(response,file,fileList){
      // 收集图片的信息
      this.spuImageList = fileList;
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
    // 点击添加销售属性按钮的回调
    addSaleAttr(){
      // 需要把收集到的销售属性数据进行分割
      // 先将id和name解构出来
      const [baseSaleAttrId,saleAttrName] = this.attrIdAndAttrName.split(':');
      // 向SPU对象的spuSaleAttrList属性里面添加新的销售属性
      let newSaleAttr = {baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]};
      // 添加新的销售属性
      this.spu.spuSaleAttrList.push(newSaleAttr);
      // 清空数据
      this.attrIdAndAttrName = '';
    },
    // 销售属性中添加新的销售属性值按钮的回调
    addSaleAttrValue(row,index){
      // 点击销售属性值当中的添加按钮的时候，需要由button变为input
      // 给row添加一个响应式属性 inputVisible，值为true
      // 挂载在销售属性身上的响应式数据inputVisible，控制button与input的切换
      this.$set(row,'inputVisible',true);
      // 通过响应式数据inputValue字段收集新增的销售属性值
      this.$set(row,'inputValue','');
      // 获取input节点，实现自动聚焦
      this.$nextTick(()=>{
        this.$refs[index].focus();
      });
    },
    // el-input失去焦点的事件
    handleInputConfirm(row){
      // 解构出销售属性当中收集的数据
      const {baseSaleAttrId,saleAttrName,inputValue} = row;
      // 新增的销售属性值的名称不能为空
      if(inputValue.trim() == ''){
        this.$message('属性值不能为空');
        return;
      }
      // 新增的销售属性值不能重复
      let result = row.spuSaleAttrValueList.every(item=>{
        return item.saleAttrValueName != inputValue;
      });
      if(!result){
        return;
      }
      // 新增的销售属性值
      let newSaleAttrValue = {baseSaleAttrId,saleAttrName,saleAttrValueName:inputValue};
      // 新增
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      // 将input变为button
      row.inputVisible = false;
    },
    // 保存按钮的回调
    async addOrUpdataSpu(){
      // 整理参数:需要整理照片墙的数据
      // 携带参数:对于图片，需要携带imageName与imageUrl字段
      this.spu.spuImageList = this.spuImageList.map(item=>{
        return {
          imageName:item.name,
          imageUrl:(item.response&&item.response.data)||item.url,
        }
      })
      // 发请求
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu);
      if(result.code == 200){
        // 提示
        this.$message({type:'success',message:'保存成功'});
        // 通知父组件回到场景0
        this.$emit('changeScene',{scene:0,flag:this.spu.id?'修改':'添加'});
      }
    },
    // 点击添加SPU按钮的时候，发请求的函数
    async addSpuDate(category3Id){
      // 添加SPU的时候收集三级分类的id
      this.spu.category3Id = category3Id;
      // 获取品牌的信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      // 获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    // 
    cancel(){
      $emit('changeScene',  {scene:0,flag:''})
    }
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