import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api'; // ✅ use API instance
import './Departments.css';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await api.get('/departments');
        setDepartments(res.data.data);
      } catch (err) {
        setError('Failed to fetch departments');
        console.error('Error fetching departments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return <div className="loading-container">Loading departments...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="departments-page">
      <h1>Our Departments</h1>
      <div className="departments-grid">
        {departments.length === 0 ? (
          <p>No departments available at the moment.</p>
        ) : (
          departments.map((dept) => (
            <Link
              key={dept._id}
              to={`/departments/${dept._id}`}
              state={{ departmentId: dept._id }}
              className="department-card"
            >
              <div className="dept-icon">{dept.icon || '🏥'}</div>
              <h3>{dept.name}</h3>
              <p>{dept.description?.substring(0, 80)}...</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Departments;
