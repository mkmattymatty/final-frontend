import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import './Landing.css';

const Landing = () => {
  const { user } = useAuth(); // fixed

  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to HealthLink</h1>
          <p className="hero-subtitle">
            Your Digital Healthcare Companion - Access Quality Healthcare Anytime, Anywhere
          </p>
          <p className="hero-description">
            Book appointments, consult with specialists, and manage your health records all in one place.
            Supporting SDG 3: Good Health and Well-being for all.
          </p>
          <div className="hero-buttons">
            {!user ? (
              <>
                <Link to="/register" className="btn btn-primary">Get Started</Link>
                <Link to="/login" className="btn btn-secondary">Login</Link>
              </>
            ) : (
              <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
            )}
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Our Services</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏥</div>
            <h3>Multiple Departments</h3>
            <p>Access specialized care across various medical departments</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Easy Booking</h3>
            <p>Book appointments with just a few clicks</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚕️</div>
            <h3>Expert Doctors</h3>
            <p>Connect with qualified healthcare professionals</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚨</div>
            <h3>Triage System</h3>
            <p>Prioritize urgent medical cases efficiently</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>24/7 Access</h3>
            <p>Manage your health anytime from any device</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your health data is protected and confidential</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Take Control of Your Health?</h2>
        <p>Join thousands of patients who trust HealthLink for their healthcare needs</p>

      </section>

      <footer className="footer">
      <p>© 2025 HealthLink - Developed by Mathias Mwaro - Supporting SDG 3: Good Health and Well-being</p>
       </footer>

    </div>
  );
};

export default Landing;
