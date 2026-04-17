import { Project } from "@/data/projects";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  takenBy?: string;
}

export default function ProjectCard({ project, onClick, takenBy }: ProjectCardProps) {
  return (
    <div
      className={`${styles.projectCard} ${takenBy ? styles.takenProject : ""}`}
      onClick={takenBy ? undefined : onClick}
      style={takenBy ? { cursor: 'not-allowed' } : {}}
    >
      {takenBy && (
        <div className={styles.takenBadge}>
          <i className="fa-solid fa-lock"></i> Taken by {takenBy}
        </div>
      )}
      <div className={styles.cardIcon}>
        <i className={`fa-solid ${project.icon}`}></i>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className={styles.cardFooter}>
        {takenBy ? (
          <>
            <span style={{ color: 'var(--text-muted)' }}>Already Assigned</span>
            <i className="fa-solid fa-ban" style={{ color: 'var(--text-muted)' }}></i>
          </>
        ) : (
          <>
            <span>View Requirements</span>
            <i className="fa-solid fa-arrow-right"></i>
          </>
        )}
      </div>
    </div>
  );
}
