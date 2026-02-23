import React, { useState } from "react";
import type { PageId } from "../../types";
import styles from "./Navbar.module.css";

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
  // { id: "chat", label: "Chat" },
];

const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNav = (id: PageId) => {
    onNavigate(id);
    setDrawerOpen(false);
  };

  return (
    <>
      <nav className={styles.nav}>
        <button
          className={styles.mobMenuBtn}
          onClick={() => setDrawerOpen((o) => !o)}
          aria-label="Menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <ul className={styles.navLinks}>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                className={activePage === item.id ? styles.active : ""}
                onClick={() => handleNav(item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={styles.aiBtn}
          onClick={() => handleNav("chat")}
        >
          <span className={styles.aiOrb} />
          Ask AI
        </button>
      </nav>

      {drawerOpen && (
        <div className={styles.mobDrawer} onClick={() => setDrawerOpen(false)}>
          <div
            className={styles.mobDrawerInner}
            onClick={(e) => e.stopPropagation()}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                className={activePage === item.id ? styles.mobActive : ""}
                onClick={() => handleNav(item.id)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;