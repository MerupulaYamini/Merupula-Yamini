import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import UserManagement from './pages/user-management/UserManagement';
import CreateTicket from './pages/create-ticket/CreateTicket';
import TicketDetails from './pages/ticket-details/TicketDetails';
import EditTicket from './pages/edit-ticket/EditTicket';
import Profile from './pages/profile/Profile';
import MyTickets from './pages/my-tickets/MyTickets';
import 'antd/dist/reset.css';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App
