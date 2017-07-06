import Vue from 'vue'
import VueRouter from 'vue-router'

import SpellList from './components/SpellList'
import CharacterList from './components/CharacterList'
import CharacterForm from './components/CharacterForm'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: CharacterList },
        { path: '/characters', component: CharacterList },
        { path: '/bookmarks', component: SpellList },
        { path: '/spellbook', component: SpellList },
        { path: '/spells', component: SpellList },
        { path: '/characterForm', component: CharacterForm },
        { path: '/character/:id', name: 'character', component: CharacterForm },
    ]
})
