<template>
    <tr :class="{ 'table-success': character.id === $store.state.currentCharacter.id }">
        <td>{{ character.name }}</td>
        <td>{{ character.race }}</td>
        <td>{{ character.class }}</td>
        <td class="text-center">{{ character.classLevel }}</td>
        <td class="text-center">
            <button class="btn btn-success" v-if="character.id !== $store.state.currentCharacter.id" @click="setCurrentCharacter(character)"><i class="fa fa-user fa-lg"></i></button>
            <router-link class="btn btn-primary" :to="{ name: 'character', params: { id: character.id }}"><i class="fa fa-pencil fa-lg"></i></router-link>
        </td>
    </tr>    
</template>

<script>
export default {
    props: ['character'],
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