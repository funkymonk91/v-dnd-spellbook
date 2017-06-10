<template>
  <div className="col-xs-12 col-md-6 col-lg-4 col-xl-3">
    <div class="card">
      <div class="card-header">

        <p class="spell-info text-muted">{{ spell.class }} <br> {{ spell.level }}</p>
        <h4 class="card-title">{{ spell.name }}</h4>
        
        <a href="#" class="btn btn-primary" v-on:click="expandSpell">Expand</a>
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

<script>
export default {
  props: ['spell'],
  data () {
    return {
      expanded: false,
      bookmarked: false
    }
  },
  methods: {
    expandSpell () {
      this.expanded = !this.expanded
    }
  }
}
</script>

<style lang="scss">
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
      position: relative;
      width: $ribbon-w;
      z-index: 2;
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