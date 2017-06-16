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
                    v-on:click.native="$emit('edit-character', character)"
                    v-bind:character="character" 
                    v-bind:key="index"></characterListItem>
            </tbody>
        </table>

        <button class="btn btn-success" v-on:click="$emit('create-character')"><i class="fa fa-plus"></i> Create New Character</button> 
    </div>
</template>

<script>
import CharacterListItem from './CharacterListItem.vue'

export default {
    props: ['characterClasses', 'characterRaces', 'characters', 'mode'],
    components: {
        CharacterListItem
    },
    data () {
        return {
            character: {
                name: '',
                race: '',
                subRace: '',
                class: '',
                classLevel: '1',
                spellCastingScore: 0,
                newCharacter: true,
                spellBook: [],
                prepared: []
            }
        }
    },
    computed: {
        spellCastingStat: function () {
            for (var i = 0; i < this.characterClasses.length; i++) {
                if(this.character.class === this.characterClasses[i].name) {
                    return this.characterClasses[i].spell_casting_stat
                }
            }
            
            return ''
        }
    },
    methods: {

    }
}
</script>

<style>

</style>