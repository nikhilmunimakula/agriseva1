import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const WeatherAlerts = () => {
  const [alert, setAlert] = useState(null);

  const mockAlerts = [
    { type: 'Heavy Rainfall Warning', details: 'Heavy rainfall is expected in your area. Avoid field work.', severity: 'Severe', color: '#EF4444' },
    { type: 'High Temperature Warning', details: 'A heatwave is forecasted. Ensure your crops are well-irrigated.', severity: 'Moderate', color: '#F59E0B' },
    { type: 'Strong Winds Alert', details: 'Secure crops that are prone to wind damage.', severity: 'Minor', color: '#3B82F6' },
    null 
  ];

  const checkForAlert = () => {
    const randomAlert = mockAlerts[Math.floor(Math.random() * mockAlerts.length)];
    setAlert(randomAlert);
  };

  useEffect(() => {
    checkForAlert();
    const interval = setInterval(checkForAlert, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setAlert(null);
  };

  if (!alert) {
    return null;
  }

  const styles = {
    container: {
      position: 'fixed',
      // The old styling was: top: '20px', left: '50%', transform: 'translateX(-50%)',
      bottom: '20px',
      left: '20px',
      zIndex: '1000',
      width: '90%',
      maxWidth: '500px',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      padding: '1rem',
      borderLeft: `5px solid ${alert.color}`,
      transition: 'bottom 0.5s ease-in-out',
    },
    icon: {
      fontSize: '1.5rem',
      marginRight: '1rem',
    },
    content: {
      flexGrow: '1',
    },
    header: {
      fontWeight: 'bold',
      marginBottom: '0.25rem',
      color: '#1F2937',
    },
    details: {
      fontSize: '0.875rem',
      color: '#6B7280',
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      marginLeft: 'auto',
      color: '#6B7280',
    }
  };

  return (
    <div style={styles.container}>
      <FaExclamationTriangle style={{ ...styles.icon, color: alert.color }} />
      <div style={styles.content}>
        <div style={styles.header}>Alert: {alert.type}</div>
        <div style={styles.details}>{alert.details}</div>
      </div>
      <button onClick={handleClose} style={styles.closeButton}>
        <FaTimes />
      </button>
    </div>
  );
};

export default WeatherAlerts;