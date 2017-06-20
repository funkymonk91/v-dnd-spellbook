<template>
    <div class="container">
        
        <form>
            <div class="form-group">
                <label for="">Character Name</label>
                <input type="text" class="form-control" v-model="character.name">
            </div>

            <div class="form-group">
                <label for="">Select Race:</label>
                <select class="form-control" v-model="character.race">
                    <option value="" disabled selected></option>
                    <option v-for="aRace in $store.getters.characterRaces">{{ aRace.name }}</option>
                </select>
            </div>

            <div class="form-group" v-if="$store.getters.characterSubRaces(character.race).length > 0">
                <label for="">Select Sub Race:</label>
                <select class="form-control" v-model="character.subRace">
                    <option value="" disabled selected></option>
                    <option v-for="sRace in $store.getters.characterSubRaces(character.race)">{{ sRace.name }}</option>
                </select>
            </div>

            <div class="form-group">
                <label for="">Select Class:</label>
                <select class="form-control" v-model="character.class">
                    <option value="" disabled selected></option>
                    <option v-for="aClass in $store.getters.characterClasses">{{ aClass.name }}</option>
                </select>
            </div>

            <div class="form-group">
                <label for="">Level:</label>
                <select name="" id="" class="form-control" v-model="character.classLevel">
                    <option value="" disabled selected></option>
                    <option v-for="n in 20">{{ n }}</option>
                </select>
            </div>

            <div class="form-group" v-if="$store.getters.characterRaceSpellStat(character.class) !== '' && character.class !== ''">
                <label for="">{{ $store.getters.characterRaceSpellStat(character.class) }} Score:</label>
                <input type="number" class="form-control" v-model="character.spellCastingScore">
            </div>

            <button class="btn btn-danger" @click.prevent="showCharacters"><i class="fa fa-times"></i> Cancel</button>
            <button class="btn btn-primary" @click.prevent="saveCharacter"><i class="fa fa-save"></i> Save Character</button>

            <button class="btn btn-danger pull-right" v-if="character.id !== ''" @click.prevent="deleteCharacter(character.id)"><i class="fa fa-trash fa-lg"></i></button>
        </form>

    </div>
</template>

<script>
export default {
    computed: {
        character: function () {
            return this.$store.getters.currentCharacter
        }
    },
    methods: {
        saveCharacter () {
            this.$store.dispatch('saveCharacter')
        },
        showCharacters () {
            this.$store.dispatch('changeMode', 'characterList')
        },
        deleteCharacter (characterId) {
            this.$store.dispatch('deleteCharacter', characterId)
        }
    }
}
</script>

<style>

</style>