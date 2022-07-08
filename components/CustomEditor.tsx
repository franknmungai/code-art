import { useEffect, useState } from 'react';
import styles from '../styles/typing.module.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CustomEditor = () => {
  const sampleCode = `<div>
  <h1>Hello world</h1>
  <br />
  <p>Check out this cool piece of art</p>
</div>`;
  const [codeIndex, setCodeIndex] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (codeIndex === sampleCode.length) {
        setTimeout(() => {
          setCodeIndex(0);
        }, 1000);
      } else {
        setCodeIndex((val) => val + 1);
      }
    }, 100);

    // return () => clearInterval(timerId);
  }, []);

  return (
    <section id={styles.code_editor}>
      <div id={styles.icons}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div>
        <SyntaxHighlighter
          language="jsx"
          style={atomOneDark}
          customStyle={{ background: '#17303b' }}
        >
          {sampleCode.slice(0, codeIndex)}
        </SyntaxHighlighter>
      </div>
    </section>
  );
};

export default CustomEditor;
