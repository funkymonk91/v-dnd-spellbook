<template>
  <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12" v-if="spells.length === 0">
          <p>:( No Spells found</p>
        </div>

        <spellListItem v-for="(spell, index) in spells" :key="index" :spell="spell" :bookmarked="isSpellBookmarked(spell)"></spellListItem>
      </div>
  </div>
</template>

<script>
import SpellListItem from './SpellListItem'

export default {
  components: {
    SpellListItem
  },
  computed: {
    spells: function() {
      return this.$store.getters.filteredSpells
    }
  },
  methods: {
    isSpellBookmarked (spell) {
      const index = this.$store.getters.bookmarks.indexOf(spell.name)
      const returnVal = (index !== -1) ? true : false
      return returnVal
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  button {
    cursor: pointer;
  }
</style>
