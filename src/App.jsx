import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Leads from './components/Leads';
import Analytics from './components/Analytics';
import Reports from './components/Reports';
import Sidebar from './components/Sidebar';
import LeadDetails from './components/LeadDetails';

const App = () => {
  return (
    <Router>
      <div className="flex poppins-regular">
        <Sidebar />
        <div className="flex-grow ">
          <Routes>
            <Route path="/" element={<Leads />} />
            <Route path="/leads" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/leaddetails/:id" element={<LeadDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
