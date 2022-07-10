import Image from 'next/image';
import { useEffect, useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import Editor2 from '../components/Editor2';
import Header from '../components/Header';
import styles from '../styles/create-page.module.css';

enum Lang {
  html = 'html',
  css = 'css',
  js = 'javascript',
}
const Create = () => {
  const [srcDoc, setSrcDoc] = useState('');
  const [lang, setLang] = useState(Lang.html);

  const [html, setHtml] = useState<string | undefined>('');
  const [css, setCss] = useState<string | undefined>('');
  const [js, setJs] = useState<string | undefined>('');

  const handleChange = (newValue: string | undefined, lang: Lang) => {
    switch (lang) {
      case Lang.html:
        setHtml(newValue);
        break;
      case Lang.css:
        setCss(newValue);
        break;
      case Lang.js:
        setJs(newValue);
        break;
      default:
        break;
    }
  };

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
  }, [html, css, js]);

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

  const tabs = [
    [Lang.html, 'html.png'],
    [Lang.css, 'css.png'],
    [Lang.js, 'js.png'],
  ];

  return (
    <div className={styles.container}>
      <div className={styles.flex}>
        <iframe
          title="output"
          sandbox="allow-scripts"
          width="700px"
          height="700px"
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
          </div>
          {lang === Lang.html && (
            <Editor2
              onChange={(value, e) => setHtml(value)}
              value={getValue(lang) as string}
              width="50vw"
              height="80vh"
              language="html"
              className={styles.editor}
            />
          )}
          {lang === Lang.css && (
            <Editor2
              onChange={(value, e) => setCss(value)}
              value={getValue(lang) as string}
              width="50vw"
              height="80vh"
              language="css"
              className={styles.editor}
            />
          )}
          {lang === Lang.js && (
            <Editor2
              onChange={(value, e) => setJs(value)}
              value={getValue(lang) as string}
              width="50vw"
              height="80vh"
              language="javascript"
              className={styles.editor}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;
