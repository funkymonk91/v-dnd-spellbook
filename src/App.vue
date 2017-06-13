<template>
  <div id="app">
    <navbar v-on:search-spells="searchSpells" v-on:filter-bookmarked="filterBookmarked"></navbar>
    <spellList v-bind:spells="filteredSpells" v-bind:bookmarks="bookmarks"></spellList>
  </div>
</template>

<script>
import spells from './data/spells.json'
import Navbar from './components/Navbar'
import SpellList from './components/SpellList'

export default {
  name: 'app',
  components: {
    Navbar,
    SpellList
  },
  data () {
    return {
      spells: spells,
      filteredSpells: spells,
      bookmarks: []
    }
  },
  created: function () {
   this.loadBookmarks()
  },
  methods: {
    loadBookmarks() {
      if (localStorage['bookmarks'] !== undefined) {
        console.log('loadBookmarks');
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
        this.filteredSpells = this.spells
      }
    },
    filterBookmarked () {
      console.log('filter bookmarked')
    }
  }
}
</script>

<style>

</style>
