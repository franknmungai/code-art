import { useState, useEffect } from 'react';

import styles from '../styles/typing.module.css';
import * as sampleCode from '../utils/sample-code';

import Editor2 from './Editor2';
import Image from 'next/image';
import { VscPlay } from 'react-icons/vsc';

enum Lang {
  html = 'html',
  css = 'css',
  js = 'javascript',
}
const tabs = [
  [Lang.html, 'html.png'],
  [Lang.css, 'css.png'],
  [Lang.js, 'js.png'],
];
const CustomEditor = () => {
  const [html, setHtml] = useState(sampleCode.html);
  const [css, setCss] = useState(sampleCode.css);
  const [js, setJs] = useState(sampleCode.js);
  const [srcDoc, setSrcDoc] = useState<string>();

  const [lang, setLang] = useState(Lang.js);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
          <style>${css}</style>
          <body>
            ${html}
            <script>${js}</script>
          </body>     
      </html>
  `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css]);

  const getValue = (lang: Lang) => {
    switch (lang) {
      case Lang.html:
        return html;
      case Lang.css:
        return css;
      case Lang.js:
        return js;
      default:
        break;
    }
  };

  const runJS = () => {
    setSrcDoc(`
    <html>
        <style>${css}</style>
        <body>
          ${html}
          <script>${js}</script>
        </body>     
    </html>
`);
  };

  return (
    <section className={styles.demo}>
      <iframe
        title="output"
        sandbox="allow-scripts"
        width="700px"
        height="600px"
        srcDoc={srcDoc}
        className={styles.output}
      />
      <div className={styles.editorContainer}>
        <div className={styles.editorTabs}>
          {tabs.map(([name, image]) => (
            <div
              className={`${lang === name && styles.active}`}
              onClick={() => setLang(name as Lang)}
              key={name}
            >
              <Image
                src={`/${image}`}
                width="28px"
                height="28px"
                layout="fixed"
              />
              <span>{name}</span>
            </div>
          ))}

          <VscPlay className={styles.icon} size={24} onClick={runJS} />
        </div>
        <div>
          {lang === Lang.html && (
            <Editor2
              onChange={(value, e) => setHtml(value as string)}
              value={getValue(lang) as string}
              width="50vw"
              height="69vh"
              language="html"
              className={styles.editor}
            />
          )}
          {lang === Lang.css && (
            <Editor2
              onChange={(value, e) => setCss(value as string)}
              value={getValue(lang) as string}
              width="50vw"
              height="69vh"
              language="css"
              className={styles.editor}
            />
          )}
          {lang === Lang.js && (
            <Editor2
              onChange={(value, e) => setJs(value as string)}
              value={getValue(lang) as string}
              width="50vw"
              height="69vh"
              language="javascript"
              className={styles.editor}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomEditor;
