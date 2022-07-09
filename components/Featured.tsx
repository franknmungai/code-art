import { Fragment, useState } from 'react';
import styles from '../styles/featured.module.css';

const Featured = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <div className={styles.container}>
      <h2>Top Artist</h2>
      <div className={styles.flex}>
        <div className={styles.artWork}></div>
        <div className={styles.featured}>
          <div
            className={styles.profileImage}
            onMouseEnter={setHovered.bind(this, true)}
            onMouseLeave={() => {
              setHovered(false);
            }}
          ></div>

          <div
            className={`${styles.profileInfo} ${
              hovered ? styles.show : styles.hide
            }`}
            onMouseEnter={setHovered.bind(this, true)}
            onMouseLeave={() => {
              setHovered(false);
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
