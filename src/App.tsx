import React, { useState } from 'react';
import './App.css';
import Editor from './Editor';

function App() {
  
  const [content, setContent] = useState<any| any>([]);

  const onEditorChange = (content: any) :void => {
    setContent(content);
  }

  return (
    <div className="page">
      <Editor onEditorChange={onEditorChange}/>
      <div className="preview">
        <p>{JSON.stringify(content, null, 2)}</p>
      </div>
    </div>
  );
}

export default App;
