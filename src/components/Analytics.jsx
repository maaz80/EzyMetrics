import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut, PolarArea } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale } from 'chart.js';
import BeatLoader from 'react-spinners/BeatLoader'; 

// Registering required chart types
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale);

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); 

  // Fetch data from an API
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://dummyjson.com/users?limit=15');
      const result = await response.json();
      setData(result.users);
      setLoading(false); 
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <BeatLoader color="#36D7B7" loading={loading} size={15} /> 
      </div>
    );
  }

  // Extract necessary data from the response
  const ages = data.map(user => user.age);
  const heights = data.map(user => user.height);
  const roles = data.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});
  const bloodGroups = data.reduce((acc, user) => {
    acc[user.bloodGroup] = (acc[user.bloodGroup] || 0) + 1;
    return acc;
  }, {});

  const lineChartData = {
    labels: data.map(user => `${user.firstName}`),
    datasets: [
      {
        label: 'Ages of Users',
        data: ages,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const barChartData = {
    labels: data.map(user => `${user.firstName}`),
    datasets: [
      {
        label: 'Heights of Users (cm)',
        data: heights,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels: Object.keys(roles),
    datasets: [
      {
        data: Object.values(roles),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const polarAreaChartData = {
    labels: Object.keys(bloodGroups),
    datasets: [
      {
        data: Object.values(bloodGroups),
        backgroundColor: [
          '#FF6384',
          '#4BC0C0',
          '#FFCE56',
          '#E7E9ED',
          '#36A2EB',
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 ">
      <div className="container mx-auto overflow-y-scroll h-screen">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center sm:text-left">
            Analytics Dashboard
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 ">
          {/* Line Chart */}
          <div className="bg-white p-1 md:p-6 pb-16 rounded-lg shadow-lg" style={{ height: '400px' }}>
            <h2 className="text-xl font-semibold mb-4">Age Distribution (Line Chart)</h2>
            <Line data={lineChartData} />
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-1 md:p-6 pb-16 rounded-lg shadow-lg" style={{ height: '400px' }}>
            <h2 className="text-xl font-semibold mb-4">Height Distribution (Bar Chart)</h2>
            <Bar data={barChartData} />
          </div>

          {/* Doughnut Chart */}
          <div className="bg-white p-1 md:p-6 pb-16 rounded-lg shadow-lg" style={{ height: '400px' }}>
            <h2 className="text-xl font-semibold mb-4">Roles (Doughnut Chart)</h2>
            <Doughnut data={doughnutChartData} />
          </div>

          {/* Polar Area Chart */}
          <div className="bg-white p-1 md:p-6 pb-16 rounded-lg shadow-lg" style={{ height: '400px' }}>
            <h2 className="text-xl font-semibold mb-4">Blood Group Distribution (Polar Area Chart)</h2>
            <PolarArea data={polarAreaChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
