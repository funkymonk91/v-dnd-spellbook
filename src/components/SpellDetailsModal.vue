<template>
  <v-dialog>

  </v-dialog>
  <!-- <div id="spellDetailsModal" class="modal fade">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">{{ spell.name }} -
            <small>{{ spell.level }}</small>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col mb-4">
              <small class="text-muted"><em>{{ spell.class }}</em></small class="text-muted">
            </div>
            <div class="col">
              <addBookmarkButton :spell="spell" class="pull-right"></addBookmarkButton>
            </div>
          </div>
  

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div> -->
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
  },
  methods: {
    
  }
}
</script>
<style>

</style>