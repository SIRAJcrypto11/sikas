import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import POSPage from './pages/POSPage'

// Placeholder for other pages
const DashboardPlaceholder = () => (
  <div className="flex items-center justify-center h-screen flex-col gap-4">
    <h1 className="text-4xl font-black text-sikas-primary">DASHBOARD OWNER</h1>
    <p className="text-slate-500 italic">Coming Soon - Phase 1 Foundation</p>
    <a href="/pos" className="sikas-button-primary">Buka POS Kasir</a>
  </div>
)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pos" element={<POSPage />} />
        <Route path="/dashboard" element={<DashboardPlaceholder />} />
        {/* Default route to POS for now as it's the primary feature */}
        <Route path="/" element={<Navigate to="/pos" replace />} />
      </Routes>
    </Router>
  )
}

export default App
