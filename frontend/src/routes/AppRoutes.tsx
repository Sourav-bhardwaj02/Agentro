import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import SidebarLayout from '../components/layout/SidebarLayout';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

// Public Pages
import Landing from '../pages/Landing';
import About from '../pages/About';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';

// Student Pages
import Home from '../pages/student/Home';
import Chat from '../pages/student/Chat';
import Courses from '../pages/student/Courses';
import Scholarships from '../pages/student/Scholarships';
import StudentDocuments from '../pages/student/Documents';
import Eligibility from '../pages/student/Eligibility';
import Profile from '../pages/student/Profile';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import Colleges from '../pages/admin/Colleges';
import Documents from '../pages/admin/Documents';
import Analytics from '../pages/admin/Analytics';
import WebsiteCrawler from '../pages/admin/WebsiteCrawler';
import Settings from '../pages/admin/Settings';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes with MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Student Routes with Sidebar */}
      <Route element={<PrivateRoute />}>
        <Route element={<SidebarLayout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/documents" element={<StudentDocuments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/eligibility" element={<Eligibility />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/colleges" element={<Colleges />} />
        <Route path="/admin/documents" element={<Documents />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/crawler" element={<WebsiteCrawler />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Route>
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
