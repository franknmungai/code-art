import { useEffect, useState } from 'react';
import client from '../apollo-client';
import { GET_REACTIONS } from '../graphql/queries';
import styles from '../styles/reactions.module.css';

interface Props {
  artwork_id: string;
  type: string;
  reaction: string;
  emoji: string;
  onClick: () => void;
}
const DisplayReactions = (props: Props) => {
  const { artwork_id, type, emoji, onClick } = props;
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

  return (
    <div className={styles.reaction}>
      <span
        className={styles.emoji}
        onClick={() => {
          onClick();
          setCount((count) => count + 1);
        }}
      >
        {emoji}
      </span>
      <span className={styles.count}>{count}</span>
    </div>
  );
};

export default DisplayReactions;
