import React, { useState, useMemo, useCallback } from 'react'
import { createEditor, Editor, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import Element from './Components/Element';
import Leaf from './Components/Leaf';
import Toolbar from './Components/Toolbar';
import withShortcuts from './hooks/withShortcuts';
import { LIST_ITEMS, LISTS, HOTKEYS } from './Contants';
import isHotkey from 'is-hotkey'
import { toggleMark } from './EditorActions';


const SKEditor = ({ onEditorChange }) => {
  const [value, setValue] = useState(initialValue)
  const editor = useMemo(
    () => withShortcuts(withHistory(withReact(createEditor()))), []
  )


  const handleOnChange = (content) => {
    onEditorChange(content);
    setValue(content);
  }

  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const onKeyDown = (e) => {

    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, e)) {
        e.preventDefault()
        const mark = HOTKEYS[hotkey]
        toggleMark(e, mark, editor);
        return;
      }
    }

    
    if (e.key === "Enter") {
      const match = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
      })
      let [block] = match;
      if (LIST_ITEMS.includes(block.type)) {
        if (block.children[0].text === "") {
          e.preventDefault()

          Transforms.unwrapNodes(editor, {
            match: n => LISTS.includes(n.type),
            split: true,
          })
          Transforms.setNodes(editor, { type: 'paragraph' })
        }
      }
    }
  }
  return (
    <div className="sk-editor">
        <Slate editor={editor} value={value} onChange={handleOnChange}>
          <Toolbar editor={editor} />
          <div className="sk-editor-content">
            <Editable 
              placeholder="Enter some plain text..." 
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              onKeyDown={onKeyDown}
            />
          </div>
        </Slate>
    </div>
  )
}

const initialValue = [
  {
    "type": "paragraph",
    "children": [
      {
        "text": "This is editable"
      }
    ]
  }
]



export default SKEditor