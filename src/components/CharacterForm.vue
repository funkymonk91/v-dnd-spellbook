<template>
    <div class="container-fluid">
        <form>
            <div class="form-group">
                <label for="">Character Name</label>
                <input type="text" class="form-control" v-model="character.name">
            </div>

            <div class="form-group">
                <label for="">Select Race:</label>
                <select class="form-control" v-model="character.race">
                    <option value="" disabled selected></option>
                    <option v-for="(aRace, index) in $store.getters.characterRaces" :key="index">{{ aRace }}</option>
                </select>
            </div>

            <div class="form-group">
                <label for="">Select Class:</label>
                <select class="form-control" v-model="character.class">
                    <option value="" disabled selected></option>
                    <option v-for="(aClass, index) in $store.getters.characterClasses" :key="index">{{ aClass.name }}</option>
                </select>
            </div>

            <div class="form-group">
                <label for="">Level:</label>
                <select name="" id="" class="form-control" v-model="character.classLevel">
                    <option value="" disabled selected></option>
                    <option v-for="(n, index) in 20" :key="index">{{ n }}</option>
                </select>
            </div>

            <div class="form-group" v-if="$store.getters.characterRaceSpellStat(character.class) !== '' && character.class !== ''">
                <label for="">{{ $store.getters.characterRaceSpellStat(character.class) }} Score:</label>
                <input type="number" class="form-control" v-model="character.spellCastingScore">
            </div>

            <button class="btn btn-primary mr-2" @click.prevent="saveCharacter(character.id)">Save</button>
            <router-link to="/characters">Cancel</router-link to="">

            <button class="btn btn-danger pull-right" v-if="character.id !== ''" @click.prevent="deleteCharacter(character.id)"><i class="fa fa-trash fa-lg"></i></button>
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