 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
 // @ts-nocheck
import {
  Mark,
  markPasteRule,
  mergeAttributes,
} from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'

export interface LinkOptions {
  /**
   * If enabled, links will be opened on click.
   */
  openOnClick: boolean,
  /**
   * Adds a link to the current selection if the pasted content only contains an url.
   */
  linkOnPaste: boolean,
  /**
   * A list of HTML attributes to be rendered.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    link: {
      /**
       * Set a link mark
       */
      setLink: (attributes: { href: string, target?: string, rel?: string }) => ReturnType,
      /**
       * Toggle a link mark
       */
      toggleLink: (attributes: { href: string, target?: string, rel?: string }) => ReturnType,
      /**
       * Unset a link mark
       */
      unsetLink: () => ReturnType,
    }
  }
}

/**
 * A regex that matches any string that contains a link
 */
export const pasteRegex = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)/gi

/**
 * A regex that matches an url
 */
export const pasteRegexExact = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)$/gi

export const Link = Mark.create<LinkOptions>({
  name: 'link',

  priority: 1000,

  inclusive: false,

  defaultOptions: {
    openOnClick: true,
    linkOnPaste: true,
    HTMLAttributes: {
      target: '_blank',
      rel: undefined
    },
  },

  addAttributes() {
    return {
      href: {
        default: null,
      },
      target: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        default: this.options.HTMLAttributes.target,
      },
      rel: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        default: undefined,
      },
    }
  },

  parseHTML() {
    return [
      { tag: 'a[href]' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['a', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setLink: attributes => ({ commands }) => {
        return commands.setMark('link', attributes)
      },
      toggleLink: attributes => ({ commands }) => {
        return commands.toggleMark('link', attributes, { extendEmptyMarkRange: true })
      },
      unsetLink: () => ({ commands }) => {
        return commands.unsetMark('link', { extendEmptyMarkRange: true })
      },
    }
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: pasteRegex, 
        type: this.type,
        getAttributes: match => ({ 
          href: match[0] 
        })
      }),
    ]
  },

  addProseMirrorPlugins() {
    const plugins = []

    if (this.options.openOnClick) {
      plugins.push(
        new Plugin({
          key: new PluginKey('handleClickLink'),
          props: {
            handleClick: (view, pos, event) => {
              const attrs = this.editor.getAttributes('link')
              const link = (event.target as HTMLElement)?.closest('a')

              if (link && attrs.href) {
                window.open(attrs.href, attrs.target)

                return true
              }

              return false
            },
          },
        }),
      )
    }

    if (this.options.linkOnPaste) {
      plugins.push(
        new Plugin({
          key: new PluginKey('handlePasteLink'),
          props: {
            handlePaste: (view, event, slice) => {
              const { state } = view
              const { selection } = state
              const { empty } = selection

              if (empty) {
                return false
              }

              let textContent = ''

              slice.content.forEach(node => {
                textContent += node.textContent
              })

              if (!textContent || !textContent.match(pasteRegexExact)) {
                return false
              }

              this.editor.commands.setMark(this.type, {
                href: textContent,
              })

              return true
            },
          },
        }),
      )
    }

    return plugins
  },
})
