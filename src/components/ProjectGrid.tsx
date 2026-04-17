"use client";

import { useState } from "react";
import { projectsData, Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import styles from "./ProjectGrid.module.css";

export default function ProjectGrid({ takenProjects }: { takenProjects: Record<number, string> }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projectsData.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.features.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section className={styles.projectsSection} id="projects">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>Available Projects</h2>
          <div className={styles.searchContainer}>
            <i className={`fa-solid fa-search ${styles.searchIcon}`}></i>
            <input
              type="text"
              placeholder="Search projects..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.grid} id="projects-grid">
          {filteredProjects.length === 0 ? (
            <p className={styles.noResults}>
              No projects found matching your search.
            </p>
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                takenBy={takenProjects[project.id]}
                onClick={() => setSelectedProject(project)}
              />
            ))
          )}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
