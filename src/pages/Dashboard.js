import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import api from '../api'; // ✅ use configured axios instance
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get('/appointments', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setAppointments(res.data.data.slice(0, 3)); // Show latest 3
      } catch (err) {
        console.error('Error fetching appointments:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchAppointments();
    }
  }, [user]);

  const getStatusClass = (status) => {
    const classes = {
      pending: 'status-pending',
      confirmed: 'status-confirmed',
      completed: 'status-completed',
      cancelled: 'status-cancelled',
    };
    return classes[status] || '';
  };

  const getUrgencyClass = (level) => {
    const classes = {
      low: 'urgency-low',
      medium: 'urgency-medium',
      high: 'urgency-high',
      emergency: 'urgency-emergency',
    };
    return classes[level] || '';
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.fullName}! 👋</h1>
        <p>Manage your health and appointments</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>{appointments.length}</h3>
            <p>Recent Appointments</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏥</div>
          <div className="stat-info">
            <h3>Multiple</h3>
            <p>Departments Available</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚕️</div>
          <div className="stat-info">
            <h3>24/7</h3>
            <p>Healthcare Access</p>
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/book-appointment" className="action-btn">
            <span className="action-icon">📝</span>
            <span>Book Appointment</span>
          </Link>
          <Link to="/departments" className="action-btn">
            <span className="action-icon">🏥</span>
            <span>View Departments</span>
          </Link>
          <Link to="/my-appointments" className="action-btn">
            <span className="action-icon">📋</span>
            <span>My Appointments</span>
          </Link>
        </div>
      </div>

      <div className="recent-appointments">
        <div className="section-header">
          <h2>Recent Appointments</h2>
          <Link to="/my-appointments" className="view-all">View All →</Link>
        </div>

        {loading ? (
          <p>Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <div className="empty-state">
            <p>No appointments yet. Book your first appointment!</p>
            <Link to="/book-appointment" className="btn btn-primary">Book Now</Link>
          </div>
        ) : (
          <div className="appointments-list">
            {appointments.map((appointment) => (
              <div key={appointment._id} className="appointment-card">
                <div className="appointment-header">
                  <h3>{appointment.department?.name}</h3>
                  <span className={`badge ${getStatusClass(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
                <div className="appointment-details">
                  <p><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {appointment.appointmentTime}</p>
                  <p>
                    <strong>Urgency:</strong>{' '}
                    <span className={`urgency-badge ${getUrgencyClass(appointment.urgencyLevel)}`}>
                      {appointment.urgencyLevel}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
