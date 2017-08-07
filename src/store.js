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
        school: ''
      },
      user: {
        castTime: '',
        class: '',
        components: '',
        concentration: '',
        duration: '',
        level: '',
        range: '',
        school: ''
      }
    },
    spells: spells,
    filteredSpells: spells,
    selectedSpell: {
      id: '',
      name: '',
      desc: '',
      page: '',
      range: '',
      components: '',
      ritual: '',
      duration: '',
      concentration: '',
      casting_time: '',
      level_sort: '',
      level: '',
      school: '',
      class: ''
    },
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
    settings (state) {
      return state.settings
    },
    spellCount (state) {
      return state.spells.length
    },
    spells (state) {
      return state.spells
    },
    filteredSpells (state) {
      return state.filteredSpells
    },
    currentCharacter (state) {
      return state.currentCharacter
    },
    characterById: (state) => (characterId) => {
      return state.characters.find(character => character.id === characterId)
    },
    characters (state) {
      return state.characters
    },
    characterClasses (state) {
      return state.characterClasses
    },
    characterClassNames (state) {
      var names = []

      _.forEach(state.characterClasses, function(value, key) {
        names.push(value.name)
      })

      return names
    },
    characterRaces (state) {
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
    selectedSpell (state) {
      return state.selectedSpell
    },
    isSpellBookmarked: (state) => (spell) => {
      return (state.currentCharacter.spellBook.indexOf(spell.name) !== -1)
    },
    filters (state) {
      return state.filters
    },
    spellComponentColor: (state) => (component) => {
      switch (component.trim()) {
        case 'V':
          return 'indigo'
          break;
        case 'S':
          return 'teal'
          break;
        case 'M':
          return 'pink'
          break;
        default:
          break;
      }
    } 
  },
  mutations: {
    saveSettings (state) {
      localStorage.setItem('settings', JSON.stringify(state.settings.user))
    },
    searchSpells (state, query) {
      query = query.toLowerCase()
      var tempSpells = state.spells
      var returnSpells = []
      if (state.filters.user.castTime !== '') {
        tempSpells = _.filter(tempSpells, function (o) { return o.casting_time === state.filters.user.castTime })
      }

      if (state.filters.user.class !== '') {
        tempSpells = _.filter(tempSpells, function (o) { return o.class.indexOf(state.filters.user.class) > -1 })
      }

      if (state.filters.user.components !== '') {
        tempSpells = _.filter(tempSpells, function (o) { return o.components.indexOf(state.filters.user.components) > -1 })
      }

      if (state.filters.user.concentration !== '') {
        tempSpells = _.filter(tempSpells, function (o) { return o.concentration === state.filters.user.concentration })
      }

      if (state.filters.user.duration !== '') {
        tempSpells = _.filter(tempSpells, function (o) { return o.duration === state.filters.user.duration })
      }

      if (state.filters.user.level !== '') {
        tempSpells = _.filter(tempSpells, function (o) { return o.level === state.filters.user.level })
      }

      if (state.filters.user.range !== '') {
        tempSpells = _.filter(tempSpells, function (o) { return o.range === state.filters.user.range })
      }

      if (state.filters.user.school !== '') {
        tempSpells = _.filter(tempSpells, function (o) { return o.school === state.filters.user.school })
      }

      if (query !== '') {
        // Loop through all the spells
        _.forEach(tempSpells, function (spell, i) {
          // debugger
          // Spell props that we are comparing against
          if (spell.name.toLowerCase().indexOf(query) !== -1 || spell.level.indexOf(query) !== -1 || spell.school.toLowerCase().indexOf(query) !== -1 || spell.class.toLowerCase().indexOf(query) !== -1) {
            returnSpells.push(spell)
          }
        })
      } else {
        returnSpells = tempSpells
      }
      state.filteredSpells = _.sortBy(returnSpells, ['level_sort', 'name'])
    },
    addBookmark (state, spell) {
      state.currentCharacter.spellBook.push(spell.name)
      localStorage.setItem('characters', JSON.stringify(state.characters))
    },
    removeBookmark (state, spell) {
      const index = state.currentCharacter.spellBook.indexOf(spell.name)
      state.currentCharacter.spellBook.splice(index, 1)
      localStorage.setItem('characters', JSON.stringify(state.characters))
    },
    filterCharacterSpells (state) {
      var tempFilteredSpells = []
      // Loop through all the spells
      for (var i = 0; i < state.spells.length; i++) {
        var spell = state.spells[i]

        if (state.currentCharacter.spellBook.indexOf(spell.name) !== -1) {
          tempFilteredSpells.push(spell)
        }
      }

      state.filteredSpells = tempFilteredSpells
    },
    saveCharacter (state, characterId) {
      //  https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
      function generateId () {
        var text = ''
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

        for (var i = 0; i < 16; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length))
        }

        return text
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
    createCharacter (state) {
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
    setCurrentCharacter (state, character) {
      state.currentCharacter = character
      localStorage.setItem('currentCharacter', JSON.stringify(state.currentCharacter))
    },
    deleteCharacter (state, characterId) {
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
    selectSpell (state, spell) {
      state.selectedSpell = spell
    },
    clearCharacter (state) {
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
      localStorage.removeItem('currentCharacter')
    },
    clearFilters (state) {
      state.filters.user = {
        castTime: '',
        class: '',
        components: '',
        concentration: '',
        duration: '',
        level: '',
        range: '',
        school: ''
      }
    }
  },
  actions: {
    saveSettings (context) {
      context.commit('saveSettings')
    },
    clearSearch (context) {
      context.commit('clearSearch')
    },
    searchSpells (context, query) {
      return new Promise((resolve, reject) => {
        context.commit('searchSpells', query)
        resolve()
      })
    },
    addBookmark (context, spell) {
      context.commit('addBookmark', spell)
    },
    removeBookmark (context, spell) {
      context.commit('removeBookmark', spell)
    },
    filterBookmarkedSpells (context) {
      context.commit('filterBookmarkedSpells')
    },
    filterCharacterSpells (context) {
      context.commit('filterCharacterSpells')
    },
    saveCharacter (context, characterId) {
      context.commit('saveCharacter', characterId)
    },
    createCharacter (context) {
      context.commit('createCharacter')
    },
    setCurrentCharacter (context, character) {
      context.commit('setCurrentCharacter', character)
    },
    deleteCharacter (context, characterId) {
      context.commit('deleteCharacter', characterId)
    },
    selectSpell (context, spell) {
      context.commit('selectSpell', spell)
    },
    clearCharacter (context) {
      context.commit('clearCharacter')
    },
    clearFilters (context) {
      context.commit('clearFilters')
    }
  }
})
