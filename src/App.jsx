import { useState } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
import ServicesCarousel from './pages/ServicesCarousel'
import ResizableNavbar from "./components/Navbar"
// import ServicesBento from "./pages/ServicesBento";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ResizableNavbar />
      <LandingPage />
      <ServicesCarousel />
      {/* <ServicesBento/> */}
    </>
  )
}

export default App
