<template>
    <div class="navbar-inverse bg-inverse mb-2 py-1">
        <div class="row">
            <div class="col px-4">
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
                        <router-link class="nav-link" to="/characters">
                            <i class="fa fa-users"></i> Characters</router-link>
                    </li>
                    <li v-if="this.$store.state.currentCharacter.id === ''" class="nav-item mr-3">
                        <router-link class="nav-link" to="/bookmarks">
                            <i class="fa fa-bookmark"></i> Bookmarked </router-link>
                    </li>
                    <li v-else class="nav-item mr-3">
                        <router-link class="nav-link" to="/spellbook">
                            <i class="fa fa-book"></i> {{ this.$store.state.currentCharacter.name + '\'s Spellbook' }}</router-link>
                    </li>
                    <li class="nav-item mr-3">
                        <router-link class="nav-link" to="/spells">
                            <i class="fa fa-book"></i> All Spells</router-link>
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
    methods: {
        search() {
            this.$store.dispatch('searchSpells', this.searchQuery)
        }
    }
}
</script>

<style scoped>

</style>