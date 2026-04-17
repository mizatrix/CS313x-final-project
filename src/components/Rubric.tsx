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
    id: 'phase1-domain',
    label: 'Domain & Idea',
    icon: 'fa-lightbulb',
    accent: '#c9a84c',
    content: [
      {
        title: 'Project Domain Definition & Product Idea Clarity (10 pts)',
        points: [
          'Clear, well-defined problem domain',
          'Realistic and original product idea',
          'Aligned with Information Retrieval principles',
          'Feasible scope for the project timeline'
        ]
      }
    ]
  },
  {
    id: 'phase1-scraping',
    label: 'Web Scraping',
    icon: 'fa-spider',
    accent: '#2563eb',
    content: [
      {
        title: 'Web Scraping & Crawling Implementation (25 pts)',
        points: [
          'Multi-page scraping or crawling implementation',
          'Structured data extraction from web sources',
          'Minimum dataset size: 50–200 records',
          'Consistent, well-structured data output'
        ]
      },
      {
        title: 'Robots.txt Compliance & Ethical Crawling (10 pts)',
        points: [
          'Respects robots.txt directives',
          'Implements polite crawling (rate limiting)',
          'No unauthorized data access',
          'Documentation of ethical considerations'
        ]
      }
    ]
  },
  {
    id: 'phase1-data',
    label: 'Data Pipeline',
    icon: 'fa-database',
    accent: '#14b8a6',
    content: [
      {
        title: 'Data Storage Design — JSON/XML (10 pts)',
        points: [
          'Structured format (JSON or XML)',
          'Consistent schema across all records',
          'Proper data organization and naming'
        ]
      },
      {
        title: 'Data Cleaning & Preprocessing Pipeline (20 pts)',
        points: [
          'Tokenization and normalization',
          'Stopword removal',
          'Handling missing/noisy data',
          'Basic preprocessing pipeline implementation'
        ]
      },
      {
        title: 'Data Quality Handling (10 pts)',
        points: [
          'Missing data handling strategies',
          'Noise reduction techniques',
          'Duplicate detection and removal'
        ]
      }
    ]
  },
  {
    id: 'phase1-analysis',
    label: 'Analysis & Viz',
    icon: 'fa-chart-line',
    accent: '#ec4899',
    content: [
      {
        title: 'Exploratory Data Analysis (10 pts)',
        points: [
          'Basic statistical analysis of the dataset',
          'Keyword frequency analysis',
          'Pattern discovery and dataset exploration',
          'Meaningful insights from the data'
        ]
      },
      {
        title: 'Data Visualization & Interpretation (5 pts)',
        points: [
          'Clear, informative visualizations',
          'Proper chart types for the data',
          'Accurate interpretation of results'
        ]
      }
    ]
  },
  {
    id: 'phase2-features',
    label: 'Feature Extraction',
    icon: 'fa-gears',
    accent: '#f59e0b',
    content: [
      {
        title: 'Feature Extraction (15 pts)',
        points: [
          'Relevant feature selection from processed data',
          'TF-IDF or equivalent text feature extraction',
          'Feature engineering for product functionality',
          'Proper dimensionality considerations'
        ]
      }
    ]
  },
  {
    id: 'phase2-product',
    label: 'Product System',
    icon: 'fa-rocket',
    accent: '#1e3a5f',
    content: [
      {
        title: 'Product System Implementation (25 pts)',
        points: [
          'Working product interface (CLI, web app, or dashboard)',
          'Search-based system, insight dashboard, or recommendation engine',
          'Functional end-to-end pipeline',
          'User-facing output with clear value'
        ]
      },
      {
        title: 'Code Structure, Modularity & Reproducibility (5 pts)',
        points: [
          'Clean, modular code organization',
          'Reproducible pipeline (documented steps)',
          'Proper dependency and environment management'
        ]
      }
    ]
  },
  {
    id: 'phase2-ai',
    label: 'AI Integration',
    icon: 'fa-brain',
    accent: '#8b5cf6',
    content: [
      {
        title: 'AI Feature Integration (20 pts)',
        points: [
          'Sentiment analysis, classification, summarization, or similar',
          'AI used as a feature inside the product (not standalone)',
          'Proper model selection and implementation',
          'No black-box APIs used as full solution'
        ]
      },
      {
        title: 'AI Feature Relevance to Product (10 pts)',
        points: [
          'AI feature enhances the product meaningfully',
          'Clear connection between AI output and user value',
          'Integration feels natural, not forced'
        ]
      }
    ]
  },
  {
    id: 'phase2-eval',
    label: 'Evaluation',
    icon: 'fa-clipboard-check',
    accent: '#22c55e',
    content: [
      {
        title: 'Insight Generation & Interpretation Quality (15 pts)',
        points: [
          'Meaningful insights derived from data',
          'Clear interpretation and explanation',
          'Actionable or informative conclusions'
        ]
      },
      {
        title: 'Evaluation of Outputs (10 pts)',
        points: [
          'Quantitative evaluation metrics where applicable',
          'Qualitative assessment of results',
          'Honest discussion of limitations'
        ]
      }
    ]
  }
];

export default function Rubric() {
  const [openItems, setOpenItems] = useState<string[]>(['phase1-domain']);
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
            Your project is evaluated in two phases. Phase I focuses on data collection 
            and processing. Phase II covers the product, AI integration, and evaluation.
          </p>
        </div>

        <div className={styles.gradingGrid}>
          <div className={styles.gradingCard}>
            <div className={styles.gradingIcon}><i className="fa-solid fa-spider"></i></div>
            <div>
              <span className={styles.gradingValue}>Phase I</span>
              <span className={styles.gradingLabel}>Data & Scraping (100 pts)</span>
            </div>
          </div>
          <div className={styles.gradingCard}>
            <div className={styles.gradingIcon}><i className="fa-solid fa-brain"></i></div>
            <div>
              <span className={styles.gradingValue}>Phase II</span>
              <span className={styles.gradingLabel}>Product & AI (100 pts)</span>
            </div>
          </div>
          <div className={styles.gradingCard}>
            <div className={styles.gradingIcon}><i className="fa-solid fa-users"></i></div>
            <div>
              <span className={styles.gradingValue}>Team-Based</span>
              <span className={styles.gradingLabel}>Max 4 Members</span>
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
