<template>
<div id="spellDetailsModal" class="modal fade">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title">{{ spell.name }} - <small>{{ spell.level }}</small></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col mb-4">
            <span class="align-middle ">{{ spell.class }}</span>
          </div>
          <div class="col">
            <addBookmarkButton :spell="spell" class="pull-right"></addBookmarkButton>
          </div>
        </div>
        
        <table class="table text-muted table-sm">
          <tr>
            <td>Cast Time: <br> {{ spell.casting_time }}</td>
            <td>Components: <br> {{ spell.components }}</td>
          </tr>
          <tr>
            <td>Range: <br> {{ spell.range }}</td>
            <td>Duration: <br> {{ spell.duration }}</td>
          </tr>
          <tr>
            <td>Concentration: <br> {{ spell.concentration }}</td>
            <td>Materials: <br> {{ spell.material }}</td>
          </tr>
        </table>
        <p class="card-text" v-html="spell.desc"></p>
        <p class="card-text" v-html="spell.higher_level"></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</template>


<script>
import AddBookmarkButton from './AddBookmarkButton'
export default {
  components: {
    AddBookmarkButton
  },
  computed: {
    spell: function () {
      return this.$store.getters.selectedSpell
    }
  }
}
</script>
<style>

</style>