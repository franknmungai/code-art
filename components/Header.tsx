import Link from 'next/link';
import styles from '../styles/header.module.css';
import { BsGithub } from 'react-icons/bs';
// import { GitHub } from "@heroicons/react/outline";

const Header = () => {
  return (
    <div className={styles.header}>
      <Link href="/">
        <h2>Canva Art</h2>
      </Link>
      <button className={styles.btn}>
        <BsGithub className={styles.icon} /> Sign in with Github
      </button>
    </div>
  );
};

export default Header;
