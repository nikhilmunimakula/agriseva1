import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import FloatingChatbot from './components/FloatingChatbot';
import './index.css';

import HomePage from './pages/HomePage';
import AdvisoryPage from './pages/AdvisoryPage';
import WeatherPage from './pages/WeatherPage';
import LoginPage from './pages/LoginPage';
import CropHealthPage from './pages/CropHealthPage';
import MarketplacePage from './pages/MarketplacePage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="relative">
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/advisory" element={<AdvisoryPage />} />
            <Route path="/crop-health" element={<CropHealthPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </MainLayout>
        <FloatingChatbot />
      </div>
    </BrowserRouter>
  );
}

export default App;