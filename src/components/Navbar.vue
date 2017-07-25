<template>
    <div class="navbar-inverse sticky-top bg-inverse mb-2 pt-2 pb-1">
        <div class="container-fluid">
            <div class="row">
                <div class="col px-4">
                    <form class="form-inline" @submit.prevent="search">
                        <input id="search" class="form-control col mr-sm-2" type="search" placeholder="Search Spells" :value="searchQuery" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
                        <button class="btn btn-outline-success" type="submit"><i class="fa fa-search fa-lg"></i></button>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <ul class="navbar-nav justify-content-center d-flex flex-row">
                        <li class="nav-item mr-3">
                            <router-link class="nav-link" :class="{ active: $route.path === '/characters' }" to="/characters">
                                <i class="fa fa-users fa-lg"></i> <span class="hidden-xs-down">Characters</span>
                            </router-link>
                        </li>
                        <li v-if="this.$store.state.currentCharacter.id !== ''" class="nav-item mr-3">
                            <router-link class="nav-link" :class="{ active: $route.path === '/spellbook' }" to="/spellbook">
                                <i class="fa fa-bookmark fa-lg"></i> <span class="hidden-xs-down">{{ this.$store.state.currentCharacter.name + '\'s Spellbook' }}</span>
                            </router-link>
                        </li>
                        <li class="nav-item mr-3">
                            <router-link class="nav-link" :class="{ active: $route.path === '/spells' }" to="/spells">
                                <i class="fa fa-book fa-lg"></i> <span class="hidden-xs-down">All Spells</span>
                            </router-link>
                        </li>
                         <li v-if="showFilterButton" class="nav-item mr-3">
                            <a href="#" class="nav-link" @click.prevent="filters">
                                <i class="fa fa-filter fa-lg"></i> <span class="hidden-xs-down">Filter</span>
                            </a>
                        </li> 
                        <li class="nav-item mr-3">
                            <a class="nav-link" @click.prevent="settings">
                                <i class="fa fa-gear fa-lg"></i> <span class="hidden-xs-down">Settings</span>
                            </a>
                        </li>  
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        searchQuery: function () {
            return this.$store.getters.searchQuery
        },
        showFilterButton: function () {
            return (this.$route.path === '/spells' || this.$route.path ===  '/spellbook')
        }
    },
    methods: {
        search(e) {
            // change to spells route if we arent on it on submit
            if(this.$route.path !== '/spells') {
                this.$router.push('spells')
            }

            this.$store.dispatch('searchSpells', e.target.children.search.value)
        },
        filters() {
            $("#spellFiltersModal").modal()
        },
        settings() {
            $("#settingsModal").modal()
        }
    }
}
</script>

<style scoped>

</style>