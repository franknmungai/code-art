import { useState } from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/editor.module.css';

const MonacoEditor = dynamic(import('react-monaco-editor'), { ssr: false });

const CodeEditor = () => {
  const [postBody, setPostBody] = useState('');

  const editorDidMount = (editor: any, monaco: any) => {
    console.log('editorDidMount', editor);
    editor.focus();
  };

  const onChange = (newValue: any, e: any) => {
    console.log(newValue);
  };
  // etc
  return (
    <div>
      {/* etc */}
      <MonacoEditor
        editorDidMount={() => {
          // @ts-ignore
          window.MonacoEnvironment.getWorkerUrl = (
            _moduleId: string,
            label: string
          ) => {
            if (label === 'json') return '_next/static/json.worker.js';
            if (label === 'css') return '_next/static/css.worker.js';
            if (label === 'html') return '_next/static/html.worker.js';
            if (label === 'typescript' || label === 'javascript')
              return '_next/static/ts.worker.js';
            return '_next/static/editor.worker.js';
          };
        }}
        width="800"
        height="600"
        language="html"
        theme="vs-dark"
        value={postBody}
        options={{
          minimap: {
            enabled: false,
          },
        }}
        onChange={onChange}
        className={styles.editor}
      />
    </div>
  );
};

export default CodeEditor;
