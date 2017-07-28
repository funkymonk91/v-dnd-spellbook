<template>
  <div>
    <div id="spellListWrapper" class="px-1">
      <ul v-if="spellsPerPage !== 'All'" class="pagination justify-content-center my-1">
        <li class="page-item"><a class="page-link" href="#" @click.prevent="previousPage"><i class="fa fa-arrow-left"></i></a></li>
        <!-- <li v-for="n in numberOfPages" :key="n" class="page-item"><a class="page-link" href="#" @click.prevent="gotoPage(n)">{{ n }}</a></li> -->
        <li class="page-item"><a class="page-link" href="#" @click.prevent="nextPage"><i class="fa fa-arrow-right"></i></a></li>
      </ul>

      <table id="spellList" class="table table-striped">
        <thead class="table-inverse ">
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <spellListItem
            v-for="(spell, index) in spells"
            v-if="spellsPerPage === 'All' || (index >= startingIndex && index <= endingIndex)"
            :key="index"
            :spell="spell">
          </spellListItem>

          <tr v-if="spells.length === 0">
            <td class="text-center" colspan="3">
              <h4>No Spells found :(</h4>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ul v-if="spellsPerPage !== 'All'" class="pagination justify-content-center mt-1">
      <li class="page-item"><a class="page-link" href="#" @click.prevent="previousPage"><i class="fa fa-arrow-left"></i></a></li>
      <!-- <li v-for="n in numberOfPages" :key="n" class="page-item"><a class="page-link" href="#" @click.prevent="gotoPage(n)">{{ n }}</a></li> -->
      <li class="page-item"><a class="page-link" href="#" @click.prevent="nextPage"><i class="fa fa-arrow-right"></i></a></li>
    </ul>

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
  data () {
    return {
      currentPage: 1
    }
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
      // get it from the settings.
      return this.$store.getters.settings.user.spellsPerPage
    },
    numberOfPages: function () {
      // round up. can't have a partial page.
      return Math.ceil(this.spells.length / this.spellsPerPage);
    },
    startingIndex: function () {
      return this.currentPage * this.spellsPerPage - this.spellsPerPage
    },
    endingIndex: function () {
      return this.currentPage * this.spellsPerPage - 1
    }
  },
  methods: {
    nextPage: function () {
      if(this.currentPage + 1 <= this.numberOfPages) {
        this.currentPage++;
        window.scrollTo(0, 0);
      }
    },
    previousPage: function () {
      if(this.currentPage - 1 > 0) {
        this.currentPage--;
        window.scrollTo(0, 0);
      }
    },
    gotoPage: function(pageNumber) {
      this.currentPage = pageNumber
    }
  },
  watch: {
    spellsPerPage: function () {
      this.currentPage = 1
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

<style scoped>

</style>
