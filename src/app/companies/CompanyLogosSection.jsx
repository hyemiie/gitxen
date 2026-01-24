import React from 'react';
import './companies.css';

const CompanyLogosSection = () => {
  const companies = [
    {
      name: "TechFlow",
      logo: (
        <svg viewBox="0 0 120 40" className="company-logo">
          <rect x="10" y="10" width="20" height="20" rx="4" fill="#3B82F6"/>
          <rect x="35" y="15" width="15" height="10" rx="2" fill="#10B981"/>
          <text x="55" y="25" className="logo-text" fill="#1F2937">TechFlow</text>
        </svg>
      )
    },
    {
      name: "GlobalSync",
      logo: (
        <svg viewBox="0 0 120 40" className="company-logo">
          <circle cx="20" cy="20" r="12" fill="#8B5CF6" fillOpacity="0.2"/>
          <circle cx="20" cy="20" r="8" fill="#8B5CF6"/>
          <circle cx="20" cy="20" r="4" fill="#FFFFFF"/>
          <text x="40" y="25" className="logo-text" fill="#1F2937">GlobalSync</text>
        </svg>
      )
    },
    {
      name: "DataVerse",
      logo: (
        <svg viewBox="0 0 120 40" className="company-logo">
          <polygon points="15,10 25,10 30,20 25,30 15,30 10,20" fill="#F59E0B"/>
          <polygon points="20,15 25,18 23,25 18,25 16,18" fill="#FFFFFF"/>
          <text x="35" y="25" className="logo-text" fill="#1F2937">DataVerse</text>
        </svg>
      )
    },
    {
      name: "CloudPeak",
      logo: (
        <svg viewBox="0 0 120 40" className="company-logo">
          <path d="M12 25 C12 20, 16 15, 22 15 C24 12, 28 12, 30 15 C34 15, 38 18, 38 23 C38 28, 34 30, 30 30 L16 30 C12 30, 10 27, 12 25 Z" fill="#06B6D4"/>
          <text x="45" y="25" className="logo-text" fill="#1F2937">CloudPeak</text>
        </svg>
      )
    },
    {
      name: "NexusLab",
      logo: (
        <svg viewBox="0 0 120 40" className="company-logo">
          <rect x="12" y="12" width="16" height="16" rx="3" fill="#EF4444" transform="rotate(45 20 20)"/>
          <rect x="16" y="16" width="8" height="8" rx="2" fill="#FFFFFF" transform="rotate(45 20 20)"/>
          <text x="35" y="25" className="logo-text" fill="#1F2937">NexusLab</text>
        </svg>
      )
    },
    {
      name: "InnovateCorp",
      logo: (
        <svg viewBox="0 0 140 40" className="company-logo">
          <path d="M15 15 L25 10 L25 30 L15 25 Z" fill="#7C3AED"/>
          <path d="M15 15 L25 20 L15 25 Z" fill="#A855F7"/>
          <text x="30" y="25" className="logo-text" fill="#1F2937">InnovateCorp</text>
        </svg>
      )
    }
  ];

  return (
    <div className="company-section">
      <div className="container">
        <h2 className="section-title">
          Trusted by 100+ <span className="highlight">innovative</span> teams around the world
        </h2>
        
        <div className="trusted-by">
          <span className="trusted-text">Trusted by teams at</span>
        </div>
        
        <div className="company-logos">
          <div className="logos-track">
            {/* First set of logos */}
            {companies.map((company, index) => (
              <div key={`first-${index}`} className="logo-item">
                {company.logo}
              </div>
            ))}
            {companies.map((company, index) => (
              <div key={`second-${index}`} className="logo-item">
                {company.logo}
              </div>
            ))}
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default CompanyLogosSection;