import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import CreateEmployee from './pages/CreateEmployee';
import EmployeeEdit from './pages/EmployeeEdit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/edit-employee/:id" element={<EmployeeEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
