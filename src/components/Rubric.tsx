"use client";

import React, { useState, useRef } from 'react';
import styles from './Rubric.module.css';

interface RubricItem {
  id: string;
  label: string;
  icon: string;
  accent: string;
  content: {
    title: string;
    points: string[];
  }[];
}

const RUBRIC_DATA: RubricItem[] = [
  {
    id: 'presentation',
    label: 'Presentation',
    icon: 'fa-person-chalkboard',
    accent: '#6366f1',
    content: [
      {
        title: 'Communication & Delivery',
        points: [
          'Professional attire and confident posture',
          'Clear, audible, and paced speaking style',
          'Eye contact with the audience/evaluators',
          'Fluent transitions between team members'
        ]
      },
      {
        title: 'Visual Aids & PPT',
        points: [
          'Clean, readable slides with consistent design',
          'Effective use of diagrams and flowcharts',
          'No text-heavy slides (use keywords)',
          'Proper AASTMT/BIS branding'
        ]
      }
    ]
  },
  {
    id: 'technical',
    label: 'Technical Work',
    icon: 'fa-code',
    accent: '#a855f7',
    content: [
      {
        title: 'Source Code Quality',
        points: [
          'Clean, DRY (Don\'t Repeat Yourself) code',
          'Meaningful variable and function names',
          'Proper indentation and commenting',
          'Effective exception handling (try-except)'
        ]
      },
      {
        title: 'Functionality',
        points: [
          'Application runs without errors',
          'All core features are implemented',
          'Logical flow and data processing',
          'Smart UI/UX even in console/GUI'
        ]
      }
    ]
  },
  {
    id: 'documentation',
    label: 'Documentation',
    icon: 'fa-file-lines',
    accent: '#ec4899',
    content: [
      {
        title: 'Technical Report',
        points: [
          'Clear problem definition and solution',
          'Detailed flowcharts and logic explanation',
          'Code snippets with explanations',
          'Reflection and future enhancements'
        ]
      }
    ]
  },
  {
    id: 'qa',
    label: 'Q&A Session',
    icon: 'fa-comments',
    accent: '#14b8a6',
    content: [
      {
        title: 'Defense',
        points: [
          'Answering logic-related questions accurately',
          'Explaining specific code blocks on demand',
          'Demonstrating deep understanding of the project'
        ]
      }
    ]
  }
];

export default function Rubric() {
  const [openItems, setOpenItems] = useState<string[]>(['presentation']);
  const tocRef = useRef<HTMLDivElement>(null);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (openItems.length === RUBRIC_DATA.length) {
      setOpenItems([]);
    } else {
      setOpenItems(RUBRIC_DATA.map(i => i.id));
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(`rubric-${id}`);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      if (!openItems.includes(id)) {
        setOpenItems(prev => [...prev, id]);
      }
    }
  };

  return (
    <section className={styles.rubricSection} id="rubric">
      <div className={styles.container}>
        <div className={styles.rubricHeader}>
          <span className="badge">Grading Standards</span>
          <h2 className={styles.rubricTitle}>Project Rubric</h2>
          <p className={styles.rubricSubtitle}>
            Your performance will be evaluated based on these key pillars. 
            Aim for excellence in both logic and presentation.
          </p>
        </div>

        <div className={styles.gradingGrid}>
          <div className={styles.gradingCard}>
            <div className={styles.gradingIcon}><i className="fa-solid fa-code"></i></div>
            <div>
              <span className={styles.gradingValue}>10 Points</span>
              <span className={styles.gradingLabel}>Python Project</span>
            </div>
          </div>
          <div className={styles.gradingCard}>
            <div className={styles.gradingIcon}><i className="fa-solid fa-person-chalkboard"></i></div>
            <div>
              <span className={styles.gradingValue}>5 Points</span>
              <span className={styles.gradingLabel}>Presentation</span>
            </div>
          </div>
          <div className={styles.gradingCard}>
            <div className={styles.gradingIcon}><i className="fa-solid fa-circle-question"></i></div>
            <div>
              <span className={styles.gradingValue}>2 Questions</span>
              <span className={styles.gradingLabel}>Per Student (Q&A)</span>
            </div>
          </div>
        </div>

        <div className={styles.rubricToc} ref={tocRef}>
          {RUBRIC_DATA.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`${styles.tocPill} ${openItems.includes(item.id) ? styles.tocPillActive : ''}`}
              style={{ '--accent': item.accent } as React.CSSProperties}
            >
              <i className={`fa-solid ${item.icon}`}></i>
              {item.label}
            </button>
          ))}
          <button 
            onClick={toggleAll}
            className={`${styles.tocPill} ${styles.tocPillToggleAll}`}
          >
            <i className={`fa-solid ${openItems.length === RUBRIC_DATA.length ? 'fa-compress' : 'fa-expand'}`}></i>
            {openItems.length === RUBRIC_DATA.length ? 'Collapse All' : 'Expand All'}
          </button>
        </div>

        <div className={styles.rubricAccordion}>
          {RUBRIC_DATA.map(sect => (
            <div 
              key={sect.id} 
              id={`rubric-${sect.id}`}
              className={`${styles.accordionItem} ${openItems.includes(sect.id) ? styles.accordionItemOpen : ''}`}
              style={{ '--accent': sect.accent } as React.CSSProperties}
            >
              <button 
                className={styles.accordionTrigger}
                onClick={() => toggleItem(sect.id)}
                aria-expanded={openItems.includes(sect.id)}
              >
                <div className={styles.accordionIcon}>
                  <i className={`fa-solid ${sect.icon}`}></i>
                </div>
                <span className={styles.accordionLabel}>{sect.label}</span>
                <span className={styles.accordionCount}>
                  {sect.content.reduce((acc, c) => acc + c.points.length, 0)} Criteria
                </span>
                <i className={`fa-solid fa-chevron-down ${styles.accordionChevron} ${openItems.includes(sect.id) ? styles.accordionChevronUp : ''}`}></i>
              </button>

              <div className={styles.accordionBody}>
                <div className={styles.accordionInner}>
                  {sect.content.map((group, idx) => (
                    <div key={idx} className={styles.rubricItem}>
                      <h4 className={styles.itemHeading}>
                        <i className="fa-solid fa-circle-check"></i>
                        {group.title}
                      </h4>
                      <ul className={styles.itemList}>
                        {group.points.map((pt, pIdx) => (
                          <li key={pIdx}>
                            <i className="fa-solid fa-arrow-right"></i>
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
