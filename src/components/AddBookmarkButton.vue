<template>
    <button v-if="showButton" class="btn d-inline-block" :class="{'btn-success': !bookmarked, 'btn-danger': bookmarked}" @click="bookmarkSpell(spell)"><i class="fa" :class="{'fa-bookmark fa-lg': !bookmarked, 'fa-star': bookmarked}"></i></button>
</template>
<script>
    export default {
    props: ['spell'],
    computed: {
        showButton: function () {
            return this.$store.state.currentCharacter.id !== ''
        },
        bookmarked: function () {
            return this.$store.getters.isSpellBookmarked(this.spell)
        }
    },
    methods: {
        bookmarkSpell(spell) {
            // If this isnt bookmarked (default)
            if (!this.bookmarked) {
                this.$store.dispatch('addBookmark', spell)
            }
            else {
                this.$store.dispatch('removeBookmark', spell)
            }
        }
    }
}
</script>
<style>

</style>