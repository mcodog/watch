import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/userDashboard.css';

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');

            // If no token, redirect to login
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/auth/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,  // Correct template literal
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                setUser(data.user);  // Set user data to state
            } catch (err) {
                setError(err.message);  // Set error message
                localStorage.removeItem('token');  // Remove invalid token
                navigate('/login');  // Redirect to login
            }
        };

        fetchUser();
    }, [navigate]); // Empty array means this effect runs once after mount

    const handleLogout = () => {
        const confirmed = window.confirm('Do you want to logout?');
        if (confirmed) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const handleNavigateToProducts = () => {
        navigate('/products');
    };

    const handleNavigateToCart = () => {
        navigate('/order-history');
    };

    // Render loading state or error message if any
    if (error) return <p className="error">{error}</p>;
    if (!user) return <p>Loading...</p>;  // Show a loading message while waiting for user data

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="profile-section">
                    <div className="profile-picture">
                        {user.img ? (
                            <img src={`http://localhost:5000/${user.img}`} alt="Profile" /> 
                        ) : (
                            <img src="profile_placeholder.png" alt="Profile" />
                        )}
                    </div>
                    <h3>{user.name}</h3>  {/* Display user name */}
                    <button
                        onClick={() => navigate('/update-profile')} 
                        className="settings-button"
                    >
                        Settings
                    </button>
                </div>
                <nav>
                    <ul>
                        <li onClick={handleNavigateToProducts} style={{ cursor: 'pointer' }}>Products</li>
                        <li onClick={handleNavigateToCart} style={{ cursor: 'pointer' }}>Order History</li>
                    </ul>
                </nav>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </aside>
        </div>
    );
};

export default UserDashboard;
