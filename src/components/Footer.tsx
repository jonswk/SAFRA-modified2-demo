import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#1b1c1c] text-gray-400 py-10 px-4 mt-auto border-t border-gray-800" id="main-footer">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs">
        <div className="text-center md:text-left">
          <div className="font-extrabold text-white text-lg tracking-tighter mb-1">SAFRA</div>
          <p className="text-gray-500 text-[11px]">&copy; {new Date().getFullYear()} SAFRA National Service Association. All Rights Reserved.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-gray-400">
          <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("SAFRA's Privacy Policy is strictly enforced to protect NSmen personal data."); }} className="hover:text-white transition-colors" id="footer-privacy-link">
            Privacy Policy
          </a>
          <a href="#terms" onClick={(e) => { e.preventDefault(); alert("mySAFRA account terms govern the registration and usage of SAFRA online services."); }} className="hover:text-white transition-colors" id="footer-terms-link">
            Terms of Use
          </a>
          <a href="#contact-us" onClick={(e) => { e.preventDefault(); alert("Contact: membership@safra.sg"); }} className="hover:text-white transition-colors" id="footer-contact-link">
            Contact Us
          </a>
          <a href="#sitemap" onClick={(e) => { e.preventDefault(); }} className="hover:text-white transition-colors" id="footer-sitemap-link">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
}
