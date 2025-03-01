
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6 border-t border-border text-softgray text-sm">
      <p>Powered by caffeine and existential deadlines</p>
      <p className="text-xs mt-2">© {new Date().getFullYear()} Max – Hover here for 5 seconds...</p>
    </footer>
  );
};

export default Footer;
