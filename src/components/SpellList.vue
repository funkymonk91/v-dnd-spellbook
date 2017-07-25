<template>
  <div class="px-1 table-responsive">
    <table id="spellList" class="table table-striped">
      <thead class="table-inverse">
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
  
        <spellListItem v-for="(spell, index) in spells" :key="index" :spell="spell"></spellListItem>
  
        <tr v-if="spells.length === 0">
          <td class="text-center" colspan="3">
            <h4>No Spells found :(</h4>
          </td>
        </tr>
  
      </tbody>
    </table>
  
    <spellFiltersModal></spellFiltersModal>
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
    },
    spellsPerPage: function () {
      return this.$store.getters.settings.user.spellsPerPage
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

<style>

</style>
