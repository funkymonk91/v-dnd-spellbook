<template>
  <tr :class="{ 'table-success': bookmarked }">
    <td>
      <div class="row">
        <div class="col-5">
          <h4>{{ spell.name }}</h4>
        </div>
        <div class="col-3">{{ spell.class }}</div>
        <div class="col">{{ spell.level }}</div>
        <div class="col text-center">
          <button class="btn btn-primary d-inline-block" @click="showSpellDetailsModal(spell)"><i class="fa fa-info fa-lg"></i></button>

           <addBookmarkButton :spell="spell"></addBookmarkButton> 
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import AddBookmarkButton from './AddBookmarkButton'

export default {
  props: ['spell'],
  components: {
    AddBookmarkButton
  },
  computed: {
    bookmarked: function () {
      return this.$store.getters.isSpellBookmarked(this.spell)
    }
  },
  methods: {
    showSpellDetailsModal (spell) {
      this.$store.dispatch('selectSpell', spell)
      $("#spellDetailsModal").modal()
    }
  }
}
</script>

<style lang="scss" scoped>
  h4 {
    display: inline-block;
  }
</style>