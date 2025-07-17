import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { createClient } from '@blinkdotnew/sdk'
import Header from './components/layout/Header'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import PropertyPage from './pages/PropertyPage'

const blink = createClient({
  projectId: 'airbnb-clone-mdr9nma1',
  authRequired: true
})

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/property/:id" element={<PropertyPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App