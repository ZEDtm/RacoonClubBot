import './App.css';
import React from "react";
import { AuthProvider, useAuth } from './auth/AuthContext';
import TelegramAuth from './auth/TelegramAuth'
import { ButtonTelegramAuth } from './auth/TelegramAuthSec'
import Loader from './components/ui/Loader/Loader'
import Header from './components/elements/Header/Header';
import Home from './views/Events/Home';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import TestHome from './views/Events/TestHome'
// import EventDetail from "./views/EditEvent/EventDetail";
import EditPage from './components/pages/EditPage/EditForm'



export default function App() {
  const token = localStorage.getItem('access_token');
  return (
    <AuthProvider>
      {!window.Telegram.WebApp.initData ? token ? null : <ButtonTelegramAuth/> : <TelegramAuth/>}
      <AppContent />
   </AuthProvider>
  );
}


const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
      return <Loader/>
  }

  if (!user) {
      return (
          <Router>
              <Header />
              <Routes>
                  <Route path="/" element={<TestHome />} />
                  <Route path="/event/:_id" element={<EditPage />} />
              </Routes>
          </Router>

      );{/** <p>OOOps</p> */}
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/event/:_id" component={EditPage} />
      </Routes>
    </Router>
  );
};