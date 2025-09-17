import React, { useState } from 'react';

const LoginPage = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Sending OTP to:", mobileNumber);
    
    // Simulating a successful request
    setTimeout(() => {
      setShowOtpInput(true);
    }, 1000);
  };

  const handleOtpSubmit = (event) => {
    event.preventDefault();
    console.log("Verifying OTP:", otp);
    alert("OTP submitted! Logging you in...");
  };

  const styles = {
    pageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      padding: '1rem',
      boxSizing: 'border-box'
    },
    card: {
      backgroundColor: 'white',
      padding: '3rem',
      borderRadius: '1rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      maxWidth: '450px',
      width: '100%',
    },
    title: {
      fontSize: '2.25rem',
      fontWeight: '700',
      color: '#047857',
      marginBottom: '0.5rem',
    },
    subtitle: {
      color: '#374151',
      marginBottom: '2rem',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    inputGroup: {
      textAlign: 'left',
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#4B5563',
      marginBottom: '0.25rem',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #D1D5DB',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      outline: 'none',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      marginTop: '1rem',
      backgroundColor: '#10B981',
      color: 'white',
      fontWeight: '600',
      padding: '0.75rem 1.5rem',
      borderRadius: '9999px',
      border: 'none',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h1 style={styles.title}>Farmer Login</h1>
        <p style={styles.subtitle}>
          Please enter your mobile number to get a one-time password (OTP).
        </p>

        {!showOtpInput ? (
          <form style={styles.form} onSubmit={handleLogin}>
            <div style={styles.inputGroup}>
              <label htmlFor="mobile" style={styles.label}>Mobile Number</label>
              <input
                type="tel"
                id="mobile"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                style={styles.input}
                placeholder="e.g., +91 9876543210"
                required
              />
            </div>
            <button type="submit" style={styles.button}>
              Get OTP
            </button>
          </form>
        ) : (
          <form style={styles.form} onSubmit={handleOtpSubmit}>
            <div style={styles.inputGroup}>
              <label htmlFor="otp" style={styles.label}>Enter OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={styles.input}
                placeholder="e.g., 123456"
                required
              />
            </div>
            <button type="submit" style={styles.button}>
              Verify & Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;