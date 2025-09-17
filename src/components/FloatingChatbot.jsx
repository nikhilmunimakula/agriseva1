import React, { useState } from 'react';
import { BsChatDots } from 'react-icons/bs';
import { FaMicrophone, FaPaperPlane, FaStopCircle } from 'react-icons/fa';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hello! I can provide advice on crops, pests, and more. How can I help you today?' }]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN'; // Set language to Indian English
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      console.log('Listening for voice input...');
    };

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setInput(speechToText);
      handleSendMessage(); // Automatically send the transcribed message
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

  const styles = {
    container: {
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: '50',
    },
    chatWindow: {
      width: '20rem',
      height: '24rem',
      backgroundColor: 'white',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      borderRadius: '0.5rem',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    chatHeader: {
      backgroundColor: '#047857',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    chatBody: {
      flexGrow: '1',
      padding: '1rem',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    chatInputArea: {
      padding: '1rem',
      borderTop: '1px solid #E5E7EB',
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
    },
    chatInputField: {
      flexGrow: '1',
      padding: '0.5rem 1rem',
      border: '1px solid #D1D5DB',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      outline: 'none',
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
      borderRadius: '9999px',
      padding: '0.5rem',
      cursor: 'pointer',
    },
    voiceButton: {
      backgroundColor: '#F3F4F6',
      color: isListening ? '#EF4444' : '#10B981',
      border: 'none',
      borderRadius: '9999px',
      padding: '0.5rem',
      cursor: 'pointer',
      transition: 'color 0.3s',
    },
  };

  return (
    <div style={styles.container}>
      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.chatHeader}>
            <span>Crop AI Assistant</span>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6L6 18M6 6L18 18"/></svg>
            </button>
          </div>
          <div style={styles.chatBody}>
            {messages.map((msg, index) => (
              <div key={index} style={{ ...styles.messageBubble, ... (msg.sender === 'user' ? styles.userMessage : styles.botMessage) }}>
                {msg.text}
              </div>
            ))}
          </div>
          <div style={styles.chatInputArea}>
            <input 
              type="text" 
              placeholder="Type your message..." 
              style={styles.chatInputField}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <button onClick={handleSendMessage} style={styles.sendButton}>
              <FaPaperPlane />
            </button>
            <button onClick={handleVoiceInput} style={styles.voiceButton}>
              {isListening ? <FaStopCircle /> : <FaMicrophone />}
            </button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} style={{ backgroundColor: '#10B981', color: 'white', padding: '1rem', borderRadius: '9999px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
        <BsChatDots size={24} />
      </button>
    </div>
  );
};

export default FloatingChatbot;