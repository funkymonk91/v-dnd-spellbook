<template>
    <tr :class="{ 'table-success': character.id === $store.state.currentCharacter.id }">
        <td>
            <div class="row">
                <div class="col-3 col-sm-3">{{ character.name }}</div>
                <div class="col-3 col-sm-3">{{ character.race }}</div>
                <div class="col-3 col-sm-2">{{ character.class }}</div>
                <div class="col-3 col-sm-2 text-xs-center">{{ character.classLevel }}</div>
                <div class="col-12 col-sm-2 text-center">
                    <button class="btn btn-success" v-if="character.id !== $store.state.currentCharacter.id" @click="setCurrentCharacter(character)"><i class="fa fa-user fa-lg"></i></button>
                    <router-link class="btn btn-primary" :to="{ name: 'character', params: { id: character.id }}"><i class="fa fa-pencil fa-lg"></i></router-link>
                </div>
            </div>
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