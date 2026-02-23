import { Routes, Route } from 'react-router-dom'
import PortfolioApp from './pages/portfolio/PortfolioApp'
import ChatBox from './components/ChatBox'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioApp />} />
      <Route path="/chat" element={<ChatBox />} />
    </Routes>
  )
}