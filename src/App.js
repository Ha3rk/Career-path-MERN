import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'
import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Main from './Main'
import Footer from './Footer'
import About from './pages/About'
import Contact from './pages/Contact'
import Career from './CareerListPage'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Planning" element={<Career />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
