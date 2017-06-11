<template>
  <div class="col-xs-12 col-md-6 col-lg-4 col-xl-3">
    <div class="card">
      
      <div class="bookmark" v-show:bookmarked="bookmarked">
        <div>
          <i class="fa fa-star"></i>
        </div>
      </div>

      <div class="card-header">
        <p class="spell-info text-muted">{{ spell.class }} <br> {{ spell.level }}</p>
        <h4 class="card-title">{{ spell.name }}</h4>

        <button class="btn btn-primary" v-on:click="expandSpell" v-show:expanded="!expanded"><i class="fa fa-arrow-down"></i> Expand</button>
        <button class="btn btn-primary" v-on:click="expandSpell" v-show:expanded="expanded"><i class="fa fa-arrow-up"></i> Collapse</button>

        <button class="btn btn-success" v-show:bookmarked="!bookmarked" v-on:click="bookmarkSpell(spell)"><i class="fa fa-book"></i> Bookmark</button>
        <button class="btn btn-danger" v-show:bookmarked="bookmarked" v-on:click="bookmarkSpell(spell)"><i class="fa fa-book"></i> Remove Bookmark</button>

      </div> <!-- /card-header -->

      <div class="card-block" v-show:expanded="expanded">
        <table class="table text-muted">
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
            <td>Materials: <br> {{ spell.materials }}</td>
          </tr>
        </table>
        <p class="card-text">{{ spell.desc }}</p>
      </div> <!-- /card-block -->
    </div> <!-- /card -->
  </div>
</template>

<script defer>
export default {
  props: ['spell', 'bookmarked'],
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
      if(!this.bookmarked) {
        this.$emit('add-bookmark', spell)
      }
      else {
        console.log(1)
        this.$emit('remove-bookmark', spell)
      }
    }
  }
}
</script>

<style lang="scss">
  .card {
    margin-bottom: 10px;
  }
  .spell-info {
    font-style: italic;
    margin-bottom:0px;
  }

  $ribbon-bg: #bb3a34;
  $ribbon-hl: #e74841;
  $ribbon-w: 30px;
  $ribbon-h: 25px;
  $ribbon-tail: 10px;

  .bookmark {
      padding: 0 0 $ribbon-tail 0;
      position: absolute;
      width: $ribbon-w;
      z-index: 2;
      right: 0.25em;
      top: -0.25em;

      div {
          background: $ribbon-bg;
          background: linear-gradient($ribbon-hl 0%, $ribbon-bg 100%);
          color: #fff;
          padding: 0.5em 0;
          text-align: center;
          text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.5);
          min-height: $ribbon-h;
      }
      div:after {
          border-left: $ribbon-w/2 solid $ribbon-bg;
          border-right: $ribbon-w/2 solid $ribbon-bg;
          border-bottom: $ribbon-tail solid transparent;
          bottom: 0;
          content: '';
          height: 0;
          left: 0;
          position: absolute;
          width: 0;
      }
      .fa-star {
          color: #fdd810;
      }
  }
</style>