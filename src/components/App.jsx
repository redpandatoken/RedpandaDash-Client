import React, { useState, useEffect } from 'react';
import Footer from './Footer/Footer';
import { DashboardProvider } from '../context/context';
import { footerData } from '../mock/data';
import Dashboard from './Dashboard/Dashboard';
import Navbar from './Header/Navbar';

function App() {
  const [footer, setFooter] = useState({});

  useEffect(() => {
    setFooter({ ...footerData });
  }, []);

  return (
    <DashboardProvider value={{ footer }}>
      <Navbar />
      <main>
        <Dashboard className="mt-md-5" />
      </main>
      <Footer />
    </DashboardProvider>
  );
}

export default App;
