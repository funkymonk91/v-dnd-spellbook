<template>
  <div class="">
        <table id="spellList" class="table table-striped">
          <thead class="table-inverse">
            <tr>
              <th>
                <div class="row">
                  <div class="col-5">Name</div>
                  <div class="col-3">Class</div>
                  <div class="col">Level</div>
                  <div class="col"></div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <spellListItem v-for="(spell, index) in spells" :key="index" :spell="spell" :bookmarked="isSpellBookmarked(spell)"></spellListItem>

            <tr v-if="spells.length === 0">
              <td class="text-center">
                <h4>No Spells found :(</h4>
              </td>
            </tr>
          </tbody>
        </table>
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

<style lang="scss" scoped>

</style>
