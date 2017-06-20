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
      const index = (this.$store.getters.currentCharacter.id === '') ? this.$store.getters.bookmarks.indexOf(spell.name) : this.$store.getters.currentCharacter.spellBook.indexOf(spell.name)
      return (index !== -1) ? true : false
    }
  }
}
</script>

<style>

</style>
