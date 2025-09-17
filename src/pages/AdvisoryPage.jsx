import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdvisoryPage = () => {
  // States for each card's hover effect
  const [isChatHovered, setIsChatHovered] = useState(false);
  const [isUploadHovered, setIsUploadHovered] = useState(false);
  const [isGuideHovered, setIsGuideHovered] = useState(false);
  const [isChatBtnHovered, setIsChatBtnHovered] = useState(false);
  const [isUploadBtnHovered, setIsUploadBtnHovered] = useState(false);
  const [isGuideBtnHovered, setIsGuideBtnHovered] = useState(false);

  const styles = {
    pageContainer: {
      padding: '2rem 0',
      maxWidth: '1280px',
      margin: '0 auto',
    },
    title: {
      fontSize: '2.25rem',
      fontWeight: '700',
      color: '#1F2937',
      marginBottom: '0.5rem',
      textAlign: 'center',
    },
    subtitle: {
      color: '#6B7280',
      marginBottom: '2rem',
      textAlign: 'center',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      padding: '0 1.5rem',
    },
    card: (isHovered) => ({
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.75rem',
      boxShadow: isHovered ? '0 10px 15px rgba(0, 0, 0, 0.1)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
      transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
    }),
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#10B981',
      marginBottom: '1rem',
    },
    cardText: {
      color: '#6B7280',
      marginBottom: '1.5rem',
    },
    button: (isHovered) => ({
      backgroundColor: isHovered ? '#047857' : '#22C55E',
      color: 'white',
      padding: '0.75rem 2rem',
      borderRadius: '9999px',
      border: 'none',
      cursor: 'pointer',
      marginTop: 'auto',
      alignSelf: 'flex-start',
      textDecoration: 'none',
      textAlign: 'center',
      transition: 'background-color 0.3s ease-in-out',
    }),
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>AI-Powered Crop Advisory</h1>
      <p style={styles.subtitle}>
        Get expert advice on crops, pests, and fertilizers instantly through our intelligent system.
      </p>

      <div style={styles.grid}>
        {/* Real-time Chat Card */}
        <div 
          style={styles.card(isChatHovered)} 
          onMouseEnter={() => setIsChatHovered(true)} 
          onMouseLeave={() => setIsChatHovered(false)}
        >
          <h2 style={styles.cardTitle}>Real-time Chat</h2>
          <p style={styles.cardText}>
            Talk to our AI-powered chatbot in your local language for instant advice on your farm.
          </p>
          <button 
            style={styles.button(isChatBtnHovered)}
            onMouseEnter={() => setIsChatBtnHovered(true)}
            onMouseLeave={() => setIsChatBtnHovered(false)}
          >
            Start Chat
          </button>
        </div>
        
        {/* Upload for Diagnosis Card */}
        <div
          style={styles.card(isUploadHovered)} 
          onMouseEnter={() => setIsUploadHovered(true)} 
          onMouseLeave={() => setIsUploadHovered(false)}
        >
          <h2 style={styles.cardTitle}>Upload for Diagnosis</h2>
          <p style={styles.cardText}>
            Upload an image of a pest or disease-affected crop for an accurate diagnosis and recommended treatment.
          </p>
          <Link 
            to="/crop-health" 
            style={styles.button(isUploadBtnHovered)}
            onMouseEnter={() => setIsUploadBtnHovered(true)}
            onMouseLeave={() => setIsUploadBtnHovered(false)}
          >
            Upload Image
          </Link>
        </div>
        
        {/* Fertilizer Guide Card */}
        <div 
          style={styles.card(isGuideHovered)} 
          onMouseEnter={() => setIsGuideHovered(true)} 
          onMouseLeave={() => setIsGuideHovered(false)}
        >
          <h2 style={styles.cardTitle}>Fertilizer Guide</h2>
          <p style={styles.cardText}>
            Based on your soil data, get a personalized plan for when and what to apply for best results.
          </p>
          <button 
            style={styles.button(isGuideBtnHovered)}
            onMouseEnter={() => setIsGuideBtnHovered(true)}
            onMouseLeave={() => setIsGuideBtnHovered(false)}
          >
            Get My Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvisoryPage;