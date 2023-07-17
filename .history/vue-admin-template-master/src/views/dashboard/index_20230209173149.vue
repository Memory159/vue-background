<template>
  <div class="dashboard-container">
      <Card></Card>
      <Sale></Sale>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Card from './Card';
import Sale from './Sale';
import Observe from './Observe';
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  components:{
    Card,
    Sale,
    Observe,
  }
}
</script>

<style>
</style>
