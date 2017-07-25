<template>
    <div id="settingsModal" class="modal fade">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header bg-info text-white">
                    <h5 class="modal-title">
                        <i class="fa fa-gear fa-lg"></i> Settings</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <form>
                            <!-- <div class="form-group">
                                <label for="">Spells Per Page</label>
                                <small class="text-muted pl-1">Default: {{ settings.default.spellsPerPage }}</small>
                                <select name="" id="" v-model.number="settings.user.spellsPerPage" class="form-control">
                                    <option>25</option>
                                    <option>50</option>
                                    <option>100</option>
                                    <option :value="spellCount">All</option>
                                </select>
                            </div> -->
    
                            <button class="btn btn-danger pull-right" @click.prevent="deleteData">Delete Local Data</button>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
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