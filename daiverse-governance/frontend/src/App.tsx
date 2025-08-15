import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import TokenManagement from './pages/TokenManagement'
import Governance from './pages/Governance'
import DatasetRegistry from './pages/DatasetRegistry'
import TrainingJobs from './pages/TrainingJobs'
import Treasury from './pages/Treasury'
import { useWallet } from './hooks/useWallet'

function App() {
  const { account, connect, disconnect, isConnected, isLoading } = useWallet()

  return (
    <Router>
      <div className="container">
        <nav className="nav">
          <div>
            <h1>DAIVerse Governance</h1>
          </div>
          <div className="nav-links">
            <Link to="/">Dashboard</Link>
            <Link to="/token">Token</Link>
            <Link to="/governance">Governance</Link>
            <Link to="/datasets">Datasets</Link>
            <Link to="/training">Training Jobs</Link>
            <Link to="/treasury">Treasury</Link>
          </div>
          <div>
            {isConnected ? (
              <div>
                <span>{account?.slice(0, 6)}...{account?.slice(-4)}</span>
                <button onClick={disconnect} className="btn-secondary">Disconnect</button>
              </div>
            ) : (
              <button 
                onClick={connect} 
                className="btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/token" element={<TokenManagement />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/datasets" element={<DatasetRegistry />} />
          <Route path="/training" element={<TrainingJobs />} />
          <Route path="/treasury" element={<Treasury />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
