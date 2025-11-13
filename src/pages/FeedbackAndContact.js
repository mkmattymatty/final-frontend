// frontend/src/pages/FeedbackAndContact.js
import React, { useState } from "react";
import api from "../api"; // uses your axios instance
import "./FeedbackAndContact.css";

const FeedbackAndContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/feedback", { name, email, message });
      if (response.data.success) {
        setSuccess("Thank you! Your feedback has been submitted.");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setError(response.data.message || "Failed to submit feedback.");
      }
    } catch (err) {
      console.error("Feedback submission error:", err);
      setError(err.response?.data?.message || "Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="feedback-contact-container">
      <section className="feedback-section">
        <h2>Share Your Feedback</h2>
        <p>Let us know your comments, complaints, or views of our services.</p>
        <form onSubmit={handleSubmit} className="feedback-form">
          {success && <div className="success-message">{success}</div>}
          {error && <div className="error-message">{error}</div>}
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Your Feedback"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>Email: <a href="mailto:mattymatty9372@gmail.com">mattymatty9372@gmail.com</a></p>
        <p>Facebook: <a href="https://www.facebook.com/maxizomk" target="_blank" rel="noopener noreferrer">maxizomk</a></p>
        <p>Instagram: <a href="https://www.instagram.com/rmeliosh" target="_blank" rel="noopener noreferrer">rmeliosh</a></p>
        <p>YouTube: <a href="https://www.youtube.com/@RahaTupu" target="_blank" rel="noopener noreferrer">RahaTupu</a></p>
      </section>
    </div>
  );
};

export default FeedbackAndContact;
