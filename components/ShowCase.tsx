import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdOutlineLaunch, MdPersonOutline } from 'react-icons/md';
import client from '../apollo-client';
import { ADD_REACTION } from '../graphql/mutations';
import { GET_ARTWORK } from '../graphql/queries';
import styles from '../styles/showcase.module.css';
import DisplayReactions from './DisplayReactions';

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
      let [Favorite, Hot, Amazing, Mindblowing] = [0, 0, 0, 0];
      project.reactionsList.forEach((reaction: string) => {
        if (reaction === Tabs.Favorite) {
          Favorite++;
        }
        if (reaction === Tabs.Hot) {
          Hot++;
        }
        if (reaction === Tabs.Amazing) {
          Amazing++;
        }
        if (reaction === Tabs.Mindblowing) {
          Mindblowing++;
        }
      });

      project = {
        ...project,
        reactionsCount: {
          Favorite, //[Tabs.Favorite]: fav ?? rand(),
          Amazing, //[Tabs.Amazing]: amazing ?? rand(),
          Mindblowing, // [Tabs.Mindblowing]: mindblowing ?? rand(),
          Hot, //[Tabs.Hot]: hot ?? rand(),
        },
      };
    }

    const artWorkCopy = JSON.parse(JSON.stringify(artwork));

    artWorkCopy['Favorite'] = projects.sort(
      (a: any, b: any) => b.reactionsCount.Favorite - a.reactionsCount.Favorite
    );
    artWorkCopy['Hot'] = projects.sort(
      (a: any, b: any) => b.reactionsCount.Hot - a.reactionsCount.Hot
    );
    artWorkCopy['Amazing'] = projects.sort(
      (a: any, b: any) => b.reactionsCount.Amazing - a.reactionsCount.Amazing
    );
    artWorkCopy['Mindblowing'] = projects.sort(
      (a: any, b: any) =>
        b.reactionsCount.Mindblowing - a.reactionsCount.Mindblowing
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

  const addReaction = async (
    artwork_id: string,
    user_id: string,
    reaction: string
  ) => {
    try {
      await client.mutate({
        mutation: ADD_REACTION,
        variables: {
          artwork_id,
          user_id,
          reaction,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

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
        {artwork[activeTab].map((project: Artwork, index) => {
          return (
            <div className={styles.piece} key={`${activeTab}-${index}`}>
              <iframe
                title="output"
                sandbox="allow-scripts"
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
                  {tabsContent.map(([reaction, emoji]) => (
                    <DisplayReactions
                      artwork_id={project.id}
                      type={reaction}
                      reaction={reaction}
                      emoji={emoji}
                      onClick={() =>
                        addReaction(project?.id, project?.user_id, reaction)
                      }
                      key={reaction}
                    />
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
