
import { Editor, Transforms } from 'slate'
import { LISTS } from './Contants';

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

const toggleMark = (e, format, editor) => {
  e.preventDefault();
  const isActive = isMarkActive(editor, format)
  if (isActive) Editor.removeMark(editor, format)
  else Editor.addMark(editor, format, true)
}

const toggleBlock = (e, format, editor) => {
  e.preventDefault();
  const isActive = isBlockActive(editor, format)
  const isList = LISTS.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n => LISTS.includes(n.type),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? "list-item" : format,
  })
  
  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

export {
  isMarkActive,
  isBlockActive,
  toggleMark,
  toggleBlock
};