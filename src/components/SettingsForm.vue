<template>
    <div class="container-fluid">
        <form>
            <div class="form-group">
                <label for="">Spells Per Page</label>
                <small class="text-muted pl-1">Default: {{ settings.default.spellsPerPage }}</small>
                <select name="" id="" v-model.number="settings.user.spellsPerPage" class="form-control">
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                    <option :value="spellCount">All</option>
                </select>
            </div>
    
            <button class="btn btn-primary mr-2" @click.prevent="saveSettings">Save</button>
    
            <button class="btn btn-danger pull-right" @click.prevent="deleteData">Delete Local Data</button>
        </form>
    </div>
</template>

<script>
export default {
    computed: {
        settings: function () {
            return this.$store.getters.settings
        },
        spellCount: function () {
            return this.$store.getters.spellCount
        }
    },
    methods: {
        saveSettings() {
            this.$store.dispatch('saveSettings')
            this.$router.go(-1)
        },
        deleteData() {
            if (confirm('Are you sure you want to delete all saved data? This can not be undone.')) {
                localStorage.clear();
            }
        }
    },
    beforeRouteLeave(to, from, next) {
        this.$store.dispatch('saveSettings')
        next()
    }
}
</script>

<style>

</style>