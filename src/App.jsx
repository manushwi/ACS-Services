import { useState, useEffect } from "react";
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
import FaqPage from './pages/Faqpage';
import Follow from './components/Follow';
import Preloader from "./components/Preloader";
import GalleryPreview from "./components/GalleryPreview";
import LogoMarquee from "./components/LogoMarquee";

function App() {
  const [loading, setLoading] = useState(true);

  // Optional fallback in case animation callback fails
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Preloader onFinish={() => setLoading(false)} />}

      {!loading && (
        <BrowserRouter>
          <RouterContent />
        </BrowserRouter>
      )}
    </>
  )
}

function RouterContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <ResizableNavbar />}
      {/* {!isAdminRoute && <Follow />} */}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <LandingPage />
              <ServicesCarousel />
              <ServicesBento />
              <LogoMarquee/>
              <GalleryPreview />
              <FaqPage />
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

export default App;
