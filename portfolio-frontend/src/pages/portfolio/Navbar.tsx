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
        {/* Hamburger — left, mobile only */}
        <button
          className={styles.mobMenuBtn}
          onClick={() => setDrawerOpen((o) => !o)}
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={drawerOpen}
        >
          {drawerOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {/* Desktop nav links — hidden on mobile */}
        <ul className={styles.navLinks}>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                className={activePage === item.id ? styles.active : ""}
                onClick={() => handleNav(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleNav(item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Ask AI — always visible on both desktop and mobile top bar */}
        <button className={styles.aiBtn} onClick={() => handleNav("chat")}>
          <span className={styles.aiOrb} />
          Ask AI
        </button>
      </nav>

      {/* Mobile drawer — nav links only */}
      {drawerOpen && (
        <div
          className={styles.mobDrawer}
          onClick={() => setDrawerOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div
            className={styles.mobDrawerInner}
            onClick={(e) => e.stopPropagation()}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                className={activePage === item.id ? styles.mobActive : ""}
                onClick={() => handleNav(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleNav(item.id)}
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