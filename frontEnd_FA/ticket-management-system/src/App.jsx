import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import UserManagement from './pages/user-management/UserManagement';
import CreateTicket from './pages/create-ticket/CreateTicket';
import TicketDetails from './pages/ticket-details/TicketDetails';
import EditTicket from './pages/edit-ticket/EditTicket';
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
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App
