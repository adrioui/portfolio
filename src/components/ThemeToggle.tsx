
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Theme = 'light' | 'dark';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const { toast } = useToast();
  
  // Initialize theme based on local storage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);
  
  // Apply theme changes to document
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    toast({
      title: `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode activated`,
      description: `Your eyes ${newTheme === 'dark' ? 'thank you' : 'will recover eventually'}`,
      duration: 3000,
    });
  };
  
  return (
    <button 
      onClick={toggleTheme} 
      className="fixed top-4 right-4 z-50 p-2 bg-secondary/80 backdrop-blur rounded-sm transition-all hover:bg-secondary"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      data-quirk="theme-toggle"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
