<template>
    <div class="container">
        
        <form>
            <div class="form-group">
                <label for="">Character Name</label>
                <input type="text" class="form-control" v-model:name="name">
            </div>

            <div class="form-group">
                <label for="">Select Race:</label>
                <select class="form-control" v-model:aRace="aRace">
                    <option value="" disabled selected></option>
                    <option v-for="aRace in characterRaces">{{ aRace.name }}</option>
                </select>
            </div>

            <div class="form-group" v-if="subRaces.length > 0">
                <label for="">Select Sub Race:</label>
                <select class="form-control" v-model:aSubRace="aSubRace">
                    <option value="" disabled selected></option>
                    <option v-for="sRace in subRaces">{{ sRace.name }}</option>
                </select>
            </div>

            <div class="form-group">
                <label for="">Select Class:</label>
                <select class="form-control" v-model:aClass="aClass">
                    <option value="" disabled selected></option>
                    <option v-for="aClass in characterClasses">{{ aClass.name }}</option>
                </select>
            </div>

            <div class="form-group" v-if="spellCastingStat !== ''">
                <label for="">{{ spellCastingStat }} Score</label>
                <input type="number" class="form-control" v-model:spellCastingScore="spellCastingScore">
            </div>
        </form>

    </div>
</template>

<script>
export default {
    props: ['characterClasses', 'characterRaces'],
    data () {
        return {
            name: '',
            aRace: '',
            aSubRace: '',
            aClass: '',
            spellCastingScore: 0
        }
    },
    computed: {
        subRaces: function () {
            for (var i = 0; i < this.characterRaces.length; i++) {
                var race = this.characterRaces[i]
                
                if(this.aRace === race.name && race.sub_races.length > 0) {
                    return race.sub_races
                }
            }

            return []
        },
        spellCastingStat: function() {
            for (var i = 0; i < this.characterClasses.length; i++) {
                if(this.aClass === this.characterClasses[i].name) {
                    return this.characterClasses[i].spell_casting_stat
                }
            }
        }
    }
}
</script>

<style>

</style>