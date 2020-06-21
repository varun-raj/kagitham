import React from 'react'
import { MARK_BUTTONS, BLOCK_BUTTONS } from '../Contants';
import { toggleMark, toggleBlock } from '../EditorActions';

export default ({ editor }) => {

  const renderMarkButton = (prop) => (
    <button onMouseDown={(e) => toggleMark(e, prop.format, editor)}>{prop.name}</button>  
  )
  
  const renderBlockButton = (prop) => (
    <button onMouseDown={(e) => toggleBlock(e, prop.format, editor)}>{prop.name}</button>  
  )

  return (
    <div className="sk-editor-toolbar">
      {MARK_BUTTONS.map(renderMarkButton)}
      {BLOCK_BUTTONS.map(renderBlockButton)}
    </div>
  )
}
