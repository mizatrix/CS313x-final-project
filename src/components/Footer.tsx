import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} AASTMT BIS Python Hub. Designed for Academic Excellence.
        </p>
        <div className={styles.credits}>
          <span>Supervised by <strong>Dr. Moataz Samy</strong> & <strong>TA. Toka Sherif</strong></span>
        </div>
      </div>
    </footer>
  );
}
