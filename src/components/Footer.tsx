import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} MSA University — Faculty of Computer Science. CS313x Information Retrieval.
        </p>
        <div className={styles.credits}>
          <span>Supervised by <strong>Dr. Moataz Samy</strong> | TAs: <strong>Farah Darwish</strong>, <strong>Mazen Ashraf</strong> &amp; <strong>Sohila Ashraf</strong></span>
        </div>
      </div>
    </footer>
  );
}
