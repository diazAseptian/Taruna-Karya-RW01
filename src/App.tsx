import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'

// Landing Page Components
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Activities from './components/Activities'
import Articles from './components/Articles'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Admin Components
import Login from './components/admin/Login'
import Dashboard from './components/admin/Dashboard'

const LandingPage = () => {
  return (
    <div className="font-inter">
      <Navbar />
      <Hero />
      <About />
      <Activities />
      <Articles />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  )
}

const AdminRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsLoggedIn(!!session)
      setLoading(false)
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_: any, session: any) => {
        setIsLoggedIn(!!session)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsLoggedIn(false)
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Login onLogin={handleLogin} />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App