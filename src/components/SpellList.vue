<template>
  <div class="mx-1">
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
      
        <spellListItem v-for="(spell, index) in spells" :key="index" :spell="spell"></spellListItem>

        <tr v-if="spells.length === 0">
          <td class="text-center">
            <h4>No Spells found :(</h4>
          </td>
        </tr>

      </tbody>
    </table>

    <SpellFiltersModal></SpellFiltersModal>
    <spellDetailsModal></spellDetailsModal>
  </div>
</template>

<script>
import SpellListItem from './SpellListItem'
import SpellFiltersModal from './SpellFiltersModal'
import SpellDetailsModal from './SpellDetailsModal'

export default {
  components: {
    SpellListItem,
    SpellDetailsModal,
    SpellFiltersModal
  },
  computed: {
    spells: function () {
      switch(this.$route.path) {
        case '/spellbook': 
          return this.$store.getters.bookmarkedSpells
          break;
        default:
          return this.$store.getters.filteredSpells
          break;
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if(to.path === '/spells') {
        vm.$store.dispatch('searchSpells', '')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  
</style>
