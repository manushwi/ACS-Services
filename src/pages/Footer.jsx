const currentYear = new Date().getFullYear();
import { FaTwitter, FaLinkedin, FaGithub, FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id='footer' className="relative z-0">
      {/* Dark marble section */}
      <div
        className="relative py-20 px-4 bg-black md:px-8"
        style={{
          // backgroundImage: `url(/marble.png)`,
          // backgroundSize: "cover",
          // backgroundPosition: "center",
        }}
      >

        <div className="relative z-10 text-white max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center">
                  <a href="/" className="flex items-center gap-2">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center">
                      <img src="/logo.png" alt="ACS Services Logo" loading="lazy" />
                    </div>
                    <span className="w-20 h-20 flex justify-center items-center font-semibold text-base h">
                      <img src="/logotext.png" alt="ACS Services" loading="lazy" />
                    </span>
                  </a>  

                </div>

              </div>
              <p className="text-muted-foreground max-w-sm">
                Bringing elegance and shine back to your spaces with professional cleaning and restoration services.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-lg text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                  <li>
                    <a href="#services" className="text-muted-foreground hover:text-gold transition-colors">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="#pricing" className="text-muted-foreground hover:text-gold transition-colors">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="/gallery" className="text-muted-foreground hover:text-gold transition-colors">
                      Gallery
                    </a>
                  </li>
                  <li>
                    <a href="/admin" className="text-muted-foreground hover:text-gold transition-colors">
                      Login
                    </a>
                  </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-lg text-white mb-4">Contact Us</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>avtaarcleaningsol96@gmail.com</li>
                <li>+91 9548808149</li>
                <li>Chhapraula</li>
                <li>India </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      {/* Bottom bar */}
<div className="bg-black border-t border-neutral-800 py-6 px-4">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

    {/* Left text */}
    <p className="text-neutral-400 text-sm">
      © Avtaar Cleaning Solutions
    </p>

    {/* Social Icons */}
    <div className="flex items-center gap-6 text-neutral-400 text-lg">
      <a href="https://www.facebook.com/profile.php?id=61557508110988" target="_blank" rel="noopener noreferrer"
        className="hover:text-white transition">
        <FaFacebookF />
      </a>
      <a href="https://www.instagram.com/acs_servicess?utm_source=qr&igsh=MW5janI4bnppMmxyeQ%3D%3D" target="_blank" rel="noopener noreferrer"
        className="hover:text-white transition">
        <FaInstagram />
      </a>
    </div>
  </div>
</div>

    </footer>
  );
};

export default Footer;