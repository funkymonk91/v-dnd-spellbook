<template>
  <div class="container-fluid">
      <spell v-for="(spell, index) in spells" v-bind:spell="spell" v-bind:key="index" v-bind:bookmarked="isSpellBookmarked(spell)" v-on:add-bookmark="addBookmark" v-on:remove-bookmark="removeBookmark"></spell>
  </div>
</template>

<script>
import Spell from './Spell'

export default {
  props: ['spells'],
  data () {
    return {
      bookmarks: []
    }
  },
  components: {
    Spell
  },
  created: function () {
    this.loadBookmarks()
  },
  methods: {
    loadBookmarks () {
      if(localStorage['bookmarks'] !== undefined) {
        console.log('loadBookmarks');
        this.bookmarks = JSON.parse(localStorage['bookmarks'])
      }
    },
    addBookmark (spell) {
      this.bookmarks.push(spell.name)
      // Persist the bookmarks
      localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks))
    },
    removeBookmark (spell) {
      const index = this.bookmarks.indexOf(spell.name)
      this.bookmarks.splice(index, 1)
      // Persist the bookmarks
      localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks))
    },
    isSpellBookmarked (spell) {
      const index = this.bookmarks.indexOf(spell.name)
      const returnVal = (index !== -1) ? true : false
      return returnVal
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  button {
    cursor: pointer;
  }
</style>
