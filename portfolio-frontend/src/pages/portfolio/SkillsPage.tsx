import React from 'react';
import layout from './PageLayout.module.css';
import styles from './SkillsPage.module.css';

const skillGroups = [
  { cat: 'Languages', tags: ['C', 'C++', 'Python', 'JavaScript', 'Promela'] },
  { cat: 'Backend', tags: ['Node.js', 'Express.js', 'Django'] },
  { cat: 'Frontend', tags: ['HTML', 'CSS', 'EJS'] },
  { cat: 'Database', tags: ['MongoDB', 'SQL'] },
  { cat: 'Tools', tags: ['Git', 'GitHub', 'REST APIs', 'Postman', 'Linux'] },
  { cat: 'Concepts', tags: ['OOP', 'Networking', 'Formal Verification'] },
];

const keyTech = ['Node.js', 'Python', 'Django', 'SPIN', 'Git'];

const SkillsPage: React.FC = () => (
  <>
    <div className={layout.left}>
      <div className={layout.lTag}>Technical Expertise</div>
      <div className={layout.lTitle}>Skills</div>
      <p className={layout.lSub}>Backend development, data structures &amp; algorithms, and formal verification.</p>
      <div style={{marginTop:28}}>
        <div style={{fontSize:11, color:'var(--muted)', marginBottom:10, letterSpacing:'0.1em', textTransform:'uppercase'}}>Key Technologies</div>
        <div style={{display:'flex', flexWrap:'wrap', gap:7}}>
          {keyTech.map(t => (
            <span key={t} className={styles.keyTag}>{t}</span>
          ))}
        </div>
      </div>
    </div>
    <div className={layout.right}>
      <div className={styles.skGrid}>
        {skillGroups.map(g => (
          <div key={g.cat} className={layout.card}>
            <div className={styles.skCat}>{g.cat}</div>
            <div className={styles.skTags}>
              {g.tags.map(t => <span key={t} className={styles.skTag}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default SkillsPage;
