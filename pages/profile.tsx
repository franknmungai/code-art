import { useMutation, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { AiOutlineDelete } from 'react-icons/ai';
import client from '../apollo-client';
import ArtPiece from '../components/ArtPiece';
import Header from '../components/Header';
import { DELETE_ARTWORK } from '../graphql/mutations';
import { GET_USER_BY_EMAIL } from '../graphql/queries';
import styles from '../styles/profile-page.module.css';

const ProfilePage = () => {
  const { data: session } = useSession();

  const { data } = useQuery(GET_USER_BY_EMAIL, {
    variables: {
      email: session?.user?.email,
    },
  });

  const deleteArtwork = (id: string) => {
    const yes = confirm('Are you sure you want to delete this project?');
    if (!yes) return;

    const toastId = toast.loading('Deleting your project 🚀');

    try {
      client.mutate({
        mutation: DELETE_ARTWORK,
        variables: {
          id,
        },
      });
      toast.success('Your project has been deleted successfully ✅', {
        id: toastId,
      });
    } catch (error) {
      console.log(error);
      toast.error('Could not delete project. Try again.', {
        id: toastId,
      });
    }
  };

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
              <AiOutlineDelete
                size={20}
                className={styles.del_icon}
                onClick={deleteArtwork.bind(this, project.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
