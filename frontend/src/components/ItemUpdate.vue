<template>
<q-layout view="hHh lpR fFf">

    <q-header reveal bordered class="bg-primary text-white" height-hint="98">
        <q-toolbar>
            <q-btn dense flat round icon="menu_open" @click="toggleLeftDrawer" />

            <q-toolbar-title>
            <q-avatar>
                <img src="../assets/lighthouse.svg">
            </q-avatar>
                litexouse
            </q-toolbar-title>

            <q-btn dense flat round icon="view_sidebar" @click="toggleRightDrawer" />
        </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
        <div class="q-pa-md q-gutter-sm">
            <q-tree
                :nodes="simple"
                node-key="label"
                no-connectors
                v-model:expanded="expanded"
            />
        </div>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
    <!-- drawer content -->
    </q-drawer>

    <q-page-container>
        <q-btn-toggle
            v-model="editMode"
            flat
            toggle-color="primary"
            :options="editModeOptions"
        />

        <router-view />
    </q-page-container>

    <q-footer reveal bordered class="bg-dark text-white">
        <q-toolbar>
            <q-toolbar-title>
                <q-avatar>
                    <img src="../assets/lighthouse.svg">
                </q-avatar>
                way to recall ux
            </q-toolbar-title>
        </q-toolbar>
    </q-footer>

</q-layout>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue'
    import { router } from '../router'

    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    const editModeOptions = [
        {label: 'Data', value: '/item/edit/data'},
        {label: 'Outline', value: '/item/edit/outline'}
    ]

    const editMode = ref(editModeOptions[0].value);

    watch(
        () => editMode.value,
        route => router.push(route)
    )

    const expanded = ref([ 'Satisfied customers (with avatar)', 'Good food (with icon)' ]);

    const simple = [
        {
          label: 'Items',
          icon: 'folder',
          children: [
            {
              label: 'Good food (with icon)',
              icon: 'restaurant_menu',
              children: [
                { label: 'Quality ingredients' },
                { label: 'Good recipe' }
              ]
            },
            {
              label: 'Good service',
              icon: 'folder',
              disabled: true,
              children: [
                { label: 'Prompt attention' },
                { label: 'Professional waiter' }
              ]
            },
            {
              label: 'Pleasant surroundings (with icon)',
              icon: 'photo',
              children: [
                {
                  label: 'Happy atmosphere (with image)',
                  icon: 'file_open',
                },
                { 
                  label: 'Good table presentation',
                  icon: 'file_download', },
                { 
                  label: 'Pleasing decor',
                  icon: 'text_format', }
              ]
            }
          ]
        },
        {
          label: 'Trash',
          icon: 'folder_delete',
          children: [
            {
              label: 'Good food (with icon)',
              icon: 'restaurant_menu',
              children: [
                { label: 'Quality ingredients' },
                { label: 'Good recipe' }
              ]
            },
            {
              label: 'Good service',
              icon: 'folder',
              disabled: true,
              children: [
                { label: 'Prompt attention' },
                { label: 'Professional waiter' }
              ]
            },
            {
              label: 'Pleasant surroundings (with icon)',
              icon: 'photo',
              children: [
                {
                  label: 'Happy atmosphere (with image)',
                  icon: 'file_open',
                },
                { label: 'Good table presentation' },
                { label: 'Pleasing decor' }
              ]
            }
          ]
        }
    ];

    function toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
    }

    function toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
    }
</script>
