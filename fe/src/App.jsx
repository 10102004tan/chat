import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TestPage from './pages/TestPage';
import Navbar from './components/Navbar';
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import SignupPage from './pages/SignupPage';
import { gapi } from 'gapi-script';
import GitHubCallback from './pages/GitHubCallback';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    }
    gapi.load('client:auth2', start);
  }, []);

  if (!authUser && isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path='/auth/github/callback' element={!authUser ? <GitHubCallback /> : <Navigate to="/" />} />
        <Route path='/test' element={<TestPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}
export default App
