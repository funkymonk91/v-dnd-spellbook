<template>
    <div class="wrapper">
        <v-select label="Spells per page" :items="['25','50','100','All']" v-model="settings.user.spellsPerPage"></v-select>

        <v-dialog v-model="showDeleteDialog" persistent>
            <v-btn error dark slot="activator">DELETE LOCAL DATA</v-btn>
            <v-card>
                <v-card-title class="headline">Delete all data?</v-card-title>
                <v-card-text>This will delete all local data including characters and spell lists. This cannot be undone!</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="primary--text darken-1" flat="flat" @click.native="showDeleteDialog = false">Nevermind</v-btn>
                    <v-btn class="red--text darken-1" flat="flat" @click.native="deleteData">Do it</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
        settings: function () {
            return this.$store.getters.settings
        }
    },
    methods: {
        deleteData () {
            this.showDeleteDialog = false
            localStorage.clear();
        }
    },
    beforeRouteLeave (to, from, next) {
        this.$store.dispatch('saveSettings')
        next()
    }
}
</script>

<style scoped>
    .wrapper {
        padding: 15px;
    }
</style>