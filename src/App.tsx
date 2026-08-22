import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DataProvider } from './context/DataContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import AdminLayout from './pages/Admin/AdminLayout'
import AdminDashboard from './pages/Admin/AdminDashboard'

import About from "./components/About"
import Channels from "./components/Channels"
import Contact from "./components/Contact"
import Experience from "./components/Experience"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import Nav from "./components/Nav"
import Stack from "./components/Stack"
import Work from "./components/Work"

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-base text-fg">
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Channels />
        <Stack />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Portfolio Route */}
          <Route path="/" element={<Portfolio />} />
          
          {/* Admin Login Route */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  )
}
