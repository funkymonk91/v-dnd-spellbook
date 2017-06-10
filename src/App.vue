<template>
  <div id="app">
    <spellList v-bind:spells="spells"></spellList>
  </div>
</template>

<script>
import spells from './data/spells.json'
import SpellList from './components/SpellList'

export default {
  name: 'app',
  components: {
    SpellList
  },
  data () {
    return {
      spells: spells
    }
  }
}
</script>

<style>

</style>
