<template>
  <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12" v-if="spells.length === 0">
          <p>:( No Spells found</p>
        </div>

        <spell v-for="(spell, index) in spells" v-bind:spell="spell" v-bind:key="index" v-bind:bookmarked="isSpellBookmarked(spell)" v-on:add-bookmark="addBookmark" v-on:remove-bookmark="removeBookmark"></spell>

      </div>
  </div>
</template>

<script>
import Spell from './Spell'

export default {
  props: ['spells', 'bookmarks'],
  data () {
    return {
    }
  },
  components: {
    Spell
  },
  methods: {
    isSpellBookmarked (spell) {
      const index = this.bookmarks.indexOf(spell.name)
      const returnVal = (index !== -1) ? true : false
      return returnVal
    },
    addBookmark(spell) {
      this.bookmarks.push(spell.name)
      // Persist the bookmarks
      localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks))
    },
    removeBookmark(spell) {
      const index = this.bookmarks.indexOf(spell.name)
      this.bookmarks.splice(index, 1)
      // Persist the bookmarks
      localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks))
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
