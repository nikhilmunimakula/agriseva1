import React, { useState, useEffect } from 'react';
import { FaCloud, FaWind, FaTint, FaExclamationTriangle } from 'react-icons/fa';

const WeatherPage = () => {
  const [currentWeather, setCurrentWeather] = useState({
    location: 'Hyderabad, Telangana',
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    rainfall: 0.5,
  });

  const [alerts, setAlerts] = useState([]);

  // Mock function to simulate fetching weather data and alerts
  const getWeatherData = () => {
    // Generate a random chance for an alert
    const hasAlert = Math.random() > 0.6;
    if (hasAlert) {
      const alertTypes = [
        { type: 'Heavy Rainfall Alert', severity: 'Severe', color: '#EF4444' },
        { type: 'Heat Wave Warning', severity: 'Moderate', color: '#F59E0B' },
        { type: 'Strong Winds', severity: 'Minor', color: '#3B82F6' },
      ];
      const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      setAlerts([
        {
          id: 1,
          type: randomAlert.type,
          severity: randomAlert.severity,
          details: `Farmers are advised to take precautions due to the forecast of ${randomAlert.type.toLowerCase()}.`,
          color: randomAlert.color,
        },
      ]);
    } else {
      setAlerts([]);
    }
  };

  useEffect(() => {
    getWeatherData();
    const interval = setInterval(getWeatherData, 30000); // Check for new alerts every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const styles = {
    pageContainer: {
      padding: '2rem 0',
      maxWidth: '800px',
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
    weatherCard: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.75rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      marginBottom: '2rem',
    },
    currentInfo: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    tempContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem',
    },
    tempIcon: {
      fontSize: '4rem',
      color: '#9CA3AF',
    },
    tempValue: {
      fontSize: '4rem',
      fontWeight: '700',
      color: '#10B981',
    },
    condition: {
      fontSize: '1.5rem',
      fontWeight: '500',
      color: '#4B5563',
      marginBottom: '2rem',
    },
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1rem',
    },
    detailItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
    },
    detailValue: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#1F2937',
    },
    detailLabel: {
      fontSize: '0.875rem',
      color: '#6B7280',
    },
    alertsSection: {
      marginBottom: '2rem',
    },
    alertsTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1F2937',
      marginBottom: '1rem',
    },
    alertCard: {
      padding: '1rem',
      borderRadius: '0.5rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      borderLeft: '4px solid',
    },
    alertIcon: {
      fontSize: '1.5rem',
    },
    alertContent: {
      flexGrow: '1',
    },
    alertHeader: {
      fontWeight: 'bold',
      marginBottom: '0.25rem',
    },
    alertDetails: {
      fontSize: '0.875rem',
      color: '#4B5563',
    }
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Weather</h1>
      <p style={styles.subtitle}>
        Real-time weather data and agricultural alerts for your location.
      </p>

      {/* Weather Card */}
      <div style={styles.weatherCard}>
        <div style={styles.currentInfo}>
          <p style={{ fontWeight: 'bold', color: '#4B5563', marginBottom: '0.5rem' }}>
            Current Weather in {currentWeather.location}
          </p>
          <div style={styles.tempContainer}>
            <FaCloud style={styles.tempIcon} />
            <span style={styles.tempValue}>{currentWeather.temperature}°C</span>
          </div>
          <p style={styles.condition}>{currentWeather.condition}</p>
        </div>

        <div style={styles.detailsGrid}>
          <div style={styles.detailItem}>
            <FaTint style={{ color: '#3B82F6' }} />
            <div style={styles.detailValue}>{currentWeather.humidity}%</div>
            <div style={styles.detailLabel}>Humidity</div>
          </div>
          <div style={styles.detailItem}>
            <FaWind style={{ color: '#6B7280' }} />
            <div style={styles.detailValue}>{currentWeather.windSpeed} km/h</div>
            <div style={styles.detailLabel}>Wind Speed</div>
          </div>
          <div style={styles.detailItem}>
            <FaTint style={{ color: '#22C55E' }} />
            <div style={styles.detailValue}>{currentWeather.rainfall} mm</div>
            <div style={styles.detailLabel}>Rainfall</div>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div style={styles.alertsSection}>
        <h2 style={styles.alertsTitle}>Weather Alerts</h2>
        {alerts.length > 0 ? (
          alerts.map(alert => (
            <div key={alert.id} style={{ ...styles.alertCard, borderLeftColor: alert.color }}>
              <FaExclamationTriangle style={{ ...styles.alertIcon, color: alert.color }} />
              <div style={styles.alertContent}>
                <div style={{ ...styles.alertHeader, color: alert.color }}>{alert.severity} Alert: {alert.type}</div>
                <div style={styles.alertDetails}>{alert.details}</div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', textAlign: 'center', color: '#6B7280' }}>
            No current weather alerts for your location.
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;