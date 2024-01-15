
import { Editor } from '@tiptap/vue-3'
import { ref } from 'vue'

import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import Highlight from '@tiptap/extension-highlight'
import Dropcursor from '@tiptap/extension-dropcursor'
import Underline from '@tiptap/extension-underline'
import Gapcursor from '@tiptap/extension-gapcursor'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Mention from '@tiptap/extension-mention'
import Typography from '@tiptap/extension-typography'

import { suggestion } from './extensions/suggestions/mentions/suggestion.ts'

import Link from './extensions/link'
import FontSize from './extensions/font-size'
import FontColor from './extensions/font-color'
import FontBackgroundColor from './extensions/font-background-color'
import Image from './extensions/image'
import { InlineSuggestion } from "./extensions/suggestions/inline";

import DraggableItem from './extensions/blocks/draggable/DraggableItem'

import { SelectItem } from './types/select-item'

import { initialContent } from './data/initial'
import { blockTypes, fontFamilies, fontSizes } from './configs'
import { EditorConfig } from './types/editor-config'
import { SmilieReplacer } from './extensions/smile-rplacer'
import { ColorHighlighter } from './extensions/color-highlighter'
import { BackColor } from './extensions/textBackground'
import { LineHeight } from './extensions/lineHeight'

const editorStore: Map<Editor, EditorConfig> = new Map()

export const createEditor = () => {
  const fontFamilyOptions = ref<SelectItem[]>(fontFamilies)
  const fontFamily = ref<SelectItem>({} as SelectItem)
  const fontSize = ref<SelectItem>({} as SelectItem)
  const fontSizeOptions = ref<SelectItem[]>(fontSizes)
  const blockType = ref<SelectItem>({} as SelectItem)
  const blockTypeOptions = ref<SelectItem[]>(blockTypes)
  const fontColor = ref('#000000FF')
  const fontHighlight = ref('00FFFF')

  const editor = new Editor({
    content: initialContent,

    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Heading,

      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),

      TextStyle,
      FontFamily,

      Highlight.configure({ multicolor: true }),

      Link.configure({ 
        openOnClick: false,
        linkOnPaste: true,
      }),
      
      FontSize,
      FontColor,
      FontBackgroundColor,
      Typography,
      Image,
      Dropcursor,
      Underline,
      Gapcursor,

      TaskItem,
      TaskList,

      DraggableItem,
      SmilieReplacer,
      ColorHighlighter,
      LineHeight,
      BackColor,

      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        suggestion,
      }),

      InlineSuggestion.configure(
        {
          fetchAutocompletion: async (query) => {
            return 'Ваш текст: ' + query;
          }
        }
      ),
    ],

    editorProps: {
      attributes: {
        class: 'prose prose-invert w-[768px] focus:outline-none'
      }
    },

    autofocus: true,

    onSelectionUpdate({ editor }) {
      fontFamily.value = fontFamilyOptions.value[0]
      fontFamilyOptions.value.forEach(element => {
        element.icon = ''
      })

      fontSize.value = fontSizeOptions.value[0]

      fontSizeOptions.value.forEach(element => {
        element.icon = ''
      })

      fontFamilyOptions.value.forEach(element => {
        const qRemoved = element.value.replace(/["]+/g, '')
        if (editor.isActive('textStyle', { fontFamily: element.value }) || editor.isActive('textStyle', { fontFamily: qRemoved })) {
          element.icon = 'done'
          fontFamily.value = element
        }
      })

      fontSizeOptions.value.forEach(element => {
        if (editor.isActive('textStyle', { fontSize: element.value })) {
          element.icon = 'done'
          fontSize.value = element
        }
      })

      blockType.value = blockTypeOptions.value[0]
      blockTypeOptions.value.forEach(element => {
        element.icon = ''
      });

      if (editor.isActive('paragraph')) {
        blockType.value = blockTypeOptions.value[0]
        blockTypeOptions.value[0].icon = 'done'
      }

      if (editor.isActive('heading', { level: 1 })) {
        blockType.value = blockTypeOptions.value[1]
        blockTypeOptions.value[1].icon = 'done'
      }

      if (editor.isActive('heading', { level: 2 })) {
        blockType.value = blockTypeOptions.value[2]
        blockTypeOptions.value[2].icon = 'done'
      }

      if (editor.isActive('heading', { level: 3 })) {
        blockType.value = blockTypeOptions.value[3]
        blockTypeOptions.value[3].icon = 'done'
      }

      if (editor.isActive('heading', { level: 4 })) {
        blockType.value = blockTypeOptions.value[4]
        blockTypeOptions.value[4].icon = 'done'
      }

      if (editor.isActive('heading', { level: 5 })) {
        blockType.value = blockTypeOptions.value[5]
        blockTypeOptions.value[5].icon = 'done'
      }

      if (editor.isActive('heading', { level: 6 })) {
        blockType.value = blockTypeOptions.value[6]
        blockTypeOptions.value[6].icon = 'done'
      }
    },
  })

  editorStore.set(
    editor,
    {
      fontFamilyOptions,
      fontFamily,
      fontSize,
      fontSizeOptions,
      blockType,
      blockTypeOptions,
      fontColor,
      fontHighlight,
    }
  )

  return editor
}

export const getEditorConfig = (editor: Editor) => {
  return editorStore.get(editor)
}
