
// Text quirk animations
export const textQuirks = {
  // Replace a link with a quirky icon on hover
  quirkyLinkAnimation: (element: HTMLElement): void => {
    const originalText = element.textContent || '';
    const quirkyIcons = ['🍝', '⚡', '🔧', '👾', '🎨', '📊'];
    
    element.addEventListener('mouseenter', () => {
      // Save original text as data attribute if not already saved
      if (!element.getAttribute('data-original-text')) {
        element.setAttribute('data-original-text', originalText);
      }
      
      // Pick a random icon
      const randomIcon = quirkyIcons[Math.floor(Math.random() * quirkyIcons.length)];
      element.textContent = randomIcon;
    });
    
    element.addEventListener('mouseleave', () => {
      // Restore original text
      element.textContent = element.getAttribute('data-original-text') || originalText;
    });
  },
  
  // Stretch text like taffy on scroll
  stretchyHeading: (element: HTMLElement): void => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          element.classList.add('animate-stretch');
          
          // Remove animation after it completes
          setTimeout(() => {
            element.classList.remove('animate-stretch');
          }, 2000);
          
          // Only trigger once
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(element);
  },
  
  // Make horizontal rules wave on hover
  wavyDivider: (element: HTMLElement): void => {
    element.addEventListener('mouseenter', () => {
      element.classList.add('animate-waving-line');
    });
    
    element.addEventListener('mouseleave', () => {
      // Allow animation to complete before removing
      setTimeout(() => {
        element.classList.remove('animate-waving-line');
      }, 2000);
    });
  }
};

// Initialize animations on a page
export const initAnimations = (): void => {
  // Apply quirky link animations to all links with data-quirk attribute
  document.querySelectorAll<HTMLElement>('[data-quirk="link"]').forEach(textQuirks.quirkyLinkAnimation);
  
  // Apply stretchy animations to section headings
  document.querySelectorAll<HTMLElement>('.section-heading').forEach(textQuirks.stretchyHeading);
  
  // Apply wavy animations to dividers
  document.querySelectorAll<HTMLElement>('.wave-divider').forEach(textQuirks.wavyDivider);
};
