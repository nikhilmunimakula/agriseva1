import React, { useState, useEffect } from 'react';
import { FaSyncAlt, FaArrowUp, FaStar } from 'react-icons/fa';

const MarketplacePage = () => {
  const [marketData, setMarketData] = useState([]);
  const [trendingCrops, setTrendingCrops] = useState([]);

  // Mock data for crops and their prices in a relatable unit (quintal for now, converted later)
  const getMockData = () => {
    const mockData = [
      { name: 'Rice (Basmati)', priceQuintal: (Math.random() * (4500 - 3500) + 3500).toFixed(2), market: 'Hyderabad' },
      { name: 'Rice (Basmati)', priceQuintal: (Math.random() * (4500 - 3500) + 3500).toFixed(2), market: 'Delhi' },
      { name: 'Maize', priceQuintal: (Math.random() * (2500 - 1800) + 1800).toFixed(2), market: 'Hyderabad' },
      { name: 'Maize', priceQuintal: (Math.random() * (2500 - 1800) + 1800).toFixed(2), market: 'Chennai' },
      { name: 'Soybean', priceQuintal: (Math.random() * (3500 - 2800) + 2800).toFixed(2), market: 'Hyderabad' },
      { name: 'Soybean', priceQuintal: (Math.random() * (3500 - 2800) + 2800).toFixed(2), market: 'Mumbai' },
      { name: 'Cotton', priceQuintal: (Math.random() * (6000 - 5000) + 5000).toFixed(2), market: 'Hyderabad' },
      { name: 'Cotton', priceQuintal: (Math.random() * (6000 - 5000) + 5000).toFixed(2), market: 'Ahmedabad' },
      { name: 'Turmeric', priceQuintal: (Math.random() * (7500 - 6500) + 6500).toFixed(2), market: 'Hyderabad' },
      { name: 'Turmeric', priceQuintal: (Math.random() * (7500 - 6500) + 6500).toFixed(2), market: 'Nizamabad' },
      { name: 'Potatoes', priceQuintal: (Math.random() * (2200 - 1800) + 1800).toFixed(2), market: 'Hyderabad' },
      { name: 'Potatoes', priceQuintal: (Math.random() * (2200 - 1800) + 1800).toFixed(2), market: 'Agra' },
    ];
    
    const newPrices = mockData.map(item => ({
      ...item,
      updated: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
      pricePerKg: (item.priceQuintal / 100).toFixed(2)
    }));
    setMarketData(newPrices);
    
    // Simulate trending crops from all data
    const trending = newPrices
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
    setTrendingCrops(trending);
  };

  useEffect(() => {
    getMockData();
    const interval = setInterval(getMockData, 15000);
    return () => clearInterval(interval);
  }, []); // The empty dependency array ensures this runs only once on mount

  const styles = {
    pageContainer: {
      padding: '2rem 0',
    },
    title: {
      fontSize: '2.25rem',
      fontWeight: '700',
      color: '#1F2937',
      marginBottom: '0.5rem',
    },
    subtitle: {
      color: '#6B7280',
      marginBottom: '2rem',
    },
    trendingSection: {
      backgroundColor: '#D1FAE5',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      marginBottom: '2rem',
      border: '2px solid #34D399',
    },
    trendingTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#065F46',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1rem',
    },
    trendingGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
    },
    trendingItem: {
      backgroundColor: 'white',
      padding: '1rem',
      borderRadius: '0.25rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
    },
    trendingName: {
      fontWeight: 'bold',
      color: '#10B981',
      fontSize: '1rem',
    },
    trendingPrice: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#047857',
    },
    updateInfo: {
      fontSize: '0.9rem',
      color: '#6B7280',
      textAlign: 'right',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '0.5rem',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    tableHead: {
      backgroundColor: '#F3F4F6',
      fontWeight: '600',
      color: '#4B5563',
      textAlign: 'left',
    },
    tableHeaderCell: {
      padding: '1rem',
    },
    tableBodyRow: {
      borderBottom: '1px solid #E5E7EB',
      transition: 'background-color 0.3s',
    },
    tableBodyRowHover: {
      backgroundColor: '#F9FAFB',
    },
    tableDataCell: {
      padding: '1rem',
    },
    priceTag: {
      backgroundColor: '#D1FAE5',
      color: '#065F46',
      padding: '0.5rem 1rem',
      borderRadius: '9999px',
      fontWeight: 'bold',
      display: 'inline-block',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Live Market Prices</h1>
      <p style={styles.subtitle}>
        Get real-time market prices for various crops from all over India to help you make informed selling decisions.
      </p>

      <div style={styles.trendingSection}>
        <div style={styles.trendingTitle}>
          <FaArrowUp color="#22C55E" /> What's Trending in India
        </div>
        <div style={styles.trendingGrid}>
          {trendingCrops.length > 0 ? trendingCrops.map(item => (
            <div key={item.id} style={styles.trendingItem}>
              <FaStar color="#F59E0B" />
              <div style={styles.trendingName}>{item.name}</div>
              <div style={styles.trendingPrice}>₹ {item.pricePerKg}</div>
            </div>
          )) : (
            <p style={{ textAlign: 'center', color: '#065F46', width: '100%' }}>No trending crops right now.</p>
          )}
        </div>
      </div>

      <div style={styles.updateInfo}>
        <FaSyncAlt />
        Last updated: {marketData.length > 0 ? marketData[0].updated : 'N/A'}
      </div>

      <table style={styles.table}>
        <thead style={styles.tableHead}>
          <tr>
            <th style={styles.tableHeaderCell}>Crop</th>
            <th style={styles.tableHeaderCell}>Price per Kg (INR)</th>
            <th style={styles.tableHeaderCell}>Market</th>
          </tr>
        </thead>
        <tbody>
          {marketData.length > 0 ? marketData.map((item, index) => (
            <tr key={index} style={styles.tableBodyRow}>
              <td style={styles.tableDataCell}>{item.name}</td>
              <td style={styles.tableDataCell}>
                <span style={styles.priceTag}>₹ {item.pricePerKg}</span>
              </td>
              <td style={styles.tableDataCell}>{item.market}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>
                No prices available right now.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MarketplacePage;