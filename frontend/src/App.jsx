import React from 'react'
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import PagePrincipal from './pages/PagePrincipale'
import PageNouvelleCandidature from './pages/PageNouvelleCandidature'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PagePrincipal />} />
        <Route path="/Nouvelle-Candidature" element={<PageNouvelleCandidature />} />
      </Routes>
    </Router>
  )
}

export default App
