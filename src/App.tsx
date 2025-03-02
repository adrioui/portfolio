import './App.css'
import {
  ClerkAuthProvider,
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  useClerk,
} from ' @clerk/clerk-react'
import { Auth } from '@/pages/Auth'
import Index from '@/pages/Index'
import Profile from '@/pages/Profile'
import ProjectDetail from '@/pages/ProjectDetail'
import NotFound from '@/pages/NotFound'
import Header from '@/components/Header'
import { Toaster } from 'sonner'
import ProtectedRoute from '@/components/ProtectedRoute'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Projects from '@/pages/Projects';

// Define a default fallback function for `ClerkAuthProvider`.
const clerkAuthProp = {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  navigate: () => {},
};

function App() {
  return (
    <BrowserRouter>
      <main className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sign-in/*" element={<Auth type="sign-in" />} />
          <Route path="/sign-up/*" element={<Auth type="sign-up" />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
