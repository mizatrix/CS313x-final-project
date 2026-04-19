import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="about">
      <div className={styles.heroContent}>
        <span className={styles.badge}>CS313x — Information Retrieval & Data Analysis</span>
        <h2 className={styles.title}>MSA University — Faculty of CS</h2>
        <p className={styles.description}>
          Build a real-world web intelligence product that collects, processes,
          and analyzes web-based data with AI-powered features. Supervised by{" "}
          <strong>Dr. Moataz Samy</strong>, <strong>TA. Farah Darwish</strong>, <strong>TA. Mazen Ashraf</strong> &amp; <strong>TA. Sohila Ashraf</strong>.
        </p>
        <div className={styles.buttons}>
          <a href="#projects" className={`${styles.btn} ${styles.primaryBtn}`}>
            Explore Domains <span><i className="fa-solid fa-arrow-down"></i></span>
          </a>
          <Link href="/login" className={`${styles.btn} ${styles.secondaryBtn}`}>
            Register Team <span><i className="fa-solid fa-users"></i></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
