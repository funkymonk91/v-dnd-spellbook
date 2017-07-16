<template>
  <div id="app">
    <navbar></navbar>
  
    <router-view></router-view>
  </div>
</template>

<script>
import _ from 'lodash'
import Navbar from './components/Navbar'

export default {
  name: 'app',
  components: {
    Navbar
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
    if (localStorage['filters'] !== undefined) {
      this.$store.state.filters.user = JSON.parse(localStorage['filters'])
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$state.dispatch('clearSearch')
    next()
  }
}
</script>

<style>

</style>
