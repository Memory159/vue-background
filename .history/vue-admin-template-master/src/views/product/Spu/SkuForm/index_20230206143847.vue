<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="SPU名称">
        海绵宝宝
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input placeholder="规格描述" type="textarea" rows="4"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form label-width="80px" :inline="true">
          <el-form-item label="屏幕尺寸">
            <el-select  placeholder="请选择" value="">
              <el-option label="label" value=""></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form label-width="80px" :inline="true">
          <el-form-item label="颜色">
            <el-select  placeholder="请选择" value="">
              <el-option label="label" value=""></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table style="width:100%" border>
          <el-table-column width="80" type="selection"></el-table-column>
          <el-table-column label="图片"></el-table-column>
          <el-table-column label="名称"></el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    name:'',
    data() {
      return {
        // 存储图片的信息
        spuImageList:[],
      }
    },
    methods: {
      // 获取sku数据
      async getData(category1Id,category2Id,spu){
        // 获取图片的数据
        let result = await this.$API.sku.reqSpuImageList(spu.id);
        if(result.code == 200){
          this.spuImageList = result.data;
        }
        // 获取销售属性的数据
        this.$API.sku.
      }
    },
}
</script>

<style>

</style>