import { useState } from 'react';
import styles from '../styles/showcase.module.css';

enum Tabs {
  Favorite = 'Favorite',
  Hot = 'Hot',
  Amazing = 'Amazing',
  Mindblowing = 'Mindblowing',
}

const sampleProjects = {
  [Tabs.Favorite]: ['1', '2', '3', '4', '17', '18'],
  [Tabs.Hot]: ['5', '6', '7', '8', '19', '20'],
  [Tabs.Amazing]: ['9', '10', '11', '12', '21', '22'],
  [Tabs.Mindblowing]: ['13', '14', '15', '16', '23', '24'],
};
const ShowCase = () => {
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Favorite);

  const isActive = (tab: Tabs) => activeTab === tab;

  const setActive = (tab: Tabs) => setActiveTab(tab);

  const tabsContent = [
    [Tabs.Favorite, '❤️'],
    [Tabs.Hot, '🔥'],
    [Tabs.Amazing, '🤩'],
    [Tabs.Mindblowing, '🤯'],
  ];

  return (
    <div className={styles.container}>
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
        {/* <div className={styles.piece}></div>
        <div className={styles.piece}></div>
        <div className={styles.piece}></div>
        <div className={styles.piece}></div>
        <div className={styles.piece}></div>
        <div className={styles.piece}></div> */}

        {sampleProjects[activeTab].map((project) => {
          return (
            <div className={styles.piece} key={project}>
              {project}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowCase;
