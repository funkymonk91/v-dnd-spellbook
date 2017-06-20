<template>
    <tr :class="{ 'table-success': character.id === $store.state.currentCharacter.id }">
        <td>{{ character.name }}</td>
        <td>{{ this.race }}</td>
        <td>{{ character.class }}</td>
        <td class="text-center">{{ character.classLevel }}</td>
        <td class="text-center">
            <button class="btn btn-success" v-if="character.id !== $store.state.currentCharacter.id" @click="setCurrentCharacter(character)"><i class="fa fa-user fa-lg"></i></button>
            <button class="btn btn-primary" @click="editCharacter(character.id)"><i class="fa fa-pencil fa-lg"></i></button>
        </td>
    </tr>    
</template>

<script>
export default {
    props: ['character'],
    computed: {
        race: function () {
            return (this.character.subRace !== '') ? this.character.subRace : this.character.race
        }
    },
    methods: {
        editCharacter: function (id) {
            this.$store.dispatch('editCharacter', id)
        },
        setCurrentCharacter: function (character) {
            this.$store.dispatch('setCurrentCharacter', character)
        }
    }
}
</script>