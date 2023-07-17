<template>
  <div class="dashboard-container">
      <Card></Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Card from './Card';
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  components:{
    Card
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 0px 0px 10px 10px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
