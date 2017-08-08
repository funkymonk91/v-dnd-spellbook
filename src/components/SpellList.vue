<template>
  <div>

    <div class="text-xs-center" v-if="spells.length > 0 && spellsPerPage !== 'All'">
      <v-pagination :length="numberOfPages" v-model="currentPage"></v-pagination>
    </div>

    <v-list>
      <template v-for="(spell, index) in spells" :spell="spell" v-if="spellsPerPage === 'All' || (index >= startingIndex && index <= endingIndex)">
        <v-list-tile ripple @click.stop="showSpellDetailsModal(spell)" :key="index">
          <v-list-tile-content>
            <v-list-tile-sub-title>{{ spell.level }}</v-list-tile-sub-title>
            <v-list-tile-title>{{ spell.name }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action v-if="$route.path === '/spells'">
            <v-btn icon @click.stop="removeSpellFromSpellBook(spell)" v-if="isSpellBookmarked(spell)">
              <v-icon class='teal--text'>bookmark</v-icon>
            </v-btn>

            <v-btn icon @click.stop="addSpellToSpellBook(spell)" v-else-if="characterSelected">
              <v-icon class='grey--text'>bookmark</v-icon>
            </v-btn>

          </v-list-tile-action>
        </v-list-tile>
        <v-divider :key="index"></v-divider>
      </template>

      <div v-if="spells.length === 0" class='text-xs-center'>
        <h3>No Spells Found</h3>
      </div>
    </v-list>

    <v-dialog v-model="showSpellDetails" fullscreen transition="dialog-bottom-transition" :overlay="false">
      <v-card>
        <v-toolbar class="primary" fixed>
          <v-btn icon dark @click.stop="showSpellDetails = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title class="white--text">{{ selectedSpell.name }} -
            <small>{{ selectedSpell.level }}</small>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div style="margin-top:60px; padding-bottom: 100px;">
            <p class="pull-left">
              <em>{{ selectedSpell.class }}</em>
            </p>

            <table class="table">
              <tr>
                <td>Cast Time:
                  <br> {{ selectedSpell.casting_time }}
                </td>
                <td>Components:
                  <br>
                  <template v-for="(component, index) in selectedSpell.components.split(',')">
                    <v-chip small dark :key="index" class="white--text mx-1 px-2" :class="componentColor(component)">
                      {{ component }}
                    </v-chip>
                  </template>
                </td>
              </tr>
              <tr>
                <td>Range:
                  <br> {{ selectedSpell.range }}</td>
                <td>Duration:
                  <br> {{ selectedSpell.duration }}</td>
              </tr>
              <tr>
                <td>Concentration:
                  <br> {{ selectedSpell.concentration }}</td>
                <td>Materials:
                  <br> {{ selectedSpell.material }}</td>
              </tr>
            </table>
            <br>
            <p class="card-text" v-html="selectedSpell.desc"></p>
            <p class="card-text" v-html="selectedSpell.higher_level"></p>
          </div>
          <v-fab-transition>
            <addBookmarkButton style="position: fixed; bottom: 50px; right: 20px;" :spell="selectedSpell" v-if="showAddBookmarkButton"></addBookmarkButton>
          </v-fab-transition>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AddBookmarkButton from './AddBookmarkButton'

export default {
  components: {
    AddBookmarkButton,
  },
  data () {
    return {
      currentPage: 1,
      showSpellDetails: false
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
    selectedSpell: function () {
      return this.$store.getters.selectedSpell
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
    },
    showAddBookmarkButton: function () {
      return (this.$route.path === '/spells')
    },
    characterSelected: function () {
      return (this.$store.state.currentCharacter.id !== '')
    }
  },
  methods: {
    showSpellDetailsModal (spell) {
        this.$store.dispatch('selectSpell', spell)
        this.showSpellDetails = true
    },
    componentColor (component) {
        return this.$store.getters.spellComponentColor(component)
    },
    isSpellBookmarked (spell) {
      return this.$store.getters.isSpellBookmarked(spell)
    },
    addSpellToSpellBook (spell) {
      this.$store.dispatch ('addBookmark', spell)
    },
    removeSpellFromSpellBook (spell) {
      this.$store.dispatch ('removeBookmark', spell)
    }
  },
  watch: {
    // When spellsPerPage changes, reset to page 1
    spellsPerPage: function () {
      this.currentPage = 1
    }
  }/* ,
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if(to.path === '/spells') {
        vm.$store.dispatch('searchSpells', '')
      }
    })
  } */
}
</script>

<style scoped>
 .list__tile__content {
   padding-left:10px;
 }
</style>
