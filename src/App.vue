<template>
  <v-app id="app">
    <v-navigation-drawer persistent v-model="drawer" light enable-resize-watcher>
      <v-list>
        <router-link to="/spellbook">
          <v-list-tile avatar v-if="currentCharacter.id !== ''">
            <v-list-tile-avatar>
              <img />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ currentCharacter.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ currentCharacter.race }} - {{ currentCharacter.class }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>

        <v-divider v-if="currentCharacter.id !== ''"></v-divider>

        <router-link to="/characters">
          <v-list-tile ripple>
            Characters
          </v-list-tile>
        </router-link>

        <router-link to="/spells">
          <v-list-tile ripple>
            Spell List
          </v-list-tile>
        </router-link>

        <router-link to="/settings">
          <v-list-tile ripple>
            Settings
          </v-list-tile>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="indigo" dark fixed>
      <!-- LEFT SIDE  -->
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title v-if="!searchMode">Spellbook</v-toolbar-title>

      <v-toolbar-items v-if="searchMode">
        <v-text-field dark single-line autofocus type="search" label="Search" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" @input="search" v-model="searchQuery"></v-text-field>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <!-- RIGHT SIDE  -->
      <v-progress-circular v-if="searching" indeterminate indeterminate class="white--text"></v-progress-circular>

      <v-btn icon v-if="$route.path === '/spellbook' || $route.path === '/spells'" @click.stop="showFilters = true">
        <v-icon>filter_list</v-icon>
      </v-btn>

      <v-btn icon v-if="!searchMode" @click="searchMode = true">
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn icon v-if="searchMode" @click="searchMode = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
        <v-dialog v-model="showFilters" persistent>
          <spellFiltersModal :showFilters="showFilters" :searchQuery="searchQuery" @closeFilterModal="closeFilterModal"></spellFiltersModal>
        </v-dialog>
      </v-container>
    </main>
    <v-footer class="indigo">
      <v-spacer></v-spacer>
      <span class="white--text">© 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import _ from 'lodash'
import SpellFiltersModal from './components/SpellFiltersModal'

export default {
  name: 'app',
  components: {
    SpellFiltersModal
  },
  data () {
    return {
      drawer: false,
      searchMode: false,
      searching: false,
      searchQuery: '',
      showFilters: false
    }
  },
  computed: {
    currentCharacter: function () {
      return this.$store.getters.currentCharacter
    }
  },
  methods: {
    search: _.debounce(function () {
      // change to spells route if we arent on it on submit
      if(this.$route.path !== '/spells') {
          this.$router.push('spells')
      }

      this.$store.dispatch('searchSpells', this.searchQuery).then(() => {
        this.searching = false
      })

    }, 500),
    closeFilterModal: function () {
      this.showFilters = false
    }
  },
  created: function () {
    if (localStorage['settings'] !== undefined) {
      this.$store.state.settings.user = JSON.parse(localStorage['settings'])
    }
    if (localStorage['characters'] !== undefined) {
      this.$store.state.characters = JSON.parse(localStorage['characters'])
    }
    if (localStorage['currentCharacter'] !== undefined) {
      this.$store.state.currentCharacter = JSON.parse(localStorage['currentCharacter'])
    }
    // if (localStorage['filters'] !== undefined) {
    //   this.$store.state.filters.user = JSON.parse(localStorage['filters'])
    // }
  },
  watch: {
    searchQuery: function () {
      this.searching = true
    },
    searchMode: function () {
      if(this.searchMode === false) {
        this.searchQuery = ''
        this.search()
      }
    }
  }/* ,
  beforeRouteLeave(to, from, next) {
    this.$state.dispatch('clearSearch')
    next()
  } */
}
</script>

<style>
  .container {
    padding: 5px;
  }
</style>
