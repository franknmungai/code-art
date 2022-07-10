import React, { useEffect } from 'react';
import Editor from '@monaco-editor/react';

interface Props {
  onChange: (value: string | undefined, event: any) => void;
  value: string;
  width: string;
  height: string;
  language: string;
  className?: string;
  onMount?: (editor: any, monaco: any) => void;
}

const Editor2: React.FC<Props> = ({
  onChange,
  value,
  width,
  height,
  language,
  className,
  onMount,
}) => {
  useEffect(() => console.log(language));
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
