import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="about">
      <div className={styles.heroContent}>
        <span className={styles.badge}>12th Week Project</span>
        <h2 className={styles.title}>Introduction to Programming</h2>
        <p className={styles.description}>
          Explore the 20 comprehensive Python projects assigned by{" "}
          <strong>Dr. Motaz Samy</strong> & <strong>TA. Toka Sherif</strong>. Build, learn,
          and master the fundamentals of software engineering.
        </p>
        <div className={styles.buttons}>
          <a href="#projects" className={`${styles.btn} ${styles.primaryBtn}`}>
            Explore Projects <span><i className="fa-solid fa-arrow-down"></i></span>
          </a>
          <Link href="/login" className={`${styles.btn} ${styles.secondaryBtn}`}>
            Register Team <span><i className="fa-solid fa-users"></i></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
