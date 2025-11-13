// frontend/src/pages/MyAppointments.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api'; // ✅ use centralized API instance
import { useAuth } from '../context/authContext';
import './MyAppointments.css';

const MyAppointments = () => {
  const { user } = useAuth(); // Get user and token
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get('/appointments', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setAppointments(res.data.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchAppointments();
    }
  }, [user]);

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      await api.delete(`/appointments/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setAppointments((prev) => prev.filter((apt) => apt._id !== id));
      alert('Appointment cancelled successfully');
    } catch (error) {
      alert('Failed to cancel appointment');
      console.error('Error cancelling appointment:', error);
    }
  };

  const getStatusClass = (status) => ({
    pending: 'status-pending',
    confirmed: 'status-confirmed',
    completed: 'status-completed',
    cancelled: 'status-cancelled'
  }[status] || '');

  const getUrgencyClass = (level) => ({
    low: 'urgency-low',
    medium: 'urgency-medium',
    high: 'urgency-high',
    emergency: 'urgency-emergency'
  }[level] || '');

  const filteredAppointments = appointments.filter((apt) =>
    filter === 'all' ? true : apt.status === filter
  );

  if (loading) return <div className="loading-container">Loading appointments...</div>;

  return (
    <div className="my-appointments">
      <div className="page-header">
        <h1>My Appointments</h1>
        <Link to="/book-appointment" className="btn btn-primary">
          + Book New Appointment
        </Link>
      </div>

      <div className="filter-tabs">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
          All ({appointments.length})
        </button>
        <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>
          Pending ({appointments.filter(a => a.status === 'pending').length})
        </button>
        <button className={filter === 'confirmed' ? 'active' : ''} onClick={() => setFilter('confirmed')}>
          Confirmed ({appointments.filter(a => a.status === 'confirmed').length})
        </button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>
          Completed ({appointments.filter(a => a.status === 'completed').length})
        </button>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="empty-state">
          <p>No appointments found.</p>
          <Link to="/book-appointment" className="btn btn-primary">
            Book Your First Appointment
          </Link>
        </div>
      ) : (
        <div className="appointments-list">
          {filteredAppointments.map((appointment) => (
            <div key={appointment._id} className="appointment-card-full">
              <div className="appointment-card-header">
                <div>
                  <h3>{appointment.department?.name}</h3>
                  <p className="appointment-id">ID: {appointment._id.slice(-8)}</p>
                </div>
                <div className="appointment-badges">
                  <span className={`badge ${getStatusClass(appointment.status)}`}>
                    {appointment.status}
                  </span>
                  <span className={`badge ${getUrgencyClass(appointment.urgencyLevel)}`}>
                    {appointment.urgencyLevel}
                  </span>
                </div>
              </div>

              <div className="appointment-card-body">
                <div className="appointment-info-grid">
                  <div className="info-item">
                    <span className="info-label">📅 Date</span>
                    <span className="info-value">
                      {new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">🕐 Time</span>
                    <span className="info-value">{appointment.appointmentTime}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">📞 Contact</span>
                    <span className="info-value">{appointment.department?.contactNumber}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">📝 Booked On</span>
                    <span className="info-value">{new Date(appointment.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="symptoms-section">
                  <strong>Symptoms/Reason:</strong>
                  <p>{appointment.symptoms}</p>
                </div>

                {appointment.notes && (
                  <div className="notes-section">
                    <strong>Notes:</strong>
                    <p>{appointment.notes}</p>
                  </div>
                )}
              </div>

              <div className="appointment-card-footer">
                {appointment.status === 'pending' && (
                  <button onClick={() => handleCancel(appointment._id)} className="btn btn-danger">
                    Cancel Appointment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
