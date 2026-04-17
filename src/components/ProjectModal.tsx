"use client";

import { useEffect } from "react";
import { Project } from "@/data/projects";
import styles from "./ProjectModal.module.css";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <div 
      className={`${styles.modalOverlay} ${isOpen ? styles.modalOverlayActive : ""}`} 
      onClick={onClose}
    >
      <div 
        className={styles.modalContent} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className={styles.modalHeader}>
          <div className={styles.modalIcon}>
            <i className={`fa-solid ${project.icon}`}></i>
          </div>
          <h3>{project.title}</h3>
        </div>

        <p className={styles.modalDesc}>{project.description}</p>

        <h4>
          <i className="fa-solid fa-list-check"></i> Key Features:
        </h4>
        <ul className={styles.featuresList}>
          {project.features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>

        <div style={{ marginTop: '2rem' }}>
          <a href="/login" className="btn primary-btn" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
            Register Your Team Now
          </a>
        </div>
      </div>
    </div>
  );
}
