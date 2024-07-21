import React from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';
import AuthMiddleware from './middlewares/AuthMiddleware';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import User from './pages/auth/User';
import PersistLogin from './components/PersistLogin';
import Navbar from "./components/Navbar";
import useAuth from './hooks/useAuth';
import Sidebar from './components/Sidebar';
import CellChart from './components/CellChart';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  
  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="app-container">
      {isLoggedIn && <Sidebar />}
      <div className="main-content">
        <Routes>
          <Route path='/' element={<PersistLogin />}>
            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path='/auth'>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='user' element={
                <ProtectedRoute>
                  <AuthMiddleware />
                </ProtectedRoute>
              }>
                <Route index element={<User />} />
              </Route>
            </Route>
            <Route path='/cell/:cellId' element={
              <ProtectedRoute>
                <CellChart />
              </ProtectedRoute>
            } />
            <Route path='*' element={
              <ProtectedRoute>
                <Navigate to='/' />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
