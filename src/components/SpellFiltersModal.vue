<template>
  <v-dialog v-model="showFilters" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Filters</span>
      </v-card-title>
      <v-card-text>
        <v-layout row>
          <v-flex xs6>
            <v-select label="Class" :items="filterClasses" v-model="filters.class" @change="saveFilters"></v-select>
          </v-flex>
          <v-flex xs6>
            <v-select label="Level" :items="filterSpellLevels" v-model="filters.level" @change="saveFilters"></v-select>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs6>
            <v-select label="School" :items="filterSchools" v-model="filters.school" @change="saveFilters"></v-select>
          </v-flex>
          <v-flex xs6>
            <v-select label="Components" :items="filterComponents" v-model="filters.components" @change="saveFilters"></v-select>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs6>
            <v-select label="Concentration" :items="filterConcentrations" v-model="filters.concentration" @change="saveFilters"></v-select>
          </v-flex>
          <v-flex xs6>
            <v-select label="Duration" :items="filterDurations" v-model="filters.duration" @change="saveFilters"></v-select>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs6>
            <v-select label="Range" :items="filterRanges" v-model="filters.range" @change="saveFilters"></v-select>
          </v-flex>
          <v-flex xs6>
            <v-select label="Cast Time" :items="filterCastTimes" v-model="filters.castTime" @change="saveFilters"></v-select>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat class="blue--text darken-1" @click="clearFilters">Clear</v-btn>
        <v-btn flat class="blue--text darken-1" @click="close">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  props: [ 'showFilters', 'searchQuery' ],
  computed: {
    filterClasses: function () {
      var classes = this.$store.getters.characterClassNames
      classes.push('Ritual Caster')
      return classes.sort()
    },
    filterSpellLevels: function () {
      var results = _.map(_.uniqBy(this.$store.getters.spells, 'level_sort'), function (item) {
        return item.level
      });

      return results
    },
    filterCastTimes: function () {
      var results = _.map(_.uniqBy(this.$store.getters.spells, 'casting_time'), function (item) {
        return item.casting_time
      });

      return results.sort()
    },
    filterComponents: function () {
      return ['V', 'S', 'M']
    },
    filterConcentrations: function () {
      return ['Yes', 'No']
    },
    filterDurations: function () {
      var results = _.map(_.uniqBy(this.$store.getters.spells, 'duration'), function (item) {
        return item.duration
      });

      return results.sort()
    },
    filterRanges: function () {
      var results = _.map(_.uniqBy(this.$store.getters.spells, 'range'), function (item) {
        return item.range
      });

      return results.sort()
    },
    filterSchools: function () {
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
      this.$store.dispatch('searchSpells', this.searchQuery)
    }, 300),
    clearFilters() {
      this.$store.dispatch('clearFilters')
      this.$store.dispatch('searchSpells', this.searchQuery)
    },
    close: function () {
      this.$emit('closeFilterModal')
    }
  }
}
</script>
<style scoped>

</style>