import React from 'react';
import layout from './PageLayout.module.css';
import styles from './ProjectsPage.module.css';

interface Project {
  name: string;
  date: string;
  github: string;
  points: string[];
  mentor?: string;
}

const projects: Project[] = [
  {
    name: 'LeetCode Progress Tracker & 100 Days Dashboard',
    date: 'Feb 2026 · Personal',
    github: 'https://github.com/Yogeshrathia07/100_Days_of_Code',
    points: [
      'Developed a full-stack student performance dashboard using Node.js, Express.js, MongoDB, and EJS.',
      'Integrated Microsoft Azure OAuth authentication and enforced profile completion with SAP ID and LeetCode ID validation.',
      'Built real-time LeetCode analytics with heatmap, badges, and progress charts using GraphQL API and Chart.js.',
    ],
  },
  {
    name: 'Real-Time Multiplayer Chess Game',
    date: 'April 2025 · Personal',
    github: 'https://github.com/Yogeshrathia07/Node-js-Chess-Game',
    points: [
      'Built a real-time chess game using Node.js, Socket.io, Express.js, EJS, JavaScript, and chess.js.',
      'Implemented player role assignment (white/black/spectator) and drag-and-drop based piece movement with move validation.',
      'Enabled live move synchronization across clients, dynamic FEN-based rendering, and board flipping for black player.',
    ],
  },
  {
    name: 'Plant Re-Identification',
    date: 'May 2024 · IIT Ropar Research',
    github: 'https://github.com/Yogeshrathia07/PlantPersona',
    points: [
      'Developed a dataset of plant species captured under different environmental conditions.',
      'Designed an ML-based model to identify plant species using image features.',
    ],
    mentor: 'Mentors: Dr. Mukesh Saini & Dr. Neeraj Goel · IIT Ropar',
  },
  {
    name: 'Formal Verification — Spin Model Checker',
    date: 'Aug 2024 – May 2025 · IIT Ropar',
    github: 'https://github.com/Yogeshrathia07',
    points: [
      'Verified safety and liveness properties of Contiki-NG buffer handling using LTL and Spin.',
      'Ensured buffer bounds, correct operation sequences, deadlock freedom, and mutual exclusion.',
    ],
    mentor: 'Mentor: Dr. Jagpreet Singh · IIT Ropar',
  },
  {
    name: 'Productivity Tool',
    date: 'December 2020 · Personal',
    github: 'https://github.com/Yogeshrathia07/productivitytool',
    points: [
      'Built a web-based platform for class timetable management and study material organization.',
      'Designed an intuitive UI for seamless access to schedules and notifications.',
    ],
  },
];

const GhIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const ProjectsPage: React.FC = () => (
  <>
    <div className={layout.left}>
      <div className={layout.lTag}>What I've Built</div>
      <div className={layout.lTitle}>Projects</div>
      <p className={layout.lSub}>Real-time systems, ML models, and formally verified software — end to end.</p>
      <div className={styles.projIndex}>
        {projects.map((p, i) => (
          <div key={i} style={{fontSize:13, color:'var(--mid)'}}>
            <span style={{color:'var(--accent)', fontWeight:600}}>0{i+1} </span>{p.name.split(' — ')[0].split('&')[0].trim()}
          </div>
        ))}
      </div>
    </div>
    <div className={layout.right} style={{justifyContent:'flex-start', paddingTop:36}}>
      <div className={styles.projList}>
        {projects.map((p, i) => (
          <div key={i} className={layout.card}>
            <div className={styles.projTop}>
              <div>
                <div className={styles.projName}>{p.name}</div>
                <div className={styles.projDate}>{p.date}</div>
              </div>
              <a href={p.github} target="_blank" rel="noreferrer" className={styles.ghBtn}><GhIcon /></a>
            </div>
            <ul className={styles.projPts}>
              {p.points.map((pt, j) => <li key={j}>{pt}</li>)}
            </ul>
            {p.mentor && <div className={styles.projMentor}>{p.mentor}</div>}
          </div>
        ))}
      </div>
    </div>
  </>
);

export default ProjectsPage;
