import React from 'react';
import layout from './PageLayout.module.css';
import styles from './AchievementsPage.module.css';

const achievements = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    title: 'Problem Solving',
    desc: <>Solved <strong>300+</strong> coding questions on <a href="https://leetcode.com/u/Y_ogesh/" target="_blank" rel="noreferrer">LeetCode</a> and <a href="https://www.geeksforgeeks.org/user/yogeshrathia07/" target="_blank" rel="noreferrer">GeeksforGeeks</a>.</>,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: 'Node.js Certification — Jan 2026',
    desc: <>Certificate ID: <code style={{fontSize:12,color:'var(--accent)',background:'rgba(26,111,232,0.08)',padding:'1px 6px',borderRadius:4}}>3983f391</code>&nbsp;<a href="#" style={{fontSize:12,color:'var(--accent)',textDecoration:'none',borderBottom:'1px solid rgba(26,111,232,0.3)'}}>View Certificate ↗</a></>,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Secretary — Pehchaan Ek Safar, IIT Ropar',
    desc: 'May 2024 – May 2025. Led social initiatives, event planning, volunteer coordination & fundraising.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Interests',
    desc: 'Badminton & Travelling.',
  },
];

const AchievementsPage: React.FC = () => (
  <>
    <div className={layout.left}>
      <div className={layout.lTag}>Recognition &amp; More</div>
      <div className={layout.lTitle}>Achievements</div>
      <p className={layout.lSub}>Problem solver, community leader, and certified engineer.</p>
      <div className={styles.stats}>
        <div>
          <div className={styles.statNum}>300+</div>
          <div className={styles.statLabel}>Problems Solved</div>
        </div>
        <div>
          <div className={styles.statNum}>5+</div>
          <div className={styles.statLabel}>Projects Shipped</div>
        </div>
      </div>
    </div>
    <div className={layout.right}>
      <div className={styles.achList}>
        {achievements.map((a, i) => (
          <div key={i} className={layout.card}>
            <div className={styles.achRow}>
              <div className={styles.achIcon}>{a.icon}</div>
              <div>
                <div className={styles.achTitle}>{a.title}</div>
                <div className={styles.achDesc}>{a.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default AchievementsPage;
