<template>
    <div class="navbar-inverse bg-inverse mb-2 py-1">
        <div class="row">
            <!--<div class="col-3 col-sm-2">
                                                <a class="navbar-brand ml-2" href="#">
                                                    Spellbook
                                                </a>
                                            </div>-->
            <div class="col px-4">
                <!--v-show="this.$store.getters.mode === 'spells'"-->
                <form class="form-inline" @submit.prevent="search">
    
                    <input class="form-control col mr-sm-2" type="search" placeholder="Search Spells" v-model="searchQuery">
                    <button class="btn btn-outline-success" type="submit">Search</button>
    
                </form>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <ul class="navbar-nav justify-content-center d-flex flex-row">
                    <li class="nav-item mr-3">
                        <a class="nav-link" href="#" @click.prevent="showCharacters">
                            <i class="fa fa-users"></i> Characters</a>
                    </li>
                    <li class="nav-item mr-3">
                        <a class="nav-link" href="#" @click.prevent="showBookmarked">
                            <i class="fa fa-bookmark"></i> {{ bookmarked }}</a>
                    </li>
                    <li class="nav-item mr-3">
                        <a class="nav-link" href="#" @click.prevent="showAllSpells">
                            <i class="fa fa-book"></i> All Spells</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!--</nav>-->
</template>

<script>
export default {
    data() {
        return {
            searchQuery: '',
        }
    },
    computed: {
        bookmarked: function () {
            if (this.$store.state.currentCharacter.id !== '') {
                return this.$store.state.currentCharacter.name + '\'s Spellbook'
            }
            return 'Bookmarked'
        }
    },
    methods: {
        search() {
            this.$store.dispatch('searchSpells', this.searchQuery)
        },
        showBookmarked() {
            this.$store.dispatch('filterBookmarkedSpells')
        },
        showAllSpells() {
            this.$store.dispatch('changeMode', 'spells')
        },
        showCharacters() {
            this.$store.dispatch('changeMode', 'characterList')
        }
    }
}
</script>

<style scoped>

</style>