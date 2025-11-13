import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api'; // ✅ uses your pre-configured API instance
import { useAuth } from '../context/authContext';
import './BookAppointment.css';

const BookAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth(); // get logged-in user and token
  const preSelectedDept = location.state?.departmentId || '';

  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    department: preSelectedDept,
    appointmentDate: '',
    appointmentTime: '',
    symptoms: '',
    urgencyLevel: 'medium',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch departments when user logs in
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await api.get('/departments', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setDepartments(res.data.data);
      } catch (err) {
        console.error('Error fetching departments:', err);
        setError('Failed to load departments');
      }
    };

    if (user?.token) fetchDepartments();
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await api.post('/appointments', formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setSuccess(res.data.message || 'Appointment booked successfully!');
      setTimeout(() => navigate('/my-appointments'), 2000);
    } catch (err) {
      console.error('Error booking appointment:', err);
      setError(err.response?.data?.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const getMinDate = () => new Date().toISOString().split('T')[0];

  return (
    <div className="book-appointment">
      <div className="page-header">
        <h1>Book an Appointment</h1>
        <p>Schedule your visit with our healthcare professionals</p>
      </div>

      <div className="booking-form-container">
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label>Department *</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.icon} {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Appointment Date *</label>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                min={getMinDate()}
                required
              />
            </div>

            <div className="form-group">
              <label>Preferred Time *</label>
              <select
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleChange}
                required
              >
                <option value="">Select Time</option>
                {Array.from({ length: 9 }, (_, i) => 8 + i).map((hour) => (
                  <option key={hour} value={`${hour < 10 ? '0' : ''}${hour}:00`}>
                    {hour < 12
                      ? `${hour}:00 AM`
                      : hour === 12
                      ? '12:00 PM'
                      : `${hour - 12}:00 PM`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Urgency Level *</label>
            <select
              name="urgencyLevel"
              value={formData.urgencyLevel}
              onChange={handleChange}
              required
            >
              <option value="low">Low - Routine Check-up</option>
              <option value="medium">Medium - General Consultation</option>
              <option value="high">High - Urgent Care Needed</option>
              <option value="emergency">Emergency - Immediate Attention</option>
            </select>
            <small className="form-hint">
              Select “Emergency” for life-threatening cases.
            </small>
          </div>

          <div className="form-group">
            <label>Symptoms / Reason for Visit *</label>
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              required
              placeholder="Describe your symptoms or reason for appointment..."
              rows="5"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
