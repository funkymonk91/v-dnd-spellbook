import Vue from 'vue'
import Vuex from 'vuex'

import spells from './data/spells.json'
import characterClasses from './data/classes.json'
import characterRaces from './data/races.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: {
      default: {
        spellsPerPage: 25
      },
      user: {
        spellsPerPage: 25
      }
    },
    filters: {
      default: {
        castTime: '',
        class: '',
        components: '',
        concentration: '',
        duration: '',
        level: '',
        range: '',
        schoo: ''
      },
      user: {
        castTime: '',
        class: '',
        components: '',
        concentration: '',
        duration: '',
        level: '',
        range: '',
        schoo: ''
      }
    },
    spells: spells,
    filteredSpells: spells,
    selectedSpell: {
      id: "",
      name: "",
      desc: "",
      page: "",
      range: "",
      components: "",
      ritual: "",
      duration: "",
      concentration: "",
      casting_time: "",
      level_sort: "",
      level: "",
      school: "",
      class: ""
    },
    searchQuery: '',
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
    settings(state) {
      return state.settings
    },
    searchQuery(state) {
      return state.searchQuery
    },
    spellCount(state) {
      return state.spells.length
    },
    spells(state) {
      return state.filteredSpells
    },
    filteredSpells(state) {
      return state.filteredSpells
    },
    bookmarks(state) {
      return state.bookmarks
    },
    bookmarkedSpells(state) {
      var spells = []
      
      _.forEach(state.spells, function (spell, i) {
        // If the current character is NOT set and the spell is in the global bookmarks OR the current character IS set and the spell is in the current characters spellbook
        if ((state.currentCharacter.id === '' && state.bookmarks.indexOf(spell.name) > -1) 
          || (state.currentCharacter.id !== '' && state.currentCharacter.spellBook.indexOf(spell.name) > -1)) {
          spells.push(spell)
        }
      })
      
      return spells
    },
    currentCharacter(state) {
      return state.currentCharacter
    },
    characterById: (state) => (characterId) => {
      return state.characters.find(character => character.id === characterId)
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
    characterRaceSpellStat: (state) => (selectedClass) => {
      for (var i = 0; i < state.characterClasses.length; i++) {
        if (state.characterClasses[i].name === selectedClass) {
          return state.characterClasses[i].spell_casting_stat
        }
      }

      return ''
    },
    selectedSpell(state) {
      return state.selectedSpell
    },
    isSpellBookmarked: (state) => (spell) => {
      return (state.currentCharacter.spellBook.indexOf(spell.name) !== -1) ? true : false
    }
  },
  mutations: {
    saveSettings(state) {
      localStorage.setItem('settings', JSON.stringify(state.settings.user))
    },
    clearSearch(state) {
      state.searchQuery = ''
    },
    searchSpells(state, query) {
      state.searchQuery = query.toLowerCase()
      if (state.searchQuery !== '') {
        var tempFilteredSpells = []
        // Loop through all the spells
        _.forEach(state.spells, function (spell, i) {
          // debugger
          // Spell props that we are comparing against
          if (spell.name.toLowerCase().indexOf(state.searchQuery) !== -1 || spell.level.indexOf(state.searchQuery) !== -1 || spell.school.toLowerCase().indexOf(state.searchQuery) !== -1 || spell.class.toLowerCase().indexOf(state.searchQuery) !== -1) {
            tempFilteredSpells.push(spell)
          }
        });
        state.filteredSpells = _.sortBy(tempFilteredSpells, ['level_sort', 'name'])
      } else {
        state.filteredSpells = state.spells
      }
    },
    addBookmark(state, spell) {
      state.currentCharacter.spellBook.push(spell.name)
      localStorage.setItem('characters', JSON.stringify(state.characters))
    },
    removeBookmark(state, spell) {
      const index = state.currentCharacter.spellBook.indexOf(spell.name)
      state.currentCharacter.spellBook.splice(index, 1)
      localStorage.setItem('characters', JSON.stringify(state.characters))
    },
    filterCharacterSpells(state) {
      var tempFilteredSpells = []
      // Loop through all the spells
      for (var i = 0; i < state.spells.length; i++) {
        var spell = state.spells[i];

        if (state.currentCharacter.spellBook.indexOf(spell.name) !== -1) {
          tempFilteredSpells.push(spell)
        }
      }

      state.filteredSpells = tempFilteredSpells
    },
    saveCharacter(state, characterId) {
      //https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
      function generateId() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 16; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length))

        return text;
      }

      // If it is a brand new character
      if (characterId === '') {
        state.currentCharacter.id = generateId()
        state.characters.push(state.currentCharacter)
      } else {
        for (var i = 0; i < state.characters.length; i++) {
          if (state.characters[i].id === state.currentCharacter.id) {
            state.characters[i] = state.currentCharacter
            break
          }
        }
      }
      localStorage.setItem('characters', JSON.stringify(state.characters))
    },
    createCharacter(state) {
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
    },
    setCurrentCharacter(state, character) {
      state.currentCharacter = character
      localStorage.setItem('currentCharacter', JSON.stringify(state.currentCharacter))
    },
    deleteCharacter(state, characterId) {
      for (var i = 0; i < state.characters.length; i++) {
        if (characterId === state.characters[i].id) {
          state.characters.splice(i, 1)
          break
        }
      }

      if (state.currentCharacter.id === characterId) {
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
      }

      localStorage.setItem('characters', JSON.stringify(state.characters))
    },
    selectSpell(state, spell) {
      state.selectedSpell = spell
    },
    clearCharacter(state) {
      state.currentCharacter =  {
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
      localStorage.removeItem('currentCharacter')
    }
  },
  actions: {
    saveSettings(context) {
      context.commit('saveSettings')
    },
    clearSearch(context) {
      context.commit('clearSearch')
    },
    searchSpells(context, query) {
      context.commit('searchSpells', query)
    },
    addBookmark(context, spell) {
      context.commit('addBookmark', spell)
    },
    removeBookmark(context, spell) {
      context.commit('removeBookmark', spell)
    },
    filterBookmarkedSpells(context) {
      context.commit('filterBookmarkedSpells')
    },
    filterCharacterSpells(context) {
      context.commit('filterCharacterSpells')
    },
    saveCharacter(context, characterId) {
      context.commit('saveCharacter', characterId)
    },
    createCharacter(context) {
      context.commit('createCharacter')
    },
    setCurrentCharacter(context, character) {
      context.commit('setCurrentCharacter', character)
    },
    deleteCharacter(context, characterId) {
      context.commit('deleteCharacter', characterId)
    },
    selectSpell(context, spell) {
      context.commit('selectSpell', spell)
    },
    clearCharacter(context) {
      context.commit('clearCharacter')
    }
  }
})
