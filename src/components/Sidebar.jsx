import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineUser, AiOutlineLineChart, AiOutlineFileText } from 'react-icons/ai';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white p-2 md:p-6 rounded-r-3xl h-screen md:w-64 w-10 transition-all duration-300 ">
      <h2 className="text-3xl font-bold mb-6 hidden md:block">EzyMetrics</h2>
      <nav>
        <ul className="space-y-6 mt-8">
          <li className="group">
            <Link to="/" className="flex items-center justify-center md:justify-start space-x-4 group-hover:text-blue-400 transition-all duration-200">
              <AiOutlineDashboard size={28} className="group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden md:inline-block text-lg">Dashboard</span>
            </Link>
          </li>
          <li className="group">
            <Link to="/leads" className="flex items-center justify-center md:justify-start space-x-4 group-hover:text-blue-400 transition-all duration-200">
              <AiOutlineUser size={28} className="group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden md:inline-block text-lg">Leads</span>
            </Link>
          </li>
          <li className="group">
            <Link to="/analytics" className="flex items-center justify-center md:justify-start space-x-4 group-hover:text-blue-400 transition-all duration-200">
              <AiOutlineLineChart size={28} className="group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden md:inline-block text-lg">Analytics</span>
            </Link>
          </li>
          <li className="group">
            <Link to="/reports" className="flex items-center justify-center md:justify-start space-x-4 group-hover:text-blue-400 transition-all duration-200">
              <AiOutlineFileText size={28} className="group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden md:inline-block text-lg">Reports</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
