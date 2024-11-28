import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaSignOutAlt, FaStar, FaCalendar, FaUsers, FaGamepad } from 'react-icons/fa';
import './css/adminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [previousCount, setPreviousCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchUsers(token);
    }
  }, [navigate]);

  const fetchUsers = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/users', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const filteredUsers = data.filter((user) => user.role === 'user');
        setUsers(filteredUsers);
        setUserCount(filteredUsers.length);
        setPreviousCount(filteredUsers.length - 1);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/auth/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setUsers(users.filter((user) => user._id !== userId));
        setUserCount(userCount - 1);
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const userChangePercentage = previousCount
    ? Math.round(((userCount - previousCount) / previousCount) * 100)
    : 0;

  return (
    <div className="dashboard-container">
      {}
      <div className="sidebar">
    
      

        <div className="sidebar-item" onClick={() => navigate('/transactions')}>
        <FaUsers className="sidebar-icon" />
          Transactions History
        </div> 
        

        <div className="sidebar-item" onClick={() => navigate('/brand-management')}>
          <FaStar className="sidebar-icon" />
          Brand Management
        </div>
        {}
        <div className="sidebar-item" onClick={() => navigate('/product-management')}>
          <FaGamepad className="sidebar-icon" />
          Product Management
        </div>

        
        <div className="sidebar-item" onClick={handleLogout}>
          <FaSignOutAlt className="sidebar-icon" />
          Logout
        </div>
      </div>

      {}
      <div className="content-wrapper">
        <header className="header">
          <div className="right-section">
      
          </div>
        </header>
     
          <h2 className="main-title">Admin Dashboard</h2>

      </div>
    </div>
  );
};

export default AdminDashboard;
