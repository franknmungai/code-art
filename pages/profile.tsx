import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import ArtPiece from '../components/ArtPiece';
import Header from '../components/Header';
import { GET_USER_BY_EMAIL } from '../graphql/queries';
import styles from '../styles/profile-page.module.css';

const ProfilePage = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState();

  const { data } = useQuery(GET_USER_BY_EMAIL, {
    variables: {
      email: 'frankmungai6@gmail.com', //session?.user?.email,
    },
  });

  console.log(data?.getUserByEmail?.created_at);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.profileInfo}>
          {/* <img src={session?.user?.image || ''} className={styles.image} /> */}
          <span className={styles.avatar}>
            {session?.user?.name && session?.user?.name[0]}
          </span>
          <h1>{session?.user?.name}</h1>

          <p>
            Joined in{' '}
            {new Date(data?.getUserByEmail?.created_at).toDateString()}
          </p>
        </div>

        <h2>Your designs</h2>
        <div className={styles.projects}>
          {data?.getUserByEmail?.artworkList?.map((project: Artwork) => (
            <div className={styles.user_art} key={project.id}>
              <ArtPiece project={project} key={project.id} />
              {/* <button>Delete</button> */}
              <AiOutlineDelete size={20} className={styles.del_icon} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
