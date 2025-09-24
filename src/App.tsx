import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Navbar from './components/common/Navbar';
import LoadingSpinner from './components/common/LoadingSpinner';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import PYQRepository from './pages/PYQRepository';

// Lazy load other pages
const ExamCalendar = React.lazy(() => import('./pages/ExamCalendar'));
const NotesHub = React.lazy(() => import('./pages/NotesHub'));
const ImportantLinks = React.lazy(() => import('./pages/ImportantLinks'));
const Events = React.lazy(() => import('./pages/Events'));
const Profile = React.lazy(() => import('./pages/Profile'));

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Page Wrapper with Animation
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <PageWrapper>
                {user ? <Navigate to="/dashboard" replace /> : <Landing />}
              </PageWrapper>
            } />
            <Route path="/login" element={
              <PageWrapper>
                {user ? <Navigate to="/dashboard" replace /> : <Login />}
              </PageWrapper>
            } />
            <Route path="/signup" element={
              <PageWrapper>
                {user ? <Navigate to="/dashboard" replace /> : <SignUp />}
              </PageWrapper>
            } />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <PageWrapper>
                  <Dashboard />
                </PageWrapper>
              </ProtectedRoute>
            } />
            <Route path="/pyq" element={
              <ProtectedRoute>
                <PageWrapper>
                  <PYQRepository />
                </PageWrapper>
              </ProtectedRoute>
            } />
            <Route path="/calendar" element={
              <ProtectedRoute>
                <PageWrapper>
                  <React.Suspense fallback={<LoadingSpinner size="lg" className="min-h-screen" />}>
                    <ExamCalendar />
                  </React.Suspense>
                </PageWrapper>
              </ProtectedRoute>
            } />
            <Route path="/notes" element={
              <ProtectedRoute>
                <PageWrapper>
                  <React.Suspense fallback={<LoadingSpinner size="lg" className="min-h-screen" />}>
                    <NotesHub />
                  </React.Suspense>
                </PageWrapper>
              </ProtectedRoute>
            } />
            <Route path="/links" element={
              <ProtectedRoute>
                <PageWrapper>
                  <React.Suspense fallback={<LoadingSpinner size="lg" className="min-h-screen" />}>
                    <ImportantLinks />
                  </React.Suspense>
                </PageWrapper>
              </ProtectedRoute>
            } />
            <Route path="/events" element={
              <ProtectedRoute>
                <PageWrapper>
                  <React.Suspense fallback={<LoadingSpinner size="lg" className="min-h-screen" />}>
                    <Events />
                  </React.Suspense>
                </PageWrapper>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <PageWrapper>
                  <React.Suspense fallback={<LoadingSpinner size="lg" className="min-h-screen" />}>
                    <Profile />
                  </React.Suspense>
                </PageWrapper>
              </ProtectedRoute>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
};

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </AppProvider>
  );
}

export default App;