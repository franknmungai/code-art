import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from '../styles/header.module.css';
import { BsGithub, BsPerson } from 'react-icons/bs';

const Header = () => {
  const { data: session } = useSession();

  console.log(session);
  const handleAuth = () => {
    session ? signOut() : signIn();
  };

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
        // <button className={styles.btn}>
        //   <BsPerson className={styles.icon} /> {session?.user?.name}
        // </button>
        <div className={styles.accountInfo} onClick={handleAuth}>
          <img
            src={session.user?.image || ''}
            alt="avatar"
            className={styles.avatar}
          />
          <span>{session.user?.name}</span>
        </div>
      )}
    </div>
  );
};

export default Header;
