import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AddFarmForm from '../components/AddFarmForm';

const HomePage = () => {
  const featuresRef = useRef(null);

  // States for each card's hover effect
  const [isPestHovered, setIsPestHovered] = useState(false);
  const [isFertilizerHovered, setIsFertilizerHovered] = useState(false);
  const [isWeatherHovered, setIsWeatherHovered] = useState(false);

  const scrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const styles = {
    heroSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '19rem 0',
      backgroundImage:"url('/wallpaper.png')",
      backgroundSize: 'cover',
      backgroundColor: 'white',
      borderRadius: '1rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      marginBottom: '3rem',
    },
    heroTitle: {
      fontSize: '3rem',
      fontWeight: '800',
      color: 'white',
      lineHeight: '1.25',
    },
    heroSubtitle: {
      marginTop: '1rem',
      fontSize: '1.25rem',
      color: 'white',
      maxWidth: '50rem',
    },
    heroButton: {
      marginTop: '2rem',
      backgroundColor: '#10B981',
      color: 'white',
      fontWeight: '600',
      padding: '0.75rem 1.5rem',
      borderRadius: '9999px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
    },
    featureGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
    },
    card: (isHovered) => ({
      background: 'white',
      padding: '2rem',
      borderRadius: '0.75rem',
      boxShadow: isHovered ? '0 10px 15px rgba(0, 0, 0, 0.1)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
      transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
      textDecoration: 'none',
      color: 'inherit',
    }),
    featureCard: {
      padding: '2rem',
      borderLeft: '4px solid #10B981',
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#10B981',
      marginBottom: '1rem',
    },
    cardText: {
      color: '#6B7280',
    },
  };

  return (
    <>
      <div style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Your Smart Crop Advisory System</h1>
        <p style={styles.heroSubtitle}>
          Empowering small and marginal farmers with AI-driven insights to boost productivity and income.
        </p>
        <button onClick={scrollToFeatures} style={styles.heroButton}>
          Explore Our Features
        </button>
      </div>

      <AddFarmForm />

      <div ref={featuresRef} style={styles.featureGrid}>
        {/* Pest & Disease Detection Card */}
        <Link 
          to="/crop-health" 
          style={{ ...styles.card(isPestHovered), ...styles.featureCard }}
          onMouseEnter={() => setIsPestHovered(true)} 
          onMouseLeave={() => setIsPestHovered(false)}
        >
          <h2 style={styles.cardTitle}>Pest & Disease Detection</h2>
          <p style={styles.cardText}>
            Upload an image of your crop to get an instant diagnosis and expert advice on treatment.
          </p>
        </Link>
        
        {/* Fertilizer Recommendation Card */}
        <div 
          style={{ ...styles.card(isFertilizerHovered), ...styles.featureCard }}
          onMouseEnter={() => setIsFertilizerHovered(true)} 
          onMouseLeave={() => setIsFertilizerHovered(false)}
        >
          <h2 style={styles.cardTitle}>Fertilizer Recommendation</h2>
          <p style={styles.cardText}>
            Get personalized fertilizer recommendations based on your soil type and specific crop needs.
          </p>
        </div>
        
        {/* Weather & Advisory Card */}
        <Link 
          to="/weather" 
          style={{ ...styles.card(isWeatherHovered), ...styles.featureCard }}
          onMouseEnter={() => setIsWeatherHovered(true)} 
          onMouseLeave={() => setIsWeatherHovered(false)}
        >
          <h2 style={styles.cardTitle}>Weather & Advisory</h2>
          <p style={styles.cardText}>
            Receive real-time weather forecasts and timely crop advisories to plan your farming activities.
          </p>
        </Link>
      </div>
    </>
  );
};


export default HomePage;
