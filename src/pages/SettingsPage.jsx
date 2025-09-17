import React, { useState } from 'react';
import { FaMicrophone, FaCamera, FaComment, FaTimes, FaPaperPlane, FaStopCircle } from 'react-icons/fa';

const SettingsPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hello! How can I help you today?' }]);
  const [isListening, setIsListening] = useState(false);

  const startVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      console.log('Listening for voice input...');
    };

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setChatInput(speechToText);
      // Automatically send the message after a brief pause
      setTimeout(() => {
        handleSendMessage(speechToText);
      }, 500);
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log('Voice recognition ended.');
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
    
    if (isListening) {
        recognition.stop();
    } else {
        recognition.start();
    }
  };

  const handleSendMessage = (text = chatInput) => {
    if (text.trim() === '') return;
    const newMessages = [...messages, { sender: 'user', text: text }];
    setMessages(newMessages);
    setChatInput('');
  };

  const handleVoiceHelp = () => {
    setIsChatOpen(true);
    startVoiceRecognition();
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhotoFile(URL.createObjectURL(file));
      alert("Photo uploaded successfully! A support agent will review it.");
    }
  };

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
    },
    subtitle: {
      color: '#6B7280',
      marginBottom: '2rem',
    },
    card: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.75rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginBottom: '1.5rem',
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1F2937',
      marginBottom: '1rem',
      borderBottom: '1px solid #E5E7EB',
      paddingBottom: '0.75rem',
    },
    settingsGroup: {
      marginBottom: '1.5rem',
    },
    settingsLabel: {
      display: 'block',
      fontWeight: '500',
      marginBottom: '0.5rem',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #D1D5DB',
      borderRadius: '0.375rem',
    },
    button: {
      backgroundColor: '#22C55E',
      color: 'white',
      padding: '0.75rem 2rem',
      borderRadius: '0.375rem',
      border: 'none',
      cursor: 'pointer',
      marginTop: '1rem',
    },
    supportContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      textAlign: 'center',
    },
    supportOption: {
      padding: '1.5rem',
      borderRadius: '0.5rem',
      backgroundColor: '#F3F4F6',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'transform 0.2s',
    },
    supportOptionHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    supportIcon: {
      fontSize: '2.5rem',
      color: '#10B981',
      marginBottom: '0.5rem',
    },
    supportLabel: {
      fontWeight: '600',
      color: '#4B5563',
    },
    chatContainer: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '350px',
      height: '450px',
      boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
      borderRadius: '10px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      zIndex: '1000',
    },
    chatHeader: {
      backgroundColor: '#047857',
      color: 'white',
      padding: '1rem',
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    chatBody: {
      flexGrow: '1',
      backgroundColor: '#f9fafb',
      padding: '1rem',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    chatInput: {
      display: 'flex',
      padding: '1rem',
      borderTop: '1px solid #E5E7EB',
      backgroundColor: 'white',
      gap: '0.5rem',
      alignItems: 'center',
    },
    chatInputField: {
      flexGrow: '1',
      padding: '0.5rem',
      borderRadius: '5px',
      border: '1px solid #D1D5DB',
    },
    messageBubble: {
        padding: '0.75rem',
        borderRadius: '0.5rem',
        maxWidth: '80%',
    },
    botMessage: {
      backgroundColor: '#E5E7EB',
      color: '#1F2937',
      alignSelf: 'flex-start',
    },
    userMessage: {
      backgroundColor: '#22C55E',
      color: 'white',
      alignSelf: 'flex-end',
    },
    sendButton: {
      backgroundColor: '#10B981',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '0.5rem 1rem',
      cursor: 'pointer',
    },
    voiceButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: isListening ? '#EF4444' : '#10B981',
        cursor: 'pointer',
        padding: '0',
    }
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Settings</h1>
      <p style={styles.subtitle}>Manage your profile, account, and app preferences.</p>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Profile Information</h2>
        <div style={styles.settingsGroup}>
          <label style={styles.settingsLabel}>Farmer Name</label>
          <input type="text" style={styles.input} placeholder="Enter your name" />
        </div>
        <div style={styles.settingsGroup}>
          <label style={styles.settingsLabel}>Mobile Number</label>
          <input type="tel" style={styles.input} placeholder="+91" />
        </div>
        <button style={styles.button}>Save Profile</button>
      </div>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>App Preferences</h2>
        <div style={styles.settingsGroup}>
          <label style={styles.settingsLabel}>Notification Alerts</label>
          <select style={styles.input}>
            <option>On</option>
            <option>Off</option>
          </select>
        </div>
        <div style={styles.settingsGroup}>
          <label style={styles.settingsLabel}>Language</label>
          <select style={styles.input}>
            <option>English</option>
            <option>Hindi</option>
            <option>Telugu</option>
          </select>
        </div>
        <button style={styles.button}>Save Preferences</button>
      </div>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Feedback & Support</h2>
        <div style={styles.supportContainer}>
          <div style={styles.supportOption} onClick={handleVoiceHelp}>
            <FaMicrophone style={styles.supportIcon} />
            <span style={styles.supportLabel}>Voice Help</span>
          </div>

          <label htmlFor="photo-upload" style={styles.supportOption}>
            <FaCamera style={styles.supportIcon} />
            <span style={styles.supportLabel}>Photo Help</span>
            <input type="file" id="photo-upload" onChange={handlePhotoUpload} style={{ display: 'none' }} accept="image/*" />
          </label>
          {photoFile && <img src={photoFile} alt="uploaded" style={{ width: '100px', height: 'auto', borderRadius: '5px' }} />}

          <div style={styles.supportOption} onClick={() => setIsChatOpen(true)}>
            <FaComment style={styles.supportIcon} />
            <span style={styles.supportLabel}>Chat Support</span>
          </div>
        </div>
      </div>

      {isChatOpen && (
        <div style={styles.chatContainer}>
          <div style={styles.chatHeader}>
            <span>Chat Support</span>
            <FaTimes style={{ cursor: 'pointer' }} onClick={() => setIsChatOpen(false)} />
          </div>
          <div style={styles.chatBody}>
            {messages.map((msg, index) => (
                <p key={index} style={{
                    ...styles.messageBubble,
                    ... (msg.sender === 'user' ? styles.userMessage : styles.botMessage)
                }}>
                    {msg.text}
                </p>
            ))}
          </div>
          <div style={styles.chatInput}>
            <input 
                type="text" 
                placeholder="Type a message..." 
                style={styles.chatInputField} 
                value={chatInput} 
                onChange={(e) => setChatInput(e.target.value)}
            />
            <button onClick={() => handleSendMessage(chatInput)} style={styles.sendButton}>
                <FaPaperPlane />
            </button>
            <button onClick={startVoiceRecognition} style={styles.voiceButton}>
                {isListening ? <FaStopCircle /> : <FaMicrophone />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;