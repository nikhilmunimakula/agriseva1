import React, { useState } from 'react';
import { FaCloudUploadAlt, FaTimesCircle } from 'react-icons/fa';

const AddFarmForm = () => {
  const [formData, setFormData] = useState({
    farmName: '',
    farmAddress: '',
    farmSize: '',
    cropsCultivated: '',
  });
  const [farmPhotos, setFarmPhotos] = useState([]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFarmPhotos(prev => [...prev, ...files]);
  };
  const handleRemovePhoto = (index) => {
    setFarmPhotos(prev => prev.filter((_, i) => i !== index));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving farm details:", formData);
    console.log("Photos:", farmPhotos);
    alert('Farm details saved!');
  };

  const cropOptions = [
    'Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 'Soybean', 'Groundnut', 'Jute', 'Tea', 'Coffee'
  ];

  const styles = {
    card: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.75rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      backgroundsize: 'cover',
      backgroundposition: 'center',
      maxWidth: '10000px',
      margin: '2rem auto',
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
    formGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2.5rem',
    },
    inputGroup: {
      marginBottom: '1rem',
    },
    label: {
      display: 'block',
      fontSize: '1rem',
      fontWeight: '600',
      color: '#1F2937',
      marginBottom: '0.5rem',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #D1D5DB',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      outline: 'none',
      boxSizing: 'border-box',
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #D1D5DB',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      outline: 'none',
      boxSizing: 'border-box',
    },
    photoUploadContainer: {
      border: '2px dashed #D1D5DB',
      borderRadius: '0.5rem',
      padding: '2rem',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'border-color 0.3s ease-in-out',
    },
    photoUploadText: {
      color: '#6B7280',
      marginTop: '0.5rem',
    },
    photoPreviewContainer: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1.5rem',
    },
    photoPreview: {
      position: 'relative',
      width: '100px',
      height: '100px',
      border: '1px solid #D1D5DB',
      borderRadius: '0.5rem',
      backgroundColor: '#F3F4F6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    removePhotoBtn: {
      position: 'absolute',
      top: '0.25rem',
      right: '0.25rem',
      cursor: 'pointer',
      color: '#EF4444',
      backgroundColor: 'white',
      borderRadius: '50%',
      border: '2px solid #D1D5DB',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '2rem',
    },
    saveButton: {
      backgroundColor: '#22C55E',
      color: 'white',
      fontWeight: '600',
      padding: '0.75rem 2rem',
      borderRadius: '0.375rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease-in-out',
    },
  };

  return (
    <div style={styles.card}>
      <h1 style={styles.title}>Add Farm Details</h1>
      <p style={styles.subtitle}>Fill in the details below to add your farm to the system.</p>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGrid}>
          <div>
            <div style={styles.inputGroup}>
              <label htmlFor="farmName" style={styles.label}>Farm Name</label>
              <input type="text" id="farmName" name="farmName" style={styles.input} placeholder="E.g., Sunrise Meadows" value={formData.farmName} onChange={handleChange} required />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="farmAddress" style={styles.label}>Farm Address</label>
              <input type="text" id="farmAddress" name="farmAddress" style={styles.input} placeholder="Enter full address" value={formData.farmAddress} onChange={handleChange} required />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="farmSize" style={styles.label}>Farm Size (in acres)</label>
              <input type="number" id="farmSize" name="farmSize" style={styles.input} placeholder="E.g., 12.5" value={formData.farmSize} onChange={handleChange} required />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="cropsCultivated" style={styles.label}>Crops Cultivated</label>
              <select id="cropsCultivated" name="cropsCultivated" style={styles.select} value={formData.cropsCultivated} onChange={handleChange} required>
                <option value="" disabled>Select crop type</option>
                {cropOptions.map((crop, index) => (<option key={index} value={crop}>{crop}</option>))}
              </select>
            </div>
          </div>
          <div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Farm Photos</label>
              <div style={styles.photoUploadContainer}>
                <input type="file" multiple onChange={handlePhotoUpload} style={{ display: 'none' }} id="photo-upload" accept="image/*" />
                <label htmlFor="photo-upload" style={{ cursor: 'pointer' }}>
                  <FaCloudUploadAlt style={{ fontSize: '3rem', color: '#9CA3AF' }} />
                  <p style={styles.photoUploadText}>Click to upload or drag and drop</p>
                </label>
              </div>
            </div>
            <div style={styles.photoPreviewContainer}>
                {farmPhotos.length > 0 ? (
                    farmPhotos.map((photo, index) => (
                        <div key={index} style={{ ...styles.photoPreview, backgroundImage: `url(${URL.createObjectURL(photo)})` }}>
                            <FaTimesCircle onClick={() => handleRemovePhoto(index)} style={styles.removePhotoBtn} />
                        </div>
                    ))
                ) : (
                    <>
                        <div style={styles.photoPreview}></div>
                        <div style={styles.photoPreview}></div>
                    </>
                )}
            </div>
          </div>
        </div>
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.saveButton}>
            Save Farm Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFarmForm;