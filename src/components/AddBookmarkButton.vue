<template>
    <v-btn raised fab dark :small="small" v-if="showButton" class="btn d-inline-block" :class="{'green': !bookmarked, 'red darken-4': bookmarked}" @click="bookmarkSpell(spell)"><i class="fa" :class="{'fa-bookmark fa-lg': !bookmarked, 'fa-star': bookmarked}"></i></v-btn raised>
</template>
<script>
    export default {
        props: ['spell', 'small'],
        computed: {
            showButton: function () {
                return this.$store.state.currentCharacter.id !== ''
            },
            bookmarked: function () {
                return this.$store.getters.isSpellBookmarked(this.spell)
            }
        },
        methods: {
            bookmarkSpell (spell) {
                // If this isnt bookmarked (default)
                if (!this.bookmarked) {
                    this.$store.dispatch ('addBookmark', spell)
                }
                else {
                    this.$store.dispatch ('removeBookmark', spell)
                }
            }
        }
    }
</script>
<style>

</style>