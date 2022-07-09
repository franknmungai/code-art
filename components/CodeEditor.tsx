import React from 'react';
import dynamic from 'next/dynamic';
import { rules } from '../utils/data';

const MonacoEditor = dynamic(import('react-monaco-editor'), { ssr: false });

interface Props {
  onChange: (value: string, event: any) => void;
  value: string;
}
const CodeEditor: React.FC<Props> = ({ onChange, value }) => {
  const editorDidMount = (editor: any, monaco: any) => {
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

    editor.focus();

    monaco.editor.defineTheme('OneDark', {
      base: 'vs-dark',
      inherit: true,
      rules: rules,
      colors: {
        'editor.background': '#17303b',
      },
    });
  };

  return (
    <div>
      <MonacoEditor
        editorDidMount={editorDidMount}
        width="800"
        height="600"
        language="html"
        theme="vs-dark"
        value={value}
        options={{
          minimap: {
            enabled: false,
          },
        }}
        onChange={onChange}
      />
    </div>
  );
};

export default CodeEditor;
