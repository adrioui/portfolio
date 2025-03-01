
// Matrix-style falling code background
const createMatrixEffect = (container: HTMLElement): void => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#%&*+=-';
  const columns = Math.floor(window.innerWidth / 15);
  
  for (let i = 0; i < columns; i++) {
    const character = document.createElement('div');
    character.className = 'matrix-code';
    character.style.left = `${i * 15}px`;
    character.style.animationDelay = `${Math.random() * 5}s`;
    character.style.animationDuration = `${5 + Math.random() * 10}s`;
    
    // Random characters
    character.textContent = Array.from(
      { length: Math.floor(5 + Math.random() * 15) }, 
      () => characters[Math.floor(Math.random() * characters.length)]
    ).join('');
    
    container.appendChild(character);
  }
};

// Convert text to binary
const textToBinary = (text: string): string => {
  return Array.from(text)
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
};

// Easter eggs setup
export const initEasterEggs = (): void => {
  // Triple-click anywhere to toggle "Developer Mode"
  let clickCount = 0;
  let clickTimer: number | null = null;
  let developerMode = false;
  let developerModeElement: HTMLElement | null = null;

  document.addEventListener('click', () => {
    clickCount += 1;
    
    if (clickTimer) {
      window.clearTimeout(clickTimer);
    }
    
    clickTimer = window.setTimeout(() => {
      if (clickCount >= 3) {
        // Toggle developer mode
        developerMode = !developerMode;
        
        if (developerMode) {
          // Create matrix background if it doesn't exist
          if (!developerModeElement) {
            developerModeElement = document.createElement('div');
            developerModeElement.className = 'developer-mode';
            document.body.appendChild(developerModeElement);
            createMatrixEffect(developerModeElement);
          } else {
            developerModeElement.style.display = 'block';
          }
        } else {
          // Hide matrix background
          if (developerModeElement) {
            developerModeElement.style.display = 'none';
          }
        }
      }
      
      clickCount = 0;
    }, 500);
  });

  // Footer easter egg - convert to binary after hover
  const footer = document.querySelector('footer');
  if (footer) {
    let hoverTimer: number | null = null;
    let originalFooterContent = '';
    let inBinaryMode = false;

    footer.addEventListener('mouseenter', () => {
      if (inBinaryMode) return;
      
      originalFooterContent = footer.innerHTML;
      
      hoverTimer = window.setTimeout(() => {
        const binaryText = textToBinary("Currently listening to nothing...");
        footer.innerHTML = `<div class="font-mono text-xs opacity-70 overflow-hidden whitespace-nowrap overflow-ellipsis">${binaryText}</div>`;
        inBinaryMode = true;
        
        // Auto-reset after 5 seconds
        setTimeout(() => {
          footer.innerHTML = originalFooterContent;
          inBinaryMode = false;
        }, 5000);
      }, 5000);
    });

    footer.addEventListener('mouseleave', () => {
      if (hoverTimer) {
        window.clearTimeout(hoverTimer);
        hoverTimer = null;
      }
    });
  }
};

// Function to trigger ASCII art animation when clicking the name
export const triggerNameAnimation = (): void => {
  // Create a temporary overlay for ASCII art
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 flex items-center justify-center bg-background/90 z-50';
  
  const ascii = document.createElement('pre');
  ascii.className = 'font-mono text-highlight text-xs sm:text-sm animate-fade-in';
  
  // Simple ASCII art
  ascii.textContent = `
    ███╗   ███╗ █████╗ ██╗  ██╗
    ████╗ ████║██╔══██╗╚██╗██╔╝
    ██╔████╔██║███████║ ╚███╔╝ 
    ██║╚██╔╝██║██╔══██║ ██╔██╗ 
    ██║ ╚═╝ ██║██║  ██║██╔╝ ██╗
    ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
     >> Click anywhere to dismiss
  `;
  
  overlay.appendChild(ascii);
  document.body.appendChild(overlay);
  
  // Remove on click
  overlay.addEventListener('click', () => {
    overlay.classList.add('animate-fade-out');
    setTimeout(() => {
      document.body.removeChild(overlay);
    }, 500);
  });
};
