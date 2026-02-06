import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'antd/dist/reset.css';

// Lazy load all page components
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const UserManagement = lazy(() => import('./pages/user-management/UserManagement'));
const CreateTicket = lazy(() => import('./pages/create-ticket/CreateTicket'));
const TicketDetails = lazy(() => import('./pages/ticket-details/TicketDetails'));
const EditTicket = lazy(() => import('./pages/edit-ticket/EditTicket'));
const Profile = lazy(() => import('./pages/profile/Profile'));
const MyTickets = lazy(() => import('./pages/my-tickets/MyTickets'));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '18px',
    color: '#1890ff'
  }}>
    Loading...
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/create-ticket" element={<CreateTicket />} />
          <Route path="/ticket/:ticketId" element={<TicketDetails />} />
          <Route path="/edit-ticket/:ticketId" element={<EditTicket />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;