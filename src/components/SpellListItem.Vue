<template>
  <tr :class="{ 'table-success': bookmarked }">
    <td>
      <h5>{{ spell.name }}</h5>
      <small class="text-muted">
        <em>{{ spell.class }}</em>
      </small>
    </td>
    <td>{{ spell.level }}</td>
    <td class="text-center">
      <button class="btn btn-primary" @click="showSpellDetailsModal(spell)">
        <i class="fa fa-info fa-lg"></i>
      </button>
  
      <addBookmarkButton :spell="spell" v-if="showAddBookmarkButton"></addBookmarkButton>
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
        },
        showAddBookmarkButton: function () {
            return (this.$route.path === '/spells')
        }
    },
    methods: {
        showSpellDetailsModal(spell) {
            this.$store.dispatch('selectSpell', spell)
            $('#spellDetailsModal').modal()
        }
    }
}
</script>

<style scoped>

</style>