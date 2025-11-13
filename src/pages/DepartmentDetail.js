// frontend/src/pages/DepartmentDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import api from '../api';
import emergencyGif from '../assets/emergency.gif';
import generalCheckup from '../assets/general-checkup.jpg';
import './DepartmentDetail.css';

const DepartmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await api.get(`/departments/${id}`, {
          headers: user?.token ? { Authorization: `Bearer ${user.token}` } : {}
        });
        setDepartment(res.data.data);
      } catch (err) {
        setError('Failed to load department details');
        console.error('Error fetching department:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartment();
  }, [id, user]);

  if (loading) return <div className="loading-container">Loading department details...</div>;
  if (error || !department) return <div className="error-container">{error || 'Department not found'}</div>;

  return (
    <div className="department-detail">
      <button onClick={() => navigate(-1)} className="back-btn">← Back</button>

      <div className="dept-header">
        <div className="dept-icon-large">{department.icon}</div>
        <div className="dept-header-info">
          <h1>{department.name}</h1>
          <p className="dept-description-full">{department.description}</p>
          {department.emergencyAvailable && (
            <span className="emergency-badge-large">🚨 Emergency Services Available</span>
          )}
        </div>
      </div>

      <div className="dept-content">
        {/* Services */}
        <div className="dept-section">
          <h2>Services Offered</h2>
          <ul className="services-list">
            {department.services?.length > 0
              ? department.services.map((service, index) => <li key={index}>✓ {service}</li>)
              : <li>General consultation and treatment</li>
            }
          </ul>
        </div>

        {/* Contact */}
        <div className="dept-section">
          <h2>Contact Information</h2>
          <div className="contact-info">
            <p><strong>📞 Phone:</strong> {department.contactNumber}</p>
            <p><strong>🕐 Available Hours:</strong> {department.availableHours}</p>
            <p><strong>Email:</strong> <a href="mailto:mattymatty9372@gmail.com">mattymatty9372@gmail.com</a></p>
            <p><strong>Facebook:</strong> <a href="https://facebook.com/maxizomk" target="_blank" rel="noreferrer">maxizomk</a></p>
            <p><strong>Instagram:</strong> <a href="https://instagram.com/rmeliosh" target="_blank" rel="noreferrer">rmeliosh</a></p>
            <p><strong>YouTube:</strong> <a href="https://youtube.com/RahaTupu" target="_blank" rel="noreferrer">RahaTupu</a></p>
          </div>
        </div>

        {/* Doctors */}
        {department.doctors?.length > 0 && (
          <div className="dept-section">
            <h2>Our Doctors</h2>
            <div className="doctors-list">
              {department.doctors.map((doctor) => (
                <div key={doctor._id} className="doctor-card">
                  <div className="doctor-icon">⚕️</div>
                  <div className="doctor-info">
                    <h4>{doctor.fullName}</h4>
                    <p>{doctor.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Emergency GIF */}
        {department.emergencyAvailable && (
          <div className="dept-section emergency-gallery">
            <h2>Emergency Team in Action</h2>
            <div className="emergency-card">
              <img src={emergencyGif} alt="Emergency Team" />
            </div>
          </div>
        )}

        {/* General Checkup Image */}
        {department.name.toLowerCase() === 'general checkup' && (
          <div className="dept-section general-checkup-gallery">
            <h2>Our Team in Action</h2>
            <div className="checkup-image-card">
              <img src={generalCheckup} alt="General Checkup" />
            </div>
          </div>
        )}
       {/* Referral & Service Assurance Section */}
         <div className="dept-section referral-services">
         <h2>Our Commitment to Quality Care</h2>
         <p>
           At HealthLink, we ensure that all our services comply with government health standards, 
           so you can be confident in the quality of care you receive. Our treatments are effective 
            and offered at affordable prices because we believe everyone deserves access to good health.
          </p>
          <p>
           For specialized treatments or advanced care, we provide <strong>referrals to top hospitals </strong> 
            locally and internationally, ensuring you get the care you need when needed.
           </p>
       <div className="referral-examples">
       <ul>
      <li>Kenya: Aga Khan Hospital, Nairobi</li>
      <li>Uganda: Nakasero Hospital, Kampala</li>
      <li>India: Apollo Hospitals, Chennai</li>
      </ul>
    </div>
</div>

        {/* Book Appointment */}
        <div className="dept-action">
          <Link 
            to="/book-appointment" 
            state={{ departmentId: department._id, departmentName: department.name }}
            className="btn btn-primary btn-large"
          >
            Book Appointment with This Department
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetail;
