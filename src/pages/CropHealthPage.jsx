import React, { useState, useEffect, useRef } from 'react';
import { FaCloudUploadAlt, FaSearch, FaFilter } from 'react-icons/fa';

const CropHealthPage = () => {
  const fileInputRef = useRef(null);
  const [historyData, setHistoryData] = useState([
    { id: 1, name: 'Tomato Plant', status: 'Diseased: Late Blight', date: 'May 20, 2024', image: 'https://via.placeholder.com/150/ff0000/FFFFFF?text=Tomato' },
    { id: 2, name: 'Corn Plant', status: 'Healthy', date: 'May 18, 2024', image: 'https://via.placeholder.com/150/008000/FFFFFF?text=Corn' },
    { id: 3, name: 'Wheat Plant', status: 'Pest-infested: Aphids', date: 'May 15, 2024', image: 'https://via.placeholder.com/150/FFA500/FFFFFF?text=Wheat' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      handleDetection(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleDetection = (file) => {
    setIsLoading(true);
    // Simulate an API call delay
    setTimeout(() => {
      const isDiseased = Math.random() > 0.5;
      const newEntry = {
        id: historyData.length + 1,
        name: file.name,
        status: isDiseased ? 'Diseased: New Disease' : 'Healthy',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        image: URL.createObjectURL(file),
      };
      setHistoryData(prevData => [newEntry, ...prevData]);
      setIsLoading(false);
    }, 2000);
  };

  const filteredData = historyData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.status.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

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
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '2rem',
    },
    uploadCard: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.75rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
    },
    historyCard: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.75rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1F2937',
      marginBottom: '1rem',
    },
    uploadArea: {
      border: isLoading ? '2px dashed #3B82F6' : '2px dashed #D1D5DB',
      borderRadius: '0.5rem',
      padding: '3rem',
      textAlign: 'center',
      cursor: isLoading ? 'not-allowed' : 'pointer',
      transition: 'border-color 0.3s ease-in-out',
    },
    uploadAreaHover: {
      borderColor: '#9CA3AF',
    },
    uploadText: {
      color: '#6B7280',
      marginTop: '1rem',
    },
    selectButton: {
      backgroundColor: isLoading ? '#9CA3AF' : '#22C55E',
      color: 'white',
      padding: '0.75rem 2rem',
      borderRadius: '0.25rem',
      border: 'none',
      cursor: isLoading ? 'not-allowed' : 'pointer',
      marginTop: '1.5rem',
    },
    searchContainer: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '1rem',
    },
    searchInput: {
      flexGrow: '1',
      padding: '0.5rem 1rem',
      border: '1px solid #D1D5DB',
      borderRadius: '0.25rem',
    },
    historyList: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    historyItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '0.5rem',
      borderRadius: '0.5rem',
      transition: 'background-color 0.3s',
      cursor: 'pointer',
    },
    historyItemHover: {
      backgroundColor: '#F9FAFB',
    },
    itemImage: {
      width: '50px',
      height: '50px',
      borderRadius: '0.25rem',
      objectFit: 'cover',
    },
    itemDetails: {
      flexGrow: '1',
      textAlign: 'left',
    },
    itemStatusHealthy: {
      color: '#22C55E',
      fontWeight: '600',
    },
    itemStatusDiseased: {
      color: '#EF4444',
      fontWeight: '600',
    },
    itemDate: {
      fontSize: '0.75rem',
      color: '#9CA3AF',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Crop Health Analysis</h1>
      <p style={styles.subtitle}>
        Upload images of your crops to detect pests and diseases. Our system will analyze the images and provide recommendations.
      </p>

      <div style={styles.mainGrid}>
        <div style={styles.uploadCard}>
          <h2 style={styles.cardTitle}>Upload Crop Images</h2>
          <p style={{ color: '#6B7280' }}>
            Please upload clear images of the affected crop area.
          </p>
          <div style={styles.uploadArea}>
            {isLoading ? (
              <p style={styles.uploadText}>Analyzing...</p>
            ) : selectedImage ? (
              <div>
                <img src={selectedImage} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                <p style={styles.uploadText}>Image is ready for analysis.</p>
              </div>
            ) : (
              <div onClick={handleButtonClick}>
                <FaCloudUploadAlt style={{ fontSize: '3rem', color: '#9CA3AF' }} />
                <p style={styles.uploadText}>
                  Drag and drop images here<br />or click to browse
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  accept="image/*"
                />
                <button style={styles.selectButton}>Select Files</button>
              </div>
            )}
          </div>
        </div>

        <div style={styles.historyCard}>
          <h2 style={styles.cardTitle}>Detection History</h2>
          <div style={styles.searchContainer}>
            <FaSearch style={{ color: '#9CA3AF', position: 'relative', top: '0.5rem' }} />
            <input 
              type="text" 
              placeholder="Search by crop or pest" 
              style={styles.searchInput} 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <FaFilter style={{ color: '#9CA3AF', position: 'relative', top: '0.5rem' }} />
          </div>

          <ul style={styles.historyList}>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <li key={item.id} style={styles.historyItem}>
                  <img src={item.image} alt={item.name} style={styles.itemImage} />
                  <div style={styles.itemDetails}>
                    <p style={{ fontWeight: '600', color: '#1F2937', margin: '0' }}>{item.name}</p>
                    <p style={{ margin: '0' }}>
                      <span style={item.status.includes('Healthy') ? styles.itemStatusHealthy : styles.itemStatusDiseased}>
                        {item.status}
                      </span>
                    </p>
                    <p style={styles.itemDate}>{item.date}</p>
                  </div>
                </li>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#6B7280' }}>No results found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CropHealthPage;