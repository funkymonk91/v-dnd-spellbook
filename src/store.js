import Vue from 'vue'
import Vuex from 'vuex'

import spells from './data/spells.json'
import characterClasses from './data/classes.json'
import characterRaces from './data/races.json'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        spells: _.sortBy(spells, ['level_sort', 'name']),
        filteredSpells: [spells],
        bookmarks: [],
        characterClasses: characterClasses,
        characterRaces: characterRaces,
        characters: [],
        currentCharacter: {
            id: '',
            name: '',
            race: '',
            subRace: '',
            class: '',
            classLevel: '',
            spellCastingScore: 0,
            spellBook: [],
            prepared: []
        }
    },
    getters: {
        mode(state) {
            return state.mode
        },
        filteredSpells(state) {
            return state.filteredSpells
        },
        bookmarks(state) {
            return state.bookmarks
        },
        currentCharacter(state) {
            return state.currentCharacter
        },
        characters(state) {
            return state.characters
        },
        characterClasses(state) {
            return state.characterClasses
        },
        characterRaces(state) {
            return state.characterRaces
        },
        characterSubRaces: (state) => (selectedRace) => {
            for (var i = 0; i < state.characterRaces.length; i++) {
                var race = state.characterRaces[i]
                
                if(race.name === selectedRace) {
                    return race.sub_races
                }
            }

            return []
        },
        characterRaceSpellStat: (state) => (selectedClass) => {
            for (var i = 0; i < state.characterClasses.length; i++) {
                if(state.characterClasses[i].name === selectedClass) {
                    return state.characterClasses[i].spell_casting_stat
                }
            }
            
            return ''
        }
    },
    mutations: {
        searchSpells (state, query) {
            query = query.toLowerCase()
            if (query !== '') {
                var tempFilteredSpells = []
                // Loop through all the spells
                for (var i = 0; i < state.filteredSpells.length; i++) {
                    var spell = state.filteredSpells[i];

                    // Spell props that we are comparing against
                    if (
                        spell.name.toLowerCase().indexOf(query) !== -1
                        || spell.level.indexOf(query) !== -1
                        || spell.school.toLowerCase().indexOf(query) !== -1
                        || spell.class.toLowerCase().indexOf(query) !== -1
                    ) {
                        tempFilteredSpells.push(spell)
                    }
                }
                state.filteredSpells = _.sortBy(tempFilteredSpells, ['level_sort', 'name'])
            }
            else {
                state.filteredSpells = state.spells
            }
        },
        addBookmark (state, spell) {
            if(state.currentCharacter.id === '') {
                state.bookmarks.push(spell.name)
                localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
            }
            else {
                state.currentCharacter.spellBook.push(spell.name)
                store.dispatch('saveCharacter')
            }
        },
        removeBookmark(state, spell) {
            if(state.currentCharacter.id === '') {
                const index = state.bookmarks.indexOf(spell.name)
                state.bookmarks.splice(index, 1)
                // Persist the bookmarks
                localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
            }
            else {
                const index = state.currentCharacter.spellBook.indexOf(spell.name)
                state.currentCharacter.spellBook.splice(index, 1)
                store.dispatch('saveCharacter')
            }
        },
        changeMode (state, mode) {
            state.mode = mode

            switch(mode) {
                case 'spells':
                    state.filteredSpells = state.spells
                    break
            }
        },
        filterBookmarkedSpells (state) {
            var tempFilteredSpells = []
            // Loop through all the spells
            for (var i = 0; i < state.spells.length; i++) {
                var spell = state.spells[i];

                if(state.currentCharacter.id === '') {
                    // Spell props that we are comparing against
                    if (state.bookmarks.indexOf(spell.name) !== -1) {
                        tempFilteredSpells.push(spell)
                    }
                }
                else {
                    if(state.currentCharacter.spellBook.indexOf(spell.name) !== -1) {
                        tempFilteredSpells.push(spell)
                    }
                }
            }
            state.filteredSpells = tempFilteredSpells
            state.mode = 'spells'
        },
        saveCharacter (state) {
            //https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
            function  generateId () {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i = 0; i < 16; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));

                return text;
            }
            
            // If it is a brand new character
            if(state.currentCharacter.id === '') {
                state.currentCharacter.id = generateId()
                state.characters.push(state.currentCharacter)
            }
            else {
                for (var i = 0; i < state.characters.length; i++) {
                    if (state.characters[i].id === state.currentCharacter.id) {
                        state.characters[i] = state.currentCharacter
                        break
                    }
                }
            }

            localStorage.setItem('characters', JSON.stringify(state.characters))
        },
        createCharacter (state, id) {
            state.currentCharacter = {
                id: '',
                name: '',
                race: '',
                subRace: '',
                class: '',
                classLevel: '',
                spellCastingScore: 0,
                spellBook: [],
                prepared: []
            }
            
            state.mode = 'characterCreate'
        },
        editCharacter (state, id) {
            for (var i = 0; i < state.characters.length; i++) {
                if(state.characters[i].id === id) {
                    state.currentCharacter = state.characters[i]
                    state.mode = 'characterCreate'
                    break
                }
            }
        },
        setCurrentCharacter (state, character) {
            state.currentCharacter = character
        },
        deleteCharacter (state, characterId) {
            for (var i = 0; i < state.characters.length; i++) {
                if(characterId === state.characters[i].id) {
                    state.characters.splice(i, 1)
                    break
                }
            }
            
            if(state.currentCharacter.id === characterId) {
                state.currentCharacter = {}
            }

            localStorage.setItem('characters', JSON.stringify(state.characters))
            state.mode = 'characterList'
        }
    },
    actions: {
        searchSpells (context, query) {
            context.commit('searchSpells', query)
        },
        addBookmark (context, spell) {
            context.commit('addBookmark', spell)
        },
        removeBookmark (context, spell) {
            context.commit('removeBookmark', spell)
        },
        changeMode (context, mode) {
            context.commit('changeMode', mode)
        },
        filterBookmarkedSpells (context) {
            context.commit('filterBookmarkedSpells')
        },
        clearCharacter (context) {
            context.commit('clearCharacter')
        },
        saveCharacter (context) {
            context.commit('saveCharacter')
        },
        createCharacter (context) {
            context.commit('createCharacter')
        },
        editCharacter (context, id) {
            context.commit('editCharacter', id)
        },
        setCurrentCharacter (context, character) {
            context.commit('setCurrentCharacter', character)
        },
        deleteCharacter (context, characterId) {
            context.commit('deleteCharacter', characterId)
        }
    }
})