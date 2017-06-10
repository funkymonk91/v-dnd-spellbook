<template>
  <div class="container-fluid">
      <spell v-for="(spell, index) in spells" v-bind:spell="spell" v-bind:key="index" v-on:add-bookmark="addBookmark" v-on:remove-bookmark="removeBookmark"></spell>
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
  methods: {
    addBookmark (spell) {
      this.bookmarks.push(spell)
    },
    removeBookmark (spell) {
      const index = this.bookmarks.indexOf(spell)
      this.bookmarks.splice(index, 1)
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
