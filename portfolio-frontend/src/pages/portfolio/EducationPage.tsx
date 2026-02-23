import React from 'react';
import layout from './PageLayout.module.css';
import styles from './EducationPage.module.css';

interface EduEntry {
  degree: string;
  institution: string;
  score: string;
  year: string;
}

const entries: EduEntry[] = [
  { degree: 'Master of Technology', institution: 'Computer Science & Engg · IIT Ropar', score: '7.75', year: '2023–2025' },
  { degree: 'Bachelor of Technology', institution: 'Computer Science · BIT Durg', score: '79.1%', year: '2019–2023' },
  { degree: 'Senior Secondary (XII)', institution: 'Central Board of Secondary Education', score: '63.2%', year: '2018' },
  { degree: 'Secondary (X)', institution: 'Central Board of Secondary Education', score: '8.2', year: '2016' },
];

const timeline = [
  { label: 'M.Tech · IIT Ropar · 2023–25', accent: true },
  { label: 'B.Tech · BIT Durg · 2019–23', semi: true },
  { label: 'CBSE XII · 2018', muted: true },
  { label: 'CBSE X · 2016', muted: true },
];

const EducationPage: React.FC = () => (
  <>
    <div className={layout.left}>
      <div className={layout.lTag}>Academic Background</div>
      <div className={layout.lTitle}>Education</div>
      <p className={layout.lSub}>From secondary school to cutting-edge research at IIT Ropar, one of India's premier institutes.</p>
      <div className={styles.timeline}>
        {timeline.map((t, i) => (
          <div key={i} className={styles.timelineRow}>
            <div className={styles.dot} style={{
              background: t.muted ? 'var(--muted)' : 'var(--accent)',
              opacity: t.semi ? 0.6 : 1,
            }} />
            <span style={{fontSize:13, color:'var(--mid)'}}>{t.label}</span>
          </div>
        ))}
      </div>
    </div>
    <div className={layout.right}>
      <div className={styles.eduList}>
        {entries.map((e, i) => (
          <div key={i} className={`${layout.card} ${styles.eduRow}`}>
            <div>
              <div className={styles.eduDeg}>{e.degree}</div>
              <div className={styles.eduIns}>{e.institution}</div>
            </div>
            <div className={styles.eduScore}>
              <div className={styles.eduNum}>{e.score}</div>
              <div className={styles.eduYr}>{e.year}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default EducationPage;
