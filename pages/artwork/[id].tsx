import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import client from '../../apollo-client';
import Editor2 from '../../components/Editor2';
import { UPDATE_ARTWORK } from '../../graphql/mutations';
import { GET_ARTWORK_BY_ID } from '../../graphql/queries';
import styles from '../../styles/create-page.module.css';
import { VscPlay, VscVmRunning } from 'react-icons/vsc';
import Link from 'next/link';

enum Lang {
  html = 'html',
  css = 'css',
  js = 'js',
}
const Create = () => {
  const [srcDoc, setSrcDoc] = useState('');
  const [lang, setLang] = useState(Lang.html);
  const { data: session } = useSession();
  const {
    query: { id },
  } = useRouter();

  const { data } = useQuery(GET_ARTWORK_BY_ID, {
    variables: {
      id,
    },
  });

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

  const runJs = (jsCode?: string) => {
    setSrcDoc(`
      <html>
          <style>${css}</style>
          <body>
            ${html}
            <script>${jsCode || js}</script>
          </body>     
      </html>
  `);
  };

  useEffect(() => {
    setHtml(data?.getArtwork?.html);
    setCss(data?.getArtwork?.css);
    setJs(data?.getArtwork?.js);

    runJs(data?.getArtwork?.js);
  }, [data]);

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
        return html as string;
      case Lang.css:
        return css as string;
      case Lang.js:
        return js as string;
      default:
        break;
    }
  };

  const tabs = [
    [Lang.html, 'html.png'],
    [Lang.css, 'css.png'],
    [Lang.js, 'js.png'],
  ];

  const isOwner = () => {
    return session?.user?.email === data?.getArtwork?.users?.email;
  };

  const update = async () => {
    const id = toast.loading('Updating your project. 🚀');

    try {
      await client.mutate({
        mutation: UPDATE_ARTWORK,
        variables: {
          id: data?.getArtwork?.id,
          html,
          css,
          js,
        },
      });

      toast.success('Project updated successfully 🎉', {
        id,
      });
    } catch (error) {
      console.log(error);
      toast.success('Could not update project, try again later', {
        id,
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        {isOwner() && (
          <button className={styles.btn} onClick={update}>
            Update
          </button>
        )}
        <Link href="/create">
          <button className={`${styles.btn} ${styles.new}`}>New</button>
        </Link>

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
                  alt=""
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
