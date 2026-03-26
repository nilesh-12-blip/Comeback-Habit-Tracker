import React, { useState, useEffect } from 'react';
import GlobalStyles from './components/GlobalStyles';
import Sidebar from './components/Sidebar';
import AuthenticatedLayout from './components/AuthenticatedLayout';

// Pages
import LoginPage from './components/pages/LoginPage';
import Dashboard from './components/pages/Dashboard';
import HabitManager from './components/pages/HabitManager';
import Analytics from './components/pages/Analytics';
import Timeline from './components/pages/Timeline';
import BadgesPage from './components/pages/BadgesPage';
import MonthlyTracker from './components/pages/MonthlyTracker';
import Settings from './components/pages/Settings';

import { getUser } from './utils/storage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = getUser();
    if (loggedUser) {
      setUser(loggedUser);
    } else {
      setCurrentPage('login');
    }
  }, []);

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const onLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('comeback_user', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const onLogout = () => {
    setUser(null);
    localStorage.removeItem('comeback_user');
    setCurrentPage('login');
  };

  if (currentPage === 'login' || !user) {
    return (
      <>
        <GlobalStyles />
        <LoginPage onLogin={onLogin} />
      </>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard user={user} navigate={navigate} />;
      case 'habits': return <HabitManager user={user} navigate={navigate} />;
      case 'monthly': return <MonthlyTracker user={user} navigate={navigate} />;
      case 'analytics': return <Analytics user={user} navigate={navigate} />;
      case 'timeline': return <Timeline user={user} navigate={navigate} />;
      case 'badges': return <BadgesPage user={user} navigate={navigate} />;
      case 'settings': return <Settings user={user} onLogout={onLogout} navigate={navigate} />;
      default: return <Dashboard user={user} navigate={navigate} />;
    }
  };

  return (
    <div className="app-container">
      <GlobalStyles />
      <AuthenticatedLayout user={user} currentPage={currentPage} navigate={navigate} onLogout={onLogout}>
        {renderPage()}
      </AuthenticatedLayout>
    </div>
  );
}
