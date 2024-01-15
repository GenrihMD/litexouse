<script setup lang="ts">
import { provide } from 'vue';
import { EditorContent } from '@tiptap/vue-3'
import { editorInjectionKey, useEditor } from '../../services/editor'

import MenuBar from './BarMenu/MenuBar.vue'

const editor = useEditor();

//TODO: Add editor ID
provide(editorInjectionKey, editor)
</script>
 
<template>
<div class="row editor-wrapper">

    <div class="menu-holder">
        <MenuBar/>
    </div>

    <q-separator Horizontal inset />

    <div class="content-wrapper">
        <EditorContent :editor="editor"/>
    </div>

    <q-separator Horizontal inset />
</div>
</template>

<style>
.menu-holder {
    position: relative;
    height: 44px;
}
.editor-wrapper {
    width: 100%;
    height: 100%;
    min-height: 500px;
    display: flex;
    flex-direction: column;
}
.content-wrapper {
    padding: 0 10px;
}

.color {
  white-space: nowrap;

  &::before {
    content: ' ';
    display: inline-block;
    width: 1em;
    height: 1em;
    border: 1px solid rgba(128, 128, 128, 0.3);
    vertical-align: middle;
    margin-right: 0.1em;
    margin-bottom: 0.15em;
    border-radius: 2px;
    background-color: var(--color);
  }
}

ul[data-type="taskList"] {
  list-style: none;
  padding: 0;

  li {
    display: flex;
    align-items: center;

    > label {
      flex: 0 0 auto;
      margin-right: 0.5rem;
      user-select: none;
    }

    > div {
      flex: 1 1 auto;
    }
  }

  input[type="checkbox"] {
    cursor: pointer;
  }
}
</style>

// const getContent = ():string => {
//     return editor?.value?.getHTML() || ''
// }

// const setContent = (val: string) => {
//     editor?.value?.commands.setContent(val)
// }../../services/editor/extensions/blocks/draggable/DraggableItem./Blocks/Draggable/DraggableItem