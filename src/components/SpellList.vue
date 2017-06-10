<template>
  <div class="container-fluid">
      <spell v-for="(spell, index) in spells" v-bind:spell="spell" v-bind:key="index"></spell>
  </div>
</template>

<script>
import Spell from './Spell'

export default {
  props: ['spells'],
  components: {
    Spell
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
