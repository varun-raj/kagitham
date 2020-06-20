import React from 'react'
import { Editor, Transforms } from 'slate'
import { LISTS, MARK_BUTTONS, BLOCK_BUTTONS } from '../Contants';

export default ({ editor }) => {
  
  const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  }

  const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === format,
    })
  
    return !!match
  }

  const toggleMark = (e, format) => {
    e.preventDefault();
    const isActive = isMarkActive(editor, format)
    if (isActive) Editor.removeMark(editor, format)
    else Editor.addMark(editor, format, true)
  }

  const toggleBlock = (e, format) => {
    e.preventDefault();
    const isActive = isBlockActive(editor, format)
    const isList = LISTS.includes(format)

    Transforms.unwrapNodes(editor, {
      match: n => LISTS.includes(n.type),
      split: true,
    })
  
    Transforms.setNodes(editor, {
      type: isActive ? 'paragraph' : isList ? (format === "ordered-list" ? "ordered-list-item" : 'bulleted-list-item') : format,
    })
    
    if (!isActive && isList) {
      const block = { type: format, children: [] }
      Transforms.wrapNodes(editor, block)
    }
  }


  const renderMarkButton = (prop) => (
    <button onMouseDown={(e) => toggleMark(e, prop.format)}>{prop.name}</button>  
  )
  
  const renderBlockButton = (prop) => (
    <button onMouseDown={(e) => toggleBlock(e, prop.format)}>{prop.name}</button>  
  )

  return (
    <div className="sk-editor-toolbar">
      {MARK_BUTTONS.map(renderMarkButton)}
      {BLOCK_BUTTONS.map(renderBlockButton)}
    </div>
  )
}
