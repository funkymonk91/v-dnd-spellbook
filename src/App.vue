<template>
  <div id="app">
    <navbar></navbar>

    <router-view></router-view>
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
    Navbar
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
    }
  }
}
</script>

<style>

</style>
