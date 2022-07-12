import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from '../styles/header.module.css';
import { BsGithub } from 'react-icons/bs';

const Header = () => {
  const { data: session } = useSession();

  const handleAuth = () => {
    session ? signOut() : signIn();
  };

  return (
    <div className={styles.header}>
      <Link href="/">
        <h2>Canva Art</h2>
      </Link>
      <button className={styles.btn} onClick={handleAuth}>
        <BsGithub className={styles.icon} /> Sign in with Github
      </button>
    </div>
  );
};

export default Header;
