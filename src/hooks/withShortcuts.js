import { Editor, Transforms, Point, Range, Node } from 'slate'
import { LISTS, SHORTCUTS, LIST_ITEMS } from '../Contants';



const withShortcuts = editor => {
  const { deleteBackward, insertText } = editor

  editor.insertText = text => {
    const { selection } = editor

    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection
      const block = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
      })
      const path = block ? block[1] : []
      const start = Editor.start(editor, path)
      const range = { anchor, focus: start }
      const beforeText = Editor.string(editor, range)
      const type = SHORTCUTS[beforeText]
      
      if (type) {
        Transforms.select(editor, range)
        Transforms.delete(editor)
        if (LIST_ITEMS.includes(type)) {
          Transforms.setNodes(
            editor,
            { type: "list-item" },
            { match: n => Editor.isBlock(editor, n) }
          )
        } else {
          Transforms.setNodes(
            editor,
            { type },
            { match: n => Editor.isBlock(editor, n) }
          )
        }

        if (type === 'bulleted-list-item') {
          const list = { type: 'bulleted-list', children: [] }
          Transforms.wrapNodes(editor, list, {
            match: n => {
              return n.type === 'list-item';
            }
          })
        }
        
        if (type === 'ordered-list-item') {
          const list = { type: 'ordered-list', children: [] }
          Transforms.wrapNodes(editor, list, {
            match: n => {
              return n.type === 'list-item';
            }
          })
        }

        return
      }
    }

    insertText(text)
  }

  editor.deleteBackward = (...args) => {

    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
      })
      if (match) {
        const [block, path] = match
        const parent = Node.parent(editor, path);
        const start = Editor.start(editor, path)

        if (
          block.type !== 'paragraph' &&
          Point.equals(selection.anchor, start)
        ) {
          Transforms.setNodes(editor, { type: 'paragraph' })

          if (block.type === 'list-item' && parent.type === "bulleted-list") {
            Transforms.unwrapNodes(editor, {
              match: n => n.type === 'bulleted-list',
              split: true,
            })
          }
          
          if (block.type === 'list-item' && parent.type === "ordered-list") {
            Transforms.unwrapNodes(editor, {
              match: n => n.type === 'ordered-list',
              split: true,
            })
          }

          return
        } else if (
          LISTS.includes(parent.type) &&
          Point.equals(selection.anchor, start)
        ) {
          Transforms.unwrapNodes(editor, {
            match: n => LISTS.includes(n.type),
            split: true,
          })
        }
      }

      deleteBackward(...args)
    }
  }

  return editor
}


export default withShortcuts;