<template>
    <nav class="navbar navbar-inverse bg-inverse">
        <a class="navbar-brand" href="#">Spellbook</a>

        <a href="#" v-on:click.prevent="showCharacters">Characters</a>
        <a href="#" v-on:click.prevent="showBookmarked">Bookmarked</a>
        <a href="#" v-on:click.prevent="showAllSpells">All Spells</a>

        <form class="form-inline my-2 my-lg-0" v-on:submit.prevent="search" v-show="mode === 'spells'">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" v-model:searchQuery="searchQuery">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
    </nav>
</template>

<script>
export default {
    props: ['mode'],
    data () {
        return {
            searchQuery: ''
        }
    },
    methods: {
        search () {
            this.$emit('search-spells', this.searchQuery)
        },
        showBookmarked () {
            this.$emit('filter-bookmarked')
        },
        showAllSpells () {
            this.$emit('clear-filters')
        },
        showCharacters () {
            this.$emit('show-characters')
        }
    }
}
</script>

<style scoped>
    nav {
        margin-bottom: 10px;
    }
</style>