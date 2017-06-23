<template>
  <tr :class="{ 'table-info': bookmarked }">
    <td>
      <div class="row">
        <div class="col-5">
          <i class="bookmark fa fa-star fa-lg" v-show:bookmarked="bookmarked"></i> 
          <h4>{{ spell.name }}</h4>
        </div>
        <div class="col-3">{{ spell.class }}</div>
        <div class="col">{{ spell.level }}</div>
        <div class="col">
          <button class="btn btn-primary" @click="expandSpell"><i class="fa fa-lg" :class="{'fa-arrow-down': !expanded, 'fa-arrow-up': expanded}"></i></button>

          <button class="btn" :class="{'btn-success': !bookmarked, 'btn-danger': bookmarked}" @click="bookmarkSpell(spell)"><i class="fa fa-book fa-lg"></i></button>
        </div>
      </div>
      <div class="row" v-show:expanded="expanded">
        <div class="col">
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
          <p class="card-text">{{ spell.desc }}</p>
          <p class="card-text">{{ spell.higher_level }}</p>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['bookmarked', 'spell'],
  data () {
    return {
      expanded: false
    }
  },
  methods: {
    expandSpell () {
      this.expanded = !this.expanded
    },
    bookmarkSpell (spell) {
      // If this isnt bookmarked (default)
      if(!this.bookmarked) {
        this.$store.dispatch('addBookmark', spell)
      }
      else {
        this.$store.dispatch('removeBookmark', spell)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .fa-star {
    color: goldenrod;
  }

  h4 {
    display: inline-block;
  }
</style>