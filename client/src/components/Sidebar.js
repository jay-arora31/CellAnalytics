import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Sidebar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [cellIDs, setCellIDs] = useState([]);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetch('http://localhost:8000/api/unique-cell-ids/')
                .then(response => response.json())
                .then(data => setCellIDs(data))
                .catch(error => console.error('Error fetching cell IDs:', error));
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className="app-container">
            <div className="sidebar">
                <div className="sidebar-heading">Cell Analytics</div>
                <div className="list-group list-group-flush flex-grow-1">
                    <Link to="/" className="list-group-item list-group-item-action bg-light">Dashboard</Link>
                    
                    <div className="list-group-item bg-light" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                        Cell ID
                    </div>
                    {dropdownOpen && (
                        <div className="expanded-list">
                            {cellIDs.map(cell_id => (
                                <div key={cell_id} className="expanded-item">
                                    <Link  to={`/cell/${cell_id}`}> {cell_id}</Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                    <button onClick={handleLogout} className="bg-danger list-group-item list-group-item-action  logout-button">Logout</button>
            </div>
            <div className="main-content">
                {/* This is where the main content of your pages will go */}
            </div>
        </div>
    );
};

export default Sidebar;
