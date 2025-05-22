import React from 'react'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home, About, Faculty, Student, NotFound, Notification, FacultySignup, FacultyLogin, FacultyDashboard } from './pages/index.js';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ForgotPassword from './components/ForgetPassword.jsx';
import ResetPassword from './components/ResetPassword.jsx';
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/notificaiton' element={<Notification />} />
        <Route path="/faculty-signup" element={<FacultySignup/>} />
        <Route path="/faculty/login" element={<FacultyLogin/>} />
        <Route path="/faculty/dashboard" element={<FacultyDashboard/>} />
        <Route path='/faculty' element={<Faculty />} />
        <Route path='/Student' element={<Student />} />
        <Route path='/forget-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:email' element={<ResetPassword />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
