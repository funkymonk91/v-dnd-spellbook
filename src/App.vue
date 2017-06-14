<template>
  <div id="app">
    <navbar 
      v-on:search-spells="searchSpells" 
      v-on:filter-bookmarked="filterBookmarked" 
      v-on:clear-filters="clearFilters"
      v-on:show-characters="showCharacters"
      v-bind:mode="mode">
    </navbar>

    <characterForm 
      v-if='mode === "character"'
      v-bind:characterClasses="characterClasses"
      v-bind:characterRaces="characterRaces">
    </characterForm>

    <spellList 
      v-bind:spells="filteredSpells" 
      v-bind:bookmarks="bookmarks" 
      v-if="mode === 'spells'">
    </spellList>

  </div>
</template>

<script>
import spells from './data/spells.json'
import characterClasses from './data/classes.json'
import characterRaces from './data/races.json'
import Navbar from './components/Navbar'
import SpellList from './components/SpellList'
import CharacterForm from './components/CharacterForm'

export default {
  name: 'app',
  components: {
    Navbar,
    SpellList,
    CharacterForm
  },
  data () {
    return {
      mode: "character",
      spells: spells,
      filteredSpells: spells,
      characterClasses: characterClasses,
      characterRaces: characterRaces,
      bookmarks: [],
      characters: []
    }
  },
  created: function () {
    this.loadBookmarks()
  },
  methods: {
    loadBookmarks() {
      if (localStorage['bookmarks'] !== undefined) {
        this.bookmarks = JSON.parse(localStorage['bookmarks'])
      }
    },
    searchSpells (searchQuery) {
      searchQuery = searchQuery.toLowerCase()
      console.log(searchQuery)
      if(searchQuery !== '') {
        var tempFilteredSpells = []
        // Loop through all the spells
        for (var i = 0; i < spells.length; i++) {
          var spell = spells[i];
          
          // Spell props that we are comparing against
          if(
            spell.name.toLowerCase().indexOf(searchQuery) !== -1
            || spell.level.indexOf(searchQuery) !== -1
            || spell.school.toLowerCase().indexOf(searchQuery) !== -1
            || spell.class.toLowerCase().indexOf(searchQuery) !== -1
          ) {
            tempFilteredSpells.push(spell)
          }         
        }
        this.filteredSpells = tempFilteredSpells 
      }
      else {
        this.clearFilter()
      }
    },
    filterBookmarked () {
      var tempFilteredSpells = []
      // Loop through all the spells
      for (var i = 0; i < spells.length; i++) {
        var spell = spells[i];

        // Spell props that we are comparing against
        if (this.bookmarks.indexOf(spell.name) !== -1) {
          tempFilteredSpells.push(spell)
        }
      }
      this.filteredSpells = tempFilteredSpells
      this.mode = 'spells'
    },
    clearFilters () {
      this.filteredSpells = this.spells
      this.mode = 'spells'
    },
    showCharacters () {
      this.mode = "character"
    }
  }
}
</script>

<style>

</style>
