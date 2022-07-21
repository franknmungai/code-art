import { useEffect } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from '../styles/header.module.css';
import { BsGithub } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { GET_USER_BY_EMAIL } from '../graphql/queries';
import { CREATE_USER } from '../graphql/mutations';
import apolloClient from '../apollo-client';

const Header = () => {
  const { data: session } = useSession();

  const handleAuth = () => {
    session ? signOut() : signIn();
  };

  const addUser = async () => {
    if (!session) {
      return;
    }
    // Check if the user has been added to the database, if not, add this user to db
    const {
      data: { getUserByEmail },
    } = await apolloClient.query({
      query: GET_USER_BY_EMAIL,
      variables: {
        email: session?.user?.email,
      },
    });

    if (!getUserByEmail?.username) {
      await apolloClient.mutate({
        mutation: CREATE_USER,
        variables: {
          email: session.user?.email,
          avatar: session.user?.image,
          username: session.user?.name,
        },
      });
    }
  };

  useEffect(() => {
    addUser();
  }, [session]);

  return (
    <div className={styles.header}>
      <Link href="/">
        <h2>Canva Art</h2>
      </Link>
      {!session ? (
        <button className={styles.btn} onClick={handleAuth}>
          <BsGithub className={styles.icon} /> Sign in with Github
        </button>
      ) : (
        <div className={styles.account}>
          <Link href={`/profile`}>
            <div className={styles.accountInfo}>
              <img
                src={session.user?.image || ''}
                alt="avatar"
                className={styles.avatar}
              />
              <span>{session.user?.name}</span>
            </div>
          </Link>
          <div className={styles.logout} onClick={handleAuth}>
            Logout <FiLogOut />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
