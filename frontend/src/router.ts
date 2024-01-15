import { createRouter, createWebHistory } from 'vue-router'

import DataEdit from './components/ItemUpdate/DataEdit.vue';
import OutlineEdit from './components/ItemUpdate/OutlineEdit.vue';

const history = createWebHistory();
const routes = [
    {
        path: '/item/edit/outline',
        name: 'outline',
        component: OutlineEdit
    }, {
        path: '/item/edit/data',
        name: 'data',
        component: DataEdit
    }
];

export const router = createRouter({
    history,
    routes,
})



 