
import { EditorOptions } from '@tiptap/core'
import { Editor } from '@tiptap/vue-3'
import { InjectionKey, Ref, onBeforeUnmount, onMounted, shallowRef } from 'vue'
import { createEditor, getEditorConfig } from './editor'

export const useEditor = (options: Partial<EditorOptions> = {}) => {
    const instance = createEditor();
    const editor = shallowRef<Editor>(instance)

    onBeforeUnmount(() => {
        editor.value?.destroy()
    })

    return editor
}

export const useEditorConfig = (editor: Editor) => {
    const config = getEditorConfig(editor)

    return config
}

export const editorInjectionKey = Symbol('editor-injection') as InjectionKey<Ref<Editor>>