import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { Fragment, useState } from 'react';
import { BsGithub, BsTwitter } from 'react-icons/bs';
import { GET_ARTWORK_BY_ID } from '../graphql/queries';
import styles from '../styles/featured.module.css';

const Featured = () => {
  const { data } = useQuery(GET_ARTWORK_BY_ID, {
    variables: {
      id: '2',
    },
  });

  // const {} = useQuery(GET);

  const [hovered, setHovered] = useState(false);

  const { data: session } = useSession();
  return (
    <div className={styles.container}>
      <h2>Top Artist</h2>
      <div className={styles.flex}>
        <div>
          <iframe
            title="output"
            sandbox="allow-scripts"
            srcDoc={`<html>
                <style>${data?.getArtwork?.css}
                canvas{width:150%; height:150%;}
                </style>
                <body>${data?.getArtwork?.html}
                <script>${data?.getArtwork?.js}</script>
                </body>
              </html>`}
            // className={styles.project}
            className={styles.artwork}
          />
        </div>
        <div className={styles.featured}>
          <div
            // className={styles.profileImage}
            onMouseEnter={setHovered.bind(this, true)}
            onMouseLeave={() => {
              setHovered(false);
            }}
          >
            <img
              src={session?.user?.image || ''}
              className={styles.profileImage}
            />
          </div>

          <div
            className={`${styles.profileInfo} ${
              hovered ? styles.show : styles.hide
            }`}
            onMouseEnter={setHovered.bind(this, true)}
            onMouseLeave={() => {
              setHovered(false);
            }}
          >
            <div className={styles.social}>
              <BsGithub className={styles.icon} />
              <BsTwitter className={styles.icon} />
            </div>

            <div className={styles.info}>
              <p>{session?.user?.name}</p>
              <p>Followers 0</p>
              <p>Following 0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
