<template>
    <div class="container">
        <h2><i class="fa fa-users"></i> Characters</h2>
        <table class="table table-bordered">
            <thead class="thead-inverse">
                <tr>
                    <th>Name</th>
                    <th>Race</th>
                    <th>Class</th>
                    <th>Level</th>
                </tr>
            </thead>
            <tbody class="table-striped table-hover">
                <characterListItem 
                    v-for="(character, index) in characters" 
                    v-on:click.native="editCharacter(character.id)"
                    v-bind:character="character" 
                    v-bind:key="index"></characterListItem>
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
        },
        editCharacter: function (id) {
            this.$store.dispatch('editCharacter', id)
        }
    }
}
</script>

<style>

</style>