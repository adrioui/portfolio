
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Terminal from "@/components/Terminal";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-lg">
        <span className="inline-block font-mono bg-highlight/20 px-2 py-1 text-sm rounded-sm mb-4">
          Error 404
        </span>
        <h1 className="text-4xl font-mono font-bold mb-4">$ Page not found</h1>
        <p className="text-softgray mb-8">The requested path does not compute.</p>
        
        <Terminal 
          commands={[
            "locate " + location.pathname,
            "Error: File not found",
            "suggest_next_steps",
            "1. Check URL for typos",
            "2. Return to home page",
            "3. Try turning it off and on again"
          ]}
          className="mb-8"
        />
        
        <a href="/" className="link-hover font-mono">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
