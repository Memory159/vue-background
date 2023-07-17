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

<style>
</style>
