<template>
    <tr>
        <td>{{ character.name }}</td>
        <td>{{ this.race }}</td>
        <td>{{ character.class }}</td>
        <td>{{ character.classLevel }}</td>
    </tr>    
</template>

<script>
export default {
    props: ['character'],
    computed: {
        race: function () {
            return (this.character.subRace !== '') ? this.character.subRace : this.character.race
        }
    }
}
</script>