<template>
  <div class="dashboard-container">
      <Card></Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Card from './Card';
import Sale from './Sale';
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  components:{
    Card,
    Sale
  }
}
</script>

<style>
</style>
