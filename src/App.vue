<template>
  <div id="app">
    <navbar 
      v-on:search-spells="searchSpells" 
      v-on:filter-bookmarked="filterBookmarked" 
      v-on:clear-filters="clearFilters"
      v-on:show-characters="showCharacters"
      v-bind:mode="mode">
    </navbar>

    <characterList 
      v-if='mode === "characterList"'
      v-on:create-character="createCharacter"
      v-on:edit-character="editCharacter"
      v-bind:characterClasses="characterClasses"
      v-bind:characterRaces="characterRaces"
      v-bind:characters="characters">
    </characterList>

    <characterForm 
      v-if='mode === "createCharacter"'
      v-bind:characterClasses="characterClasses"
      v-bind:characterRaces="characterRaces"
      v-bind:characters="characters"
      v-bind:character="character">
    </characterForm>

    <spellList 
      v-if="mode === 'spells'"
      v-bind:spells="filteredSpells" 
      v-bind:bookmarks="bookmarks">
    </spellList>

  </div>
</template>

<script>
import spells from './data/spells.json'
import characterClasses from './data/classes.json'
import characterRaces from './data/races.json'
import Navbar from './components/Navbar'
import SpellList from './components/SpellList'
import CharacterList from './components/CharacterList'
import CharacterForm from './components/CharacterForm'

export default {
  name: 'app',
  components: {
    Navbar,
    SpellList,
    CharacterList,
    CharacterForm
  },
  data () {
    return {
      mode: "characterList",
      spells: spells,
      filteredSpells: spells,
      characterClasses: characterClasses,
      characterRaces: characterRaces,
      bookmarks: [],
      character: {},
      characters: []
    }
  },
  created: function () {
    this.loadBookmarks()
    this.loadCharacters()
  },
  methods: {
    loadBookmarks() {
      if (localStorage['bookmarks'] !== undefined) {
        this.bookmarks = JSON.parse(localStorage['bookmarks'])
      }
    },
    loadCharacters () {
      if (localStorage['characters'] !== undefined) {
        this.characters = JSON.parse(localStorage['characters'])
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
      this.mode = "characterList"
    },
    createCharacter () {
      this.mode = "createCharacter"
    },
    editCharacter () {
      this.mode = "createCharacter"
    }
  }
}
</script>

<style>

</style>
