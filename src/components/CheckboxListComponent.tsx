import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import React from 'react'

import './styles.css'

export default () => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: `
        <ul data-type="taskList">
          <li data-type="taskItem" data-checked="false">Здесь можно сделать чекбоксы</li>
          <li data-type="taskItem" data-checked="false">И здесь тоже</li>
        </ul>
      `,
  })

  if (!editor) {
    return null
  }
  console.log(editor.getHTML());

  return (
    <>
      <div className="control-group">
        <div className="button-group">
          <button
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={editor.isActive('taskList') ? 'is-active' : ''}
          >
            Toggle checkbox list
          </button>
          <button
            onClick={() => editor.chain().focus().splitListItem('taskItem').run()}
            disabled={!editor.can().splitListItem('taskItem')}
          >
            Split list item
          </button>
          <button
            onClick={() => editor.chain().focus().sinkListItem('taskItem').run()}
            disabled={!editor.can().sinkListItem('taskItem')}
          >
            Sink list item
          </button>
          <button
            onClick={() => editor.chain().focus().liftListItem('taskItem').run()}
            disabled={!editor.can().liftListItem('taskItem')}
          >
            Lift list item
          </button>
        </div>
      </div>
      <EditorContent editor={editor} / >
    </>
  )
}