<template>
  <div id="app">
    <navbar></navbar>

    <characterList v-if="$store.getters.mode === 'characterList'"></characterList>

    <characterForm v-if="$store.getters.mode === 'characterCreate'"></characterForm>

    <spellList v-if="$store.getters.mode === 'spells'"></spellList>
  </div>
</template>

<script>
import _ from 'lodash'
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
  created: function () {
    this.loadBookmarks()
    this.loadCharacters()
  },
  methods: {
    loadBookmarks() {
      if (localStorage['bookmarks'] !== undefined) {
        this.$store.state.bookmarks = JSON.parse(localStorage['bookmarks'])
      }
    },
    loadCharacters () {
      if (localStorage['characters'] !== undefined) {
        this.$store.state.characters = JSON.parse(localStorage['characters'])
      }
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
