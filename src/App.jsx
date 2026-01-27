import { useState } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
import ServicesCarousel from './pages/ServicesCarousel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LandingPage/>
      <ServicesCarousel/>
    </>
  )
}

export default App
