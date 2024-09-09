import Document from '@tiptap/extension-document'
import Mention from '@tiptap/extension-mention'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, mergeAttributes, useEditor } from '@tiptap/react'
import React from 'react'

import suggestion from './suggestion.js'

export default () => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        renderHTML({ options, node }) {
            return [
              'a',
              mergeAttributes({ href: '/' }, options.HTMLAttributes),
              `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`,
            ]
          },
        suggestion,
      }),
    ],
    content: `
        <p>Здесь можно кого-то упомянуть, например меня<span data-type="mention" data-id="Mikhail"></p>
        <p>И здесь тоже <span data-type="mention" data-id="Alexey"></p>`
  })

  if (!editor) {
    return null
  }

  return <EditorContent editor={editor} />
}