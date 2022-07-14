import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdOutlineLaunch, MdPersonOutline } from 'react-icons/md';
import { GET_ARTWORK } from '../graphql/queries';
import styles from '../styles/showcase.module.css';

enum Tabs {
  Favorite = 'Favorite',
  Hot = 'Hot',
  Amazing = 'Amazing',
  Mindblowing = 'Mindblowing',
}

const sampleProjects = {
  [Tabs.Favorite]: [], //['1', '2', '3', '4', '17', '18'],
  [Tabs.Hot]: [], //['5', '6', '7', '8', '19', '20'],
  [Tabs.Amazing]: [], // ['9', '10', '11', '12', '21', '22'],
  [Tabs.Mindblowing]: [], //['13', '14', '15', '16', '23', '24'],
};
const ShowCase = () => {
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Favorite);
  const [artwork, setArtWork] = useState(sampleProjects);
  const { data } = useQuery(GET_ARTWORK);

  useEffect(() => {
    let projects = data?.getArtworkList;
    if (!projects) {
      return;
    }
    for (let project of projects) {
      let [fav, hot, amazing, mindblowing] = [0, 0, 0, 0];
      project.reactionsList.forEach((reaction: string) => {
        if (reaction === Tabs.Favorite) {
          fav++;
        }
        if (reaction === Tabs.Hot) {
          hot++;
        }
        if (reaction === Tabs.Amazing) {
          amazing++;
        }
        if (reaction === Tabs.Mindblowing) {
          mindblowing++;
        }
      });

      const rand = () => Math.floor(Math.random() * 999 + 1);
      project = {
        ...project,
        reactionsCount: {
          fav, //[Tabs.Favorite]: fav ?? rand(),
          amazing, //[Tabs.Amazing]: amazing ?? rand(),
          mindblowing, // [Tabs.Mindblowing]: mindblowing ?? rand(),
          hot, //[Tabs.Hot]: hot ?? rand(),
        },
      };
    }

    const artWorkCopy = JSON.parse(JSON.stringify(artwork));

    artWorkCopy['Favorite'] = projects.sort(
      (a: any, b: any) => b.reactionsCount.fav - a.reactionsCount.fav
    );
    artWorkCopy['Hot'] = projects.sort(
      (a: any, b: any) => b.reactionsCount.hot - a.reactionsCount.hot
    );
    artWorkCopy['Amazing'] = projects.sort(
      (a: any, b: any) => b.reactionsCount.amazing - a.reactionsCount.amazing
    );
    artWorkCopy['Mindblowing'] = projects.sort(
      (a: any, b: any) =>
        b.reactionsCount.mindblowing - a.reactionsCount.mindblowing
    );

    setArtWork(artWorkCopy);
  }, [data]);

  const isActive = (tab: Tabs) => activeTab === tab;

  const setActive = (tab: Tabs) => setActiveTab(tab);

  const tabsContent = [
    [Tabs.Favorite, '❤️'],
    [Tabs.Hot, '🔥'],
    [Tabs.Amazing, '🤩'],
    [Tabs.Mindblowing, '🤯'],
  ];

  return (
    <div className={styles.container} id="showcase">
      {/* Tabs */}
      <div className={styles.tabs}>
        {tabsContent.map(([name, icon]) => {
          return (
            <span
              key={name}
              className={`${isActive(name as Tabs) && styles.active}`}
              onClick={setActive.bind(this, name as Tabs)}
            >
              {`${name}`} <span className={styles.tab_icon}>{` ${icon}`}</span>
            </span>
          );
        })}
      </div>

      {/* Projects */}
      <div className={styles.projects}>
        {Array(6)
          .fill(artwork[activeTab][0])
          .map((project: Artwork, index) => {
            return (
              <div
                className={styles.piece}
                key={`${activeTab}-${index}` /*project?.id*/}
              >
                {/* <div className={styles.project}>{project.id}</div> */}
                <iframe
                  title="output"
                  sandbox="allow-scripts"
                  // width="400px"
                  // height="400px"
                  srcDoc={`<html>
                <style>${project?.css}
                canvas{width:150%; height:150%;}
                </style>
                <body>${project?.html}
                <script>${project?.js}</script>
                </body>
              </html>`}
                  className={styles.project}
                />

                <div className={`${styles.details} ${styles.show}`}>
                  <div className={styles.user}>
                    <MdPersonOutline size={24} />
                    <span>By {project?.username}</span>
                  </div>

                  <div className={styles.reactions}>
                    {tabsContent.map(([_, reaction]) => (
                      <div className={styles.reaction}>
                        <span className={styles.emoji}>{reaction}</span>
                        <span className={styles.count}>
                          {Math.floor(Math.random() * 999 + 1)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link href={`/artwork/${project?.id}`}>
                    <div>
                      <MdOutlineLaunch size={20} />
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ShowCase;
