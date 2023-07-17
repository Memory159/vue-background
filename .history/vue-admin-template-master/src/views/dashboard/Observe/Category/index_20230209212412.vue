<template>
  <el-card>
    <div slot="header">
      <div class="category-header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="value">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div>
        <div class="chartstwo" ref="charts"></div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "",
  data() {
    return {
        value:'全部渠道'
    }
  },
};
</script>

<style scoped>
.category-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.charts{
    width:100%;
    height: 300px;
}
</style>