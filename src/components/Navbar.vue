<template>
    <nav class="navbar navbar-light bg-faded">
        <a class="navbar-brand" href="#">Spellbook</a>
        <form class="form-inline my-2 my-lg-0" v-on:submit.prevent="search">
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
            this.$emit('search-spells', this.searchQuery)
        }
    }
}
</script>

<style scoped>
    nav {
        margin-bottom: 10px;
    }
</style>