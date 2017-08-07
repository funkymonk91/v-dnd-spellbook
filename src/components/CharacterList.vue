<template>
    <div>
        <v-list three-line>
            <template v-for="(character, index) in characters" :character="character">
                <v-list-tile @click="editCharacter(character.id)" :key="index">
                    <v-list-tile-avatar>
                        <img />
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ character.name }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ character.race }}</v-list-tile-sub-title>
                        <v-list-tile-sub-title>{{ character.class }} {{ character.level }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-btn icon>
                            <v-icon v-if="character.id === currentCharacter.id">radio_button_checked</v-icon>
                            <v-icon v-else>radio_button_checked</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
                <v-divider inset :key="index"></v-divider>
            </template>
        </v-list>



        <v-btn dark fab class="pink" style="position: fixed; bottom: 50px; right: 20px;" @click="createCharacter">
            <v-icon>add</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    computed: {
        characters: function () {
            return this.$store.getters.characters
        },
        currentCharacter: function () {
            return this.$store.getters.currentCharacter
        }
    },
    methods: {
        createCharacter: function () {
            this.$store.dispatch('createCharacter')
            this.$router.push('/characterForm')
        },
        editCharacter: function (id) {
            this.$router.push({ name: 'character', params: { id: id }})
        },
        setCurrentCharacter: function (character) {
            this.$store.dispatch('setCurrentCharacter', character)
        }
    }
}
</script>

<style>

</style>