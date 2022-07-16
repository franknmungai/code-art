import Link from 'next/link';
import React from 'react';
import { MdOutlineLaunch, MdPersonOutline } from 'react-icons/md';
import DisplayReactions from './DisplayReactions';
import styles from '../styles/artpiece.module.css';

interface Props {
  project: Artwork;
}

enum Reactions {
  Favorite = 'Favorite',
  Hot = 'Hot',
  Amazing = 'Amazing',
  Mindblowing = 'Mindblowing',
}

const ArtPiece: React.FC<Props> = ({ project }) => {
  const reactions = [
    [Reactions.Favorite, '❤️'],
    [Reactions.Hot, '🔥'],
    [Reactions.Amazing, '🤩'],
    [Reactions.Mindblowing, '🤯'],
  ];
  return (
    <div className={styles.piece}>
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
          {reactions.map(([reaction, emoji]) => (
            <DisplayReactions
              artwork_id={project.id}
              type={reaction}
              reaction={reaction}
              emoji={emoji}
              onClick={() => {}}
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
};

export default ArtPiece;
