<template>

            <div class="mx-1">
                <h2><i class="fa fa-users"></i> Characters</h2>
                <table class="table">
                    <thead class="table-inverse">
                        <tr>
                            <td>
                                <div class="row">
                                    <div class="col-3 col-sm-3">Name</div>
                                    <div class="col-3 col-sm-3">Race</div>
                                    <div class="col-2 col-sm-2">Class</div>
                                    <div class="col-1 col-sm-2">Level</div>
                                    <div class="col-sm-2"></div>
                                </div>
                            </td>
                        </tr>
                    </thead>
                    <tbody class="table-striped table-hover">
                        <characterListItem 
                            v-for="(character, index) in characters" 
                            v-bind:character="character" 
                            v-bind:key="index"></characterListItem>
                        <tr v-if="characters.length === 0">
                            <td colspan="5" class="text-center">No Characters Found :(</td>
                        </tr>
                    </tbody>
                </table>

                <button class="btn btn-success" @click="createCharacter"><i class="fa fa-plus"></i> Create New Character</button>
            </div>

</template>

<script>
import CharacterListItem from './CharacterListItem.vue'

export default {
    components: {
        CharacterListItem
    },
    computed: {
        characters: function () {
            return this.$store.getters.characters
        }
    },
    methods: {
        createCharacter: function () {
            this.$store.dispatch('createCharacter')
            this.$router.push('/characterForm')
        }
    }
}
</script>

<style>

</style>