<template>
    <div class="container-fluid">
        <h2><i class="fa fa-users"></i> Characters</h2>
        <table class="table">
            <thead class="thead-inverse">
                <tr>
                    <th>Name</th>
                    <th>Race</th>
                    <th>Class</th>
                    <th>Level</th>
                    <th></th>
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

        <button class="btn btn-success" v-on:click="$store.dispatch('createCharacter')"><i class="fa fa-plus"></i> Create New Character</button> 
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
        }
    }
}
</script>

<style>

</style>