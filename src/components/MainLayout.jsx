import React from 'react';
import Header from './Header';
import Footer from './Footer';
import WeatherAlerts from './WeatherAlerts';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <WeatherAlerts />
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;