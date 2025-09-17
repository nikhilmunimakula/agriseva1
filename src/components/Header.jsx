import React from 'react';
import { Link } from 'react-router-dom';
import { FaTractor } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const { t, currentLanguage, setLanguage } = useLanguage();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <FaTractor className="text-3xl text-green-600" />
          <span>AgriSeva</span>
        </Link>
        <nav className="nav-menu">
          <Link to="/" className="nav-link">{t('home')}</Link>
          <Link to="/advisory" className="nav-link">{t('advisory')}</Link>
          <Link to="/crop-health" className="nav-link">{t('cropHealth')}</Link>
          <Link to="/weather" className="nav-link">{t('weather')}</Link>
          <Link to="/marketplace" className="nav-link">{t('marketplace')}</Link>
          <Link to="/settings" className="nav-link">{t('settings')}</Link>
        </nav>
        
        {/* Language Switcher */}
        <select value={currentLanguage} onChange={(e) => setLanguage(e.target.value)} className="language-switcher">
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="te">తెలుగు</option>
        </select>
        
        <Link to="/login" className="button">
          {t('farmerLogin')}
        </Link>
      </div>
    </header>
  );
};

export default Header;