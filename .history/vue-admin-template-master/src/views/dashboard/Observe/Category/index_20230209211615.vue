<template>
  <el-card>
    <div slot="header">
      <div class="category-header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="radio1">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "",
};
</script>

<style>
.category-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>