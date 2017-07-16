import Vue from 'vue'
import VueRouter from 'vue-router'

import SettingsForm from './components/SettingsForm.vue'
import SpellList from './components/SpellList'
import CharacterList from './components/CharacterList'
import CharacterForm from './components/CharacterForm'

Vue.use(VueRouter)

export default new VueRouter({
    // mode: 'history',
    routes: [
        { path: '/', component: CharacterList },
        { path: '/settings', component: SettingsForm },
        { path: '/characters', component: CharacterList },
        { path: '/spellbook', component: SpellList },
        { path: '/spells', component: SpellList },
        { path: '/characterForm', component: CharacterForm },
        { path: '/character/:id', name: 'character', component: CharacterForm },
    ],
    scrollBehavior (to, from, savedPosition) {
        // scroll to top
        return { x: 0, y: 0 }
    }
})
