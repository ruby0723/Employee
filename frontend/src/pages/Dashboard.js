import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/'); 
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  

  return (
    <div className="dashboard-container">
    <div className="logout-section">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
    <div className="dashboard-header">
      <h1>Welcome to the Admin Panel</h1>
    </div>
    <div className="dashboard-actions">
      <button onClick={() => navigate('/employees')}>Employee List</button>
      <button onClick={() => navigate('/create-employee')}>Create Employee</button>
    </div>
  </div>
  );
};

export default Dashboard;
