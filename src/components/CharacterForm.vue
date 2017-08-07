<template>
    <div>
        <form>
            <v-text-field label="Character Name" v-model="character.name"></v-text-field>

            <v-select label="Select Race" v-model="character.race" :items="$store.getters.characterRaces"></v-select>
    
            <v-select label="Select Class" v-model="character.class" :items="$store.getters.characterClassNames"></v-select>

            <v-select label="Level" v-model="character.level" :items="[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]"></v-select>

            <v-text-field type="number" :label="spellCastingScoreLabel" v-model="character.spellCastingScore"></v-text-field>

            <button class="btn btn-primary mr-2" @click.prevent="saveCharacter(character.id)">Save</button>
            <router-link to="/characters">Cancel</router-link>

            <button class="btn btn-danger pull-right" v-if="character.id !== ''" @click.prevent="deleteCharacter(character.id)">
                <i class="fa fa-trash fa-lg"></i>
            </button>
        </form>
    </div>
</template>

<script>
export default {
    computed: {
        character: function () {
            // If there is an id param, load that character up
            if(this.$route.params.id) {
                return this.$store.getters.characterById(this.$route.params.id)
            }
            // Otherwise, get the current character.
            return this.$store.getters.currentCharacter
        },
        spellCastingScoreLabel: function () {
            return this.$store.getters.characterRaceSpellStat(this.character.class) + ' Score'
        }
    },
    methods: {
        saveCharacter (characterId) {
            this.$store.dispatch('saveCharacter', characterId)
            this.$router.push('/characters')
        },
        deleteCharacter (characterId) {
            this.$store.dispatch('deleteCharacter', characterId)
            this.$router.push('/characters')
        }
    }
}
</script>

<style>

</style>