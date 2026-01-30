

const Footer = () => {
  return (
    <footer id='footer' className="relative">
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
                      <img src="/logo.png" alt="" />
                    </div>
                    <span className="w-20 h-20 flex justify-center items-center font-semibold text-base h">
                      <img src="/logotext.png" alt="" />
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
              <h4 className="font-display text-lg text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["Services", "Pricing", "About Us", "Contact"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-lg text-foreground mb-4">Contact Us</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>acscleaning@gmail.com</li>
                <li>+1 (555) 123-4567</li>
                <li>Chhapraula</li>
                <li>India </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-cream bg-[#C6AC8F] py-6 px-4">
        <div className="max-w-7xl mx-auto flex  flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-black text-sm">
            © 2024 ACS Premium Cleaning Services. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className=" text-black hover:text-primary-foreground text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className=" text-black hover:text-primary-foreground text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;