import React from 'react';
import './Locations.css';

const Locations = () => {
  const locations = [
    {
      name: '45 Vipingo Ridge',
      city: 'Kilifi',
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.XXXXX!2d39.XXXXX!3d-3.XXXXX!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1XXXXX!2sVipingo%20Ridge!5e0!3m2!1sen!2ske!4v1700000000000"
    },
    {
      name: '80108 Ocean-Bay',
      city: 'Kilifi',
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.XXXXX!2d39.XXXXX!3d-3.XXXXX!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1XXXXX!2sOcean%20Bay!5e0!3m2!1sen!2ske!4v1700000000000"
    },
    {
      name: 'Mwembe Tayari Mall Plaza',
      city: 'Mombasa',
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.XXXXX!2d39.XXXXX!3d-4.XXXXX!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1XXXXX!2sMwembe%20Tayari%20Mall!5e0!3m2!1sen!2ske!4v1700000000000"
    }
  ];

  return (
    <div className="locations-section">
      <h2>Our Locations</h2>
      <div className="locations-grid">
        {locations.map((loc, index) => (
          <div key={index} className="location-card">
            <h3>{loc.name}</h3>
            <p>{loc.city}</p>
            <iframe
              src={loc.mapSrc}
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${loc.name} map`}
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
