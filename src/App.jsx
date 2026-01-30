
import './App.css'
import LandingPage from './pages/LandingPage'
import ServicesCarousel from './pages/ServicesCarousel'
import ResizableNavbar from "./components/Navbar"
import ToastHost from "./components/ToastHost";
import ServicesBento from "./pages/ServicesBento";
import Footer from './pages/Footer'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Gallery from './pages/Gallery';


function App() {
  

  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  )
}

function RouterContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
      {!isAdminRoute && <ResizableNavbar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <LandingPage />
              <ServicesCarousel />
              <ServicesBento />
              <Footer />
            </>
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
      <ToastHost />
    </>
  );
}

export default App
