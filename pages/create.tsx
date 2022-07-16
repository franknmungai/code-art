import { useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { VscPlay } from 'react-icons/vsc';
import Editor2 from '../components/Editor2';
import { CREATE_ARTWORK } from '../graphql/mutations';
import { GET_ARTWORK } from '../graphql/queries';
import styles from '../styles/create-page.module.css';

enum Lang {
  html = 'html',
  css = 'css',
  js = 'javascript',
}
const Create = () => {
  const [srcDoc, setSrcDoc] = useState('');
  const [lang, setLang] = useState(Lang.html);
  const { data: session } = useSession();

  const router = useRouter();
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
  }, [html, css]);

  const runJs = () => {
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

  const [createArt] = useMutation(CREATE_ARTWORK, {
    variables: {
      html,
      css,
      js,
      user_id: 1,
      username: session?.user?.name,
    },
    refetchQueries: [GET_ARTWORK],
  });

  const createArtwork = async () => {
    const id = toast.loading('Creating your piece of art. 🚀');

    try {
      const {
        data: { insertArtwork: newArtWork },
      } = await createArt();

      toast.success(
        'Your artwork has been created successfully 🎉. We hope it will delight and inspire others',
        {
          id,
        }
      );

      setTimeout(() => {
        router.push('/profile');
      }, 1000);
    } catch (error) {
      toast.error('Could not upload your artwork. Try again', {
        id,
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <button className={styles.btn} onClick={createArtwork}>
          Create
        </button>

        <code style={{ fontSize: '1rem' }}>
          To Run JS, click on the <VscPlay /> button
        </code>
      </div>
      <div className={styles.flex}>
        <iframe
          title="output"
          sandbox="allow-scripts"
          width="700px"
          height="680px"
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

            <VscPlay
              className={styles.icon}
              size={24}
              onClick={() => runJs()}
            />
          </div>
          {lang === Lang.html && (
            <Editor2
              onChange={(value, e) => setHtml(value)}
              value={getValue(lang) as string}
              width="50vw"
              height="78.5vh"
              language="html"
              className={styles.editor}
            />
          )}
          {lang === Lang.css && (
            <Editor2
              onChange={(value, e) => setCss(value)}
              value={getValue(lang) as string}
              width="50vw"
              height="78.5vh"
              language="css"
              className={styles.editor}
            />
          )}
          {lang === Lang.js && (
            <Editor2
              onChange={(value, e) => setJs(value)}
              value={getValue(lang) as string}
              width="50vw"
              height="78.5vh"
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
