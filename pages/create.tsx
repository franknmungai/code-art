import { useEffect, useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import Editor2 from '../components/Editor2';
import Header from '../components/Header';
import styles from '../styles/create-page.module.css';

const Create = () => {
  const [code, setCode] = useState<string | undefined>('');
  const [srcDoc, setSrcDoc] = useState('');

  const handleChange = (newValue: string | undefined, e: any) => {
    setCode(newValue);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
          <style></style>
          <body>${code}</body>
      </html>
  `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [code]);

  return (
    <div className={styles.container}>
      <div className={styles.flex}>
        <iframe
          title="output"
          sandbox="allow-scripts"
          width="500px"
          height="700px"
          srcDoc={srcDoc}
          className={styles.output}
        />
        <div className={styles.editorContainer}>
          <Editor2
            onChange={handleChange}
            value={code as string}
            width="50vw"
            height="70vh"
            language="html"
            className={styles.editor}
          />
        </div>
      </div>
    </div>
  );
};

export default Create;
