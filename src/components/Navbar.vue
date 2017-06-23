<template>
    <nav class="navbar navbar-inverse bg-inverse mb-2">
        <a class="navbar-brand" href="#"><span v-if="$store.state.currentCharacter.id !== ''">{{ $store.state.currentCharacter.name }}'s </span>Spellbook</a>

        <a href="#" @click.prevent="showCharacters">Characters</a>
        <a href="#" @click.prevent="showBookmarked">Bookmarked</a>
        <a href="#" @click.prevent="showAllSpells">All Spells</a>
        
        <form class="form-inline my-2 my-lg-0" @submit.prevent="search" v-show="this.$store.getters.mode === 'spells'">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" v-model="searchQuery">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
    </nav>
</template>

<script>
export default {
    data () {
        return {
            searchQuery: ''
        }
    },
    methods: {
        search () {
            this.$store.dispatch('searchSpells', this.searchQuery)
        },
        showBookmarked () {
            this.$store.dispatch('filterBookmarkedSpells')
        },
        showAllSpells () {
            this.$store.dispatch('changeMode', 'spells')
        },
        showCharacters () {
            this.$store.dispatch('changeMode', 'characterList')
        }
    }
}
</script>

<style scoped>
.navbar-brand {
  float: none;
}
.navbar-nav .nav-item {
  float: none;
}
.navbar-divider,
.navbar-nav .nav-item+.nav-item,
.navbar-nav .nav-link + .nav-link {
  margin-left: 0;
}
@media (min-width: 34em) {
  .navbar-brand {
    float: left;
    margin-right: 2rem;
  }
  .navbar-nav .nav-item {
    padding-top: .535rem;
    float: left;
  }
  .navbar-divider,
  .navbar-nav .nav-item + .nav-item,
  .navbar-nav .nav-link + .nav-link {
 
    margin-left: 2rem;
  }
}
@media (max-width: 34em) {
  .navbar-brand {
      display: block;
      height: 50px;
      padding: .55rem 0;
  }
 
}
 
.navbar-toggler {
    vertical-align:middle;
    padding: .7rem .7rem;
    margin: .5rem .25rem;
    background-color: transparent;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}
 
.navbar-toggler {
    border-color: #ddd;
}
.navbar-toggler:focus, .navbar-toggler:hover {
    background-color: #ddd;
}
.navbar-toggler .icon-bar {
    display: block;
    width: 22px;
    height: 2px;
    border-radius: 1px;
}
.navbar-toggler .icon-bar {
    background-color: #888;
}
.navbar-toggler .icon-bar+.icon-bar {
    margin-top: 4px;
}
</style>