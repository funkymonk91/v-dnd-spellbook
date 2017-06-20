<template>
    <nav class="navbar navbar-inverse bg-inverse">
        <a class="navbar-brand" href="#"><span v-if="$store.state.currentCharacter.id !== ''">{{ $store.state.currentCharacter.name }}'s </span>Spellbook</a>

        <a href="#" @click.prevent="showCharacters">Characters</a>
        <a href="#" @click.prevent="showBookmarked">Bookmarked</a>
        <a href="#" @click.prevent="showAllSpells">All Spells</a>

        <form class="form-inline my-2 my-lg-0" @submit.prevent="search" v-show="this.$store.getters.mode === 'spells'">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" v-model:searchQuery="searchQuery">
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
    nav {
        margin-bottom: 10px;
    }
</style>