<template>
    <v-btn raised fab dark v-if="showButton" class="btn d-inline-block" :class="{'green': !bookmarked, 'red darken-4': bookmarked}" @click="bookmarkSpell(spell)">
        <v-icon v-if="bookmarked">star</v-icon>
        <v-icon v-else>bookmark</v-icon>
    </v-btn>
</template>
<script>
    export default {
        props: ['spell'],
        computed: {
            showButton: function () {
                return this.$store.getters.currentCharacter.id !== ''
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