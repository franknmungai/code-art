import Editor from '@monaco-editor/react';
import { rules } from '../utils/data';

function Editor2() {
  function handleEditorChange(value: any, event: any) {
    console.log('here is the current model value:', value);
  }

  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      onChange={handleEditorChange}
      theme="OneDark"
      beforeMount={(monaco) => {
        monaco.editor.defineTheme('OneDark', {
          base: 'vs-dark',
          inherit: true,
          rules: rules,
          colors: {
            'editor.background': '#17303b',
          },
        });
      }}
    />
  );
}

export default Editor2;
