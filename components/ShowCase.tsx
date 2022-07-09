import { useState } from 'react';
import styles from '../styles/showcase.module.css';

enum Tabs {
  Favorite = 'Favorite',
  Hot = 'Hot',
  Amazing = 'Amazing',
  Mindblowing = 'Mindblowing',
}

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
      <div className={styles.tabs}>
        {/* Tabs */}
        {tabsContent.map(([name, icon]) => {
          return (
            <span
              onClick={() => setActive(name as Tabs)}
              className={`${isActive(name as Tabs) && styles.active}`}
            >{`${name} ${icon}`}</span>
          );
        })}
      </div>
    </div>
  );
};

export default ShowCase;
