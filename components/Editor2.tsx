import React from 'react';
import Editor from '@monaco-editor/react';

interface Props {
  onChange: (value: string | undefined, event: any) => void;
  value: string;
  width: string;
  height: string;
  language: string;
  className?: string;
}

const Editor2: React.FC<Props> = ({
  onChange,
  value,
  width,
  height,
  language,
  className,
}) => {
  return (
    <Editor
      height={height}
      width={width}
      defaultLanguage={language} /*"javascript"*/
      defaultValue=""
      onChange={onChange}
      value={value}
      theme="OneDark"
      className={className}
      beforeMount={(monaco) => {
        monaco.editor.defineTheme('OneDark', {
          base: 'vs-dark',
          inherit: true,
          rules: [],
          colors: {
            'editor.background': '#17303b',
          },
        });
      }}
    />
  );
};

export default Editor2;
