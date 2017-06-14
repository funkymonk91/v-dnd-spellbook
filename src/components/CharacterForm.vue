<template>
    <div class="container">
        
        <form>
            <div class="form-group">
                <label for="">Character Name</label>
                <input type="text" class="form-control" v-model:character.name="character.name">
            </div>

            <div class="form-group">
                <label for="">Select Race:</label>
                <select class="form-control" v-model:character.race="character.race">
                    <option value="" disabled selected></option>
                    <option v-for="aRace in characterRaces">{{ aRace.name }}</option>
                </select>
            </div>

            <div class="form-group" v-if="subRaces.length > 0">
                <label for="">Select Sub Race:</label>
                <select class="form-control" v-model:character.subRace="character.subRace">
                    <option value="" disabled selected></option>
                    <option v-for="sRace in subRaces">{{ sRace.name }}</option>
                </select>
            </div>

            <div class="form-group">
                <label for="">Select Class:</label>
                <select class="form-control" v-model:character.class="character.class">
                    <option value="" disabled selected></option>
                    <option v-for="aClass in characterClasses">{{ aClass.name }}</option>
                </select>
            </div>

            <div class="form-group">
                <label for="">Level:</label>
                <select name="" id="" class="form-control" v-model:character.classLevel="character.classLevel">
                    <option value="" disabled selected></option>
                    <option v-for="n in 20">{{ n }}</option>
                </select>
            </div>

            <div class="form-group" v-if="character.spellCastingStat !== '' && character.class !== ''">
                <label for="">{{ spellCastingStat }} Score:</label>
                <input type="number" class="form-control" v-model:character.spellCastingScore="character.spellCastingScore">
            </div>

            <button class="btn btn-primary" v-on:click.prevent="saveCharacter"><i class="fa fa-save"></i> Save Character</button>
        </form>

    </div>
</template>

<script>
export default {
    props: ['characterClasses', 'characterRaces', 'characters'],
    data () {
        return {
            character: {
                name: '',
                race: '',
                subRace: '',
                class: '',
                classLevel: '1',
                spellCastingScore: 0
            }
        }
    },
    computed: {
        subRaces: function () {
            for (var i = 0; i < this.characterRaces.length; i++) {
                var race = this.characterRaces[i]
                
                if(this.character.race === race.name && race.sub_races.length > 0) {
                    return race.sub_races
                }
            }

            return []
        },
        spellCastingStat: function() {
            for (var i = 0; i < this.characterClasses.length; i++) {
                if(this.character.class === this.characterClasses[i].name) {
                    return this.characterClasses[i].spell_casting_stat
                }
            }
            
            return ''
        }
    },
    methods: {
        saveCharacter () {
            this.characters.push(this.character)
        }
    }
}
</script>

<style>

</style>