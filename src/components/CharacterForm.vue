<template>
    <div class="wrapper">
        <v-text-field label="Character Name" v-model="character.name"></v-text-field>

        <v-select label="Select Race" v-model="character.race" :items="races"></v-select>

        <v-select label="Select Class" v-model="character.class" :items="classes"></v-select>

        <v-select label="Level" v-model="character.level" :items="[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]"></v-select>

        <v-text-field type="number" :label="spellCastingScoreLabel" v-model="character.spellCastingScore"></v-text-field>

        <v-text-field multi-line label="Notes" v-model="character.notes"></v-text-field>


        <v-dialog v-model="showDeleteDialog" persistent>
            <v-btn error dark slot="activator"><v-icon class="white--text">delete_forever</v-icon></v-btn>
            <v-card>
                <v-card-title class="headline">Delete {{ character.name }}?</v-card-title>
                <v-card-text>This will delete all of {{ character.name }}'s data. This cannot be undone!</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="primary--text darken-1" flat="flat" @click.native="showDeleteDialog = false">Nevermind</v-btn>
                    <v-btn class="red--text darken-1" flat="flat" @click.native="deleteCharacter(character.id)">Do it</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-btn primary slot="activator" class="pull-right" @click.native="saveCharacter(character.id)">Save</v-btn>
    </div>
</template>

<script>
export default {
    data () {
        return {
            showDeleteDialog: false
        }
    },
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
        },
        races: function () {
            return this.$store.getters.characterRaces.sort()
        },
        classes: function () {
            return this.$store.getters.characterClassNames.sort()
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

<style scoped>
    .wrapper {
        padding: 15px;
    }
</style>