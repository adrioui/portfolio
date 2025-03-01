
import React from 'react';
import Terminal from '@/components/Terminal';

const Contact = () => {
  return (
    <section id="contact" className="py-20 pb-32">
      <h2 className="section-heading">$ contact --method</h2>
      
      <Terminal 
        commands={[
          "contact --method",
          "[1] Carrier pigeon (Preferred)",
          "[2] Email (max@bonhomme.lol)",
          "[3] Fax (Seriously?)"
        ]} 
        className="mt-12 max-w-2xl" 
        typingSpeed={30}
      />
      
      <div className="mt-12 flex gap-6">
        <a 
          href="mailto:max@bonhomme.lol" 
          className="link-hover font-mono"
          data-quirk="link"
        >
          Send Email
        </a>
        <a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="link-hover font-mono"
          data-quirk="link"
        >
          Twitter
        </a>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="link-hover font-mono"
          data-quirk="link"
        >
          GitHub
        </a>
      </div>
    </section>
  );
};

export default Contact;
