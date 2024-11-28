import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import BrandManagement from './components/BrandManagement';
import ProductManagement from './components/ProductManagement'; 
import Homes from './components/Homes'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductsList from './components/ProductsList';      
import OrderHistory from './components/OrderHistory'; 
import Transactions from './components/Transactions'; 
import Analytics from './components/Analytics';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/brand-management" element={<BrandManagement />} />
          <Route path="/product-management" element={<ProductManagement />} /> 
          <Route path="/home" element={<Homes />} />
          <Route path="/products" element={<ProductsList />} /> 
          <Route path="/order-history" element={<OrderHistory />} /> 
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
