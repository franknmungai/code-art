import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdOutlineLaunch, MdPersonOutline } from 'react-icons/md';
import client from '../apollo-client';
import { ADD_REACTION } from '../graphql/mutations';
import { GET_ARTWORK, GET_REACTIONS } from '../graphql/queries';
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

  useEffect(() => {
    let projects = data?.getArtworkList;

    async function getReactionsCount() {
      for (const project of projects) {
        // project =
      }
    }
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
          let reactionsCount = 0;

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
          console.log('reactionsCount ' + project.reactionsCount);

          const tryEval = (exp: any) => {
            try {
              return exp;
            } catch (error) {
              console.log(error);
              return null;
            }
          };
          return (
            <div className={styles.piece} key={`${activeTab}-${index}`}>
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
                  {tabsContent.map(([reaction, emoji]) => (
                    <div className={styles.reaction}>
                      <span
                        className={styles.emoji}
                        onClick={() =>
                          addReaction(project?.id, project?.user_id, reaction)
                        }
                      >
                        {emoji}
                      </span>
                      <DisplayReactionsCount
                        artwork_id={project.id}
                        type={reaction}
                      />
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

interface Props {
  artwork_id: string;
  type: string;
}
const DisplayReactionsCount = (props: Props) => {
  const { artwork_id, type } = props;
  const [count, setCount] = useState(0);

  const getReactions = async () => {
    try {
      const { data } = await client.query({
        query: GET_REACTIONS,
        variables: {
          artwork_id,
          type,
        },
      });

      setCount(data.getReactionsByType?.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReactions();
  }, []);

  useEffect(() => console.log({ count }), [count]);

  return <span className={styles.count}>{count}</span>;
};
