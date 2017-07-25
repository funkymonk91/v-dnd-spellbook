<template>
  <div id="spellFiltersModal" class="modal fade">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header bg-success text-white">
          <h5 class="modal-title">
            <i class="fa fa-filter"></i> Filters
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body px-0">
          <div class="container">
            <form action="">
              <div class="row">
  
                <!-- CLASS  -->
                <div class="px-2 col-6 col-lg-4">
                  <div class="form-group mb-2">
                    <label for="">Class:</label>
                    <select class="form-control" v-model="filters.class" @change="saveFilters">
                      <option value="" selected></option>
                      <option v-for="(item, index) in classes" :key="index">{{ item.name }}</option>
                      <option value="Ritual Caster">Ritual Caster</option>
                    </select>
                  </div>
                </div>
  
                <!-- SPELL LEVEL  -->
                <div class="px-2 col-6 col-lg-4">
                  <div class="form-group mb-2">
                    <label for="">Level:</label>
                    <select class="form-control" v-model="filters.level" @change="saveFilters">
                      <option value="" selected></option>
                      <option v-for="(item, index) in spellLevels" :key="index" :value="item">{{ item }}</option>
                    </select>
                  </div>
                </div>
  
                <!-- SPELL SCHOOL  -->
                <div class="px-2 col-6 col-lg-4">
                  <div class="form-group mb-2">
                    <label for="">School:</label>
                    <select class="form-control" v-model="filters.school" @change="saveFilters">
                      <option value="" selected></option>
                      <option v-for="(item, index) in schools" :key="index" :value="item">{{ item }}</option>
                    </select>
                  </div>
                </div>
  
                <!-- COMPONENTS  -->
                <div class="px-2 col-6 col-lg-4">
                  <div class="form-group mb-2">
                    <label for="">Components:</label>
                    <select class="form-control" v-model="filters.components" @change="saveFilters">
                      <option value="" selected></option>
                      <option v-for="(item, index) in components" :key="index" :value="item">{{ item }}</option>
                    </select>
                  </div>
                </div>
  
                <!-- CONCENTRATION  -->
                <div class="px-2 col-6 col-lg-4">
                  <div class="form-group mb-2">
                    <label for="">Concentration:</label>
                    <select class="form-control" v-model="filters.concentration" @change="saveFilters">
                      <option value="" selected></option>
                      <option v-for="(item, index) in concentrations" :key="index" :value="item">{{ item }}</option>
                    </select>
                  </div>
                </div>
  
                <!-- DURATION  -->
                <div class="px-2 col-6 col-lg-4">
                  <div class="form-group mb-2">
                    <label for="">Duration:</label>
                    <select class="form-control" v-model="filters.duration" @change="saveFilters">
                      <option value="" selected></option>
                      <option v-for="(item, index) in durations" :key="index" :value="item">{{ item }}</option>
                    </select>
                  </div>
                </div>
  
                <!-- RANGE  -->
                <div class="px-2 col-6 col-lg-4">
                  <div class="form-group mb-2">
                    <label for="">Range:</label>
                    <select class="form-control" v-model="filters.range" @change="saveFilters">
                      <option value="" selected></option>
                      <option v-for="(item, index) in ranges" :key="index" :value="item">{{ item }}</option>
                    </select>
                  </div>
                </div>
  
                <!-- CAST TIME  -->
                <div class="px-2 col-6 col-lg-4">
                  <div class="form-group mb-2">
                    <label for="">Cast Time:</label>
                    <select class="form-control" v-model="filters.castTime" @change="saveFilters">
                      <option value="" selected></option>
                      <option v-for="(item, index) in castTimes" :key="index" :value="item">{{ item }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <!-- /.row -->
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="clearFilters">Clear Filters</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  computed: {
    classes: function () {
      return this.$store.getters.characterClasses
    },
    spellLevels: function () {
      var results = _.map(_.uniqBy(this.$store.getters.spells, 'level_sort'), function (item) {
        return item.level
      });

      return results
    },
    castTimes: function () {
      var results = _.map(_.uniqBy(this.$store.getters.spells, 'casting_time'), function (item) {
        return item.casting_time
      });

      return results.sort()
    },
    components: function () {
      return ['V', 'S', 'M']
    },
    concentrations: function () {
      return ['Yes', 'No']
    },
    durations: function () {
      var results = _.map(_.uniqBy(this.$store.getters.spells, 'duration'), function (item) {
        return item.duration
      });

      return results.sort()
    },
    ranges: function () {
      var results = _.map(_.uniqBy(this.$store.getters.spells, 'range'), function (item) {
        return item.range
      });

      return results.sort()
    },
    schools: function () {
      var results = _.map(_.uniqBy(this.$store.getters.spells, 'school'), function (item) {
        return item.school
      });

      return results.sort()
    },
    filters: function () {
      return this.$store.state.filters.user
    }
  },
  methods: {
    saveFilters: _.debounce(function () {
      this.$store.dispatch('searchSpells', this.$store.getters.searchQuery)
    }, 300),
    clearFilters() {
      this.$store.dispatch('clearFilters')
      this.$store.dispatch('searchSpells', this.$store.getters.searchQuery)
    }
  }
}
</script>
<style scoped>
  label {
    padding-right:10px;
  }
</style>