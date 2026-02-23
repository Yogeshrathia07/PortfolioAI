import React, { useState } from 'react'
// import { PageId } from '../../types'
import type { PageId } from "../../types";
import Navbar from './Navbar'
import HomePage from './HomePage'
import EducationPage from './EducationPage'
import ProjectsPage from './ProjectsPage'
import SkillsPage from './SkillsPage'
import AchievementsPage from './AchievementsPage'
import ContactPage from './ContactPage'
import layout from './PageLayout.module.css'
import ChatBox from '../../components/ChatBox'

const pages: { id: PageId; component: React.FC }[] = [
  { id: 'home', component: HomePage },
  { id: 'education', component: EducationPage },
  { id: 'projects', component: ProjectsPage },
  { id: 'skills', component: SkillsPage },
  { id: 'achievements', component: AchievementsPage },
  { id: 'contact', component: ContactPage },
  { id: 'chat', component: ChatBox },
]

export default function PortfolioApp() {
  const [activePage, setActivePage] = useState<PageId>('home')

  return (
    <>
      <Navbar activePage={activePage} onNavigate={setActivePage} />
      <div className={layout.pages}>
        {pages.map(({ id, component: Component }) => (
          <div
            key={id}
            
            className={`${layout.page} ${activePage === id ? layout.active : ''}`}
            
          >
            <Component />
          </div>
        ))}
      </div>
    </>
  )
}